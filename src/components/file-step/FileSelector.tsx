import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocale } from '../../locale/LocaleContext';

import './FileSelector.scss';

export const FileSelector: React.FC<{ onSelected: (file: File) => void }> = ({
  onSelected
}) => {
  const onSelectedRef = useRef(onSelected);
  onSelectedRef.current = onSelected;

  const dropHandler = useCallback((acceptedFiles: File[]) => {
    // silently ignore if nothing to do
    if (acceptedFiles.length < 1) {
      return;
    }

    const file = acceptedFiles[0];
    onSelectedRef.current(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: dropHandler,
    accept: 'text/csv',
    maxSize: 5242880,
    onDropRejected: (error) => {
      switch (error[0].errors[0].code) {
        case 'file-invalid-type':
          alert('Please use a CSV file');
          break;
        case 'file-too-large':
          alert('File is too large please use a filesize of maximim 5MB');
          break;
        default:
          alert('Please use a CSV file');
          break;
      }
    }
  });

  const l10n = useLocale('fileStep');

  return (
    <div
      className="CSVImporter_FileSelector"
      data-active={!!isDragActive}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <span>{l10n.activeDragDropPrompt}</span>
      ) : (
        <span>{l10n.initialDragDropPrompt}</span>
      )}
    </div>
  );
};
