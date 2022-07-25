import React, { useMemo, useRef, useEffect, useState } from 'react';

import {
  parsePreview,
  PreviewResults,
  PreviewReport,
  CustomizablePapaParseConfig
} from '../../parser';
import { ImporterFrame } from '../ImporterFrame';
import { FileSelector } from './FileSelector';
import { FormatRawPreview } from './FormatRawPreview';
import { FormatDataRowPreview } from './FormatDataRowPreview';
import { FormatErrorMessage } from './FormatErrorMessage';

import './FileStep.scss';
import { useLocale } from '../../locale/LocaleContext';

export interface FileStepState extends PreviewReport {
  papaParseConfig: CustomizablePapaParseConfig; // config that was used for preview parsing
  hasHeaders: boolean;
}

export const FileStep: React.FC<{
  customConfig: CustomizablePapaParseConfig;
  assumeNoHeaders?: boolean;
  prevState: FileStepState | null;
  onChange: (state: FileStepState | null) => void;
  onAccept: () => void;
  onParse: (isParseError:boolean) => void;
}> = ({ customConfig, assumeNoHeaders, prevState, onChange, onAccept, onParse }) => {
  // seed from previous state as needed
  const [selectedFile, setSelectedFile] = useState<File | null>(
    prevState ? prevState.file : null
  );

  const [preview, setPreview] = useState<PreviewResults | null>(
    () =>
      prevState && {
        parseError: undefined,
        ...prevState
      }
  );

  const [papaParseConfig, setPapaParseConfig] = useState(
    prevState ? prevState.papaParseConfig : customConfig
  );

  const [hasHeaders, setHasHeaders] = useState(
    prevState ? prevState.hasHeaders : false
  );

  const [isColumnMatched, setIsColumnMatched] = useState<boolean>(false);

  // wrap in ref to avoid triggering effect
  const customConfigRef = useRef(customConfig);
  customConfigRef.current = customConfig;
  const assumeNoHeadersRef = useRef(assumeNoHeaders);
  assumeNoHeadersRef.current = assumeNoHeaders;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const onParseRef = useRef(onParse);
  onParseRef.current = onParse;

  // notify of current state
  useEffect(() => {
    onChangeRef.current(
      preview && !preview.parseError
        ? { ...preview, papaParseConfig, hasHeaders }
        : null
    );
  }, [preview, papaParseConfig, hasHeaders]);

  const onParseCallback = (isParseErr:boolean) => {
      setIsColumnMatched(!isParseErr);
      onParseRef.current(isParseErr);
  };
  // perform async preview parse once for the given file
  const asyncLockRef = useRef<number>(0);
  useEffect(() => {
    // clear other state when file selector is reset
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    // preserve existing state when parsing for this file is already complete
    if (preview && preview.file === selectedFile) {
      return;
    }

    const oplock = asyncLockRef.current;


    // lock in the current PapaParse config instance for use in multiple spots
    const config = customConfigRef.current;

    // kick off the preview parse
    parsePreview(selectedFile, config).then((results) => {
      // ignore if stale
      if (oplock !== asyncLockRef.current) {
        return;
      }

      // save the results and the original config
      setPreview(results);
      setPapaParseConfig(config);

      // pre-fill headers flag (only possible with >1 lines)
      setHasHeaders(
        results.parseError
          ? false
          : !assumeNoHeadersRef.current && !results.isSingleLine
      );
    });

    return () => {
      // invalidate current oplock on change or unmount
      asyncLockRef.current += 1;
    };
  }, [selectedFile, preview]);

  const l10n = useLocale('fileStep');

  // clear selected file
  // preview result content to display
  const reportBlock = useMemo(() => {
    if (!preview) {
      return null;
    }

    if (preview.parseError) {
      return (
        <div className="CSVImporter_FileStep__mainResultBlock">
          <FormatErrorMessage onCancelClick={() => setSelectedFile(null)}>
            {l10n.getImportError(
              preview.parseError.message || String(preview.parseError)
            )}
          </FormatErrorMessage>
        </div>
      );
    }

    return (
      <div className="CSVImporter_FileStep__mainResultBlock">
        <div className="CSVImporter_FileStep__header">
          {l10n.rawFileContentsHeading}
        </div>

        <FormatRawPreview
          chunk={preview.firstChunk}
          warning={preview.parseWarning}
          onCancelClick={() => setSelectedFile(null)}
        />

        {preview.parseWarning ? null : (
          <>
            <div className="CSVImporter_FileStep__header">
              {l10n.previewImportHeading}
              {!preview.isSingleLine && ( // hide setting if only one line anyway
                <label className="CSVImporter_FileStep__headerToggle">
                  <input
                    type="checkbox"
                    checked={hasHeaders}
                    onChange={() => {
                      setHasHeaders((prev) => !prev);
                    }}
                  />
                  <span>{l10n.dataHasHeadersCheckbox}</span>
                </label>
              )}
            </div>
            <FormatDataRowPreview
              hasHeaders={hasHeaders}
              rows={preview.firstRows}
            />
          </>
        )}
      </div>
    );
  }, [preview, hasHeaders, l10n]);

  if (!selectedFile) {
    return <FileSelector onSelected={(file) => setSelectedFile(file)} onParse={(isParseError) => onParseCallback(isParseError)}/>;
  }

  return (
    <ImporterFrame
      fileName={selectedFile.name}
      nextDisabled={!preview || !!preview.parseError || !!preview.parseWarning}
      onNext={() => {
        if (!preview || preview.parseError) {
          throw new Error('unexpected missing preview info');
        }

        onAccept();
      }}
      onCancel={() => setSelectedFile(null)}
      nextLabel={isColumnMatched? l10n.nextButtonColumnMatched:l10n.nextButton}
    >
      {reportBlock || (
        <div className="CSVImporter_FileStep__mainPendingBlock">
          {l10n.previewLoadingStatus}
        </div>
      )}
    </ImporterFrame>
  );
};
