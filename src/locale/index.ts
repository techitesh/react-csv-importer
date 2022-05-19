/* eslint-disable @typescript-eslint/explicit-module-boundary-types -- all exports are ImporterLocale which is already fully typed */

export interface ImporterLocale {
  general: {
    goToPreviousStepTooltip: string;
  };

  fileStep: {
    initialDragDropPrompt: string;
    activeDragDropPrompt: string;

    getImportError: (message: string) => string;
    getDataFormatError: (message: string) => string;
    goBackButton: string;
    nextButton: string;

    rawFileContentsHeading: string;
    previewImportHeading: string;
    dataHasHeadersCheckbox: string;
    previewLoadingStatus: string;
  };

  fieldsStep: {
    stepSubtitle: string;
    requiredFieldsError: string;
    nextButton: string;

    dragSourceAreaCaption: string;
    getDragSourcePageIndicator: (
      currentPage: number,
      pageCount: number
    ) => string;
    getDragSourceActiveStatus: (columnCode: string) => string;
    nextColumnsTooltip: string;
    previousColumnsTooltip: string;
    clearAssignmentTooltip: string;
    selectColumnTooltip: string;
    unselectColumnTooltip: string;

    dragTargetAreaCaption: string;
    getDragTargetOptionalCaption: (field: string) => string;
    getDragTargetRequiredCaption: (field: string) => string;
    dragTargetPlaceholder: string;
    getDragTargetAssignTooltip: (columnCode: string) => string;
    dragTargetClearTooltip: string;

    columnCardDummyHeader: string;
    getColumnCardHeader: (code: string) => string;
  };

  progressStep: {
    stepSubtitle: string;
    uploadMoreButton: string;
    finishButton: string;
    statusError: string;
    statusComplete: string;
    statusPending: string;
    processedRowsLabel: string;
  };
}

export const enUS: ImporterLocale = {
  general: {
    goToPreviousStepTooltip: 'Go to previous step'
  },

  fileStep: {
    initialDragDropPrompt: 'Only CSV files can be uploaded here',
    activeDragDropPrompt: 'Drop CSV file here...',

    getImportError: (message) => `Import error: ${message}`,
    getDataFormatError: (message) => `Please check data formatting: ${message}`,
    goBackButton: 'Go Back',
    nextButton: 'Choose columns',

    rawFileContentsHeading: 'Raw File Contents',
    previewImportHeading: 'Preview Import',
    dataHasHeadersCheckbox: 'Data has headers',
    previewLoadingStatus: 'Loading preview...'
  },

  fieldsStep: {
    stepSubtitle: 'Select Columns',
    requiredFieldsError: 'Please assign all required fields',
    nextButton: 'Import',

    dragSourceAreaCaption: 'Columns to import',
    getDragSourcePageIndicator: (currentPage: number, pageCount: number) =>
      `Page ${currentPage} of ${pageCount}`,
    getDragSourceActiveStatus: (columnCode: string) =>
      `Assigning column ${columnCode}`,
    nextColumnsTooltip: 'Show next columns',
    previousColumnsTooltip: 'Show previous columns',
    clearAssignmentTooltip: 'Clear column assignment',
    selectColumnTooltip: 'Select column for assignment',
    unselectColumnTooltip: 'Unselect column',

    dragTargetAreaCaption: 'Target fields',
    getDragTargetOptionalCaption: (field) => `${field} (optional)`,
    getDragTargetRequiredCaption: (field) => `${field} (required)`,
    dragTargetPlaceholder: 'Drag column here',
    getDragTargetAssignTooltip: (columnCode: string) =>
      `Assign column ${columnCode}`,
    dragTargetClearTooltip: 'Clear column assignment',

    columnCardDummyHeader: 'Unassigned field',
    getColumnCardHeader: (code) => `Column ${code}`
  },

  progressStep: {
    stepSubtitle: 'Import',
    uploadMoreButton: 'Upload More',
    finishButton: 'Finish',
    statusError: 'Could not import',
    statusComplete: 'Complete',
    statusPending: 'Importing...',
    processedRowsLabel: 'Processed rows:'
  }
};

export const deDE: ImporterLocale = {
  general: {
    goToPreviousStepTooltip: 'Zum vorherigen Schritt'
  },

  fileStep: {
    initialDragDropPrompt:
      'CSV-Datei auf dieses Feld ziehen, oder klicken um eine Datei auszuwählen',
    activeDragDropPrompt: 'CSV-Datei auf dieses Feld ziehen...',
    nextButton: 'Spalten auswählen',

    getImportError: (message) => `Fehler beim Import: ${message}`,
    getDataFormatError: (message: string) =>
      `Bitte Datenformat überprüfen: ${message}`,
    goBackButton: 'Zurück',

    rawFileContentsHeading: 'Originaler Datei-Inhalt',
    previewImportHeading: 'Import-Vorschau',
    dataHasHeadersCheckbox: 'Mit Kopfzeile',
    previewLoadingStatus: 'Vorschau wird geladen...'
  },

  fieldsStep: {
    stepSubtitle: 'Spalten auswählen',
    requiredFieldsError:
      'Bitte weise allen nicht optionalen Spalten einen Wert zu',
    nextButton: 'Importieren',

    dragSourceAreaCaption: 'Zu importierende Spalte',
    getDragSourcePageIndicator: (currentPage: number, pageCount: number) =>
      `Seite ${currentPage} von ${pageCount}`,
    getDragSourceActiveStatus: (columnCode: string) =>
      `Spalte ${columnCode} zuweisen`,
    nextColumnsTooltip: 'Nächste Spalten anzeigen',
    previousColumnsTooltip: 'Vorherige Spalten anzeigen',
    clearAssignmentTooltip: 'Zugewiesene Spalte entfernen',
    selectColumnTooltip: 'Spalte zum Zuweisen auswählen',
    unselectColumnTooltip: 'Spalte abwählen',

    dragTargetAreaCaption: 'Zielfelder',
    getDragTargetOptionalCaption: (field) => `${field} (optional)`,
    getDragTargetRequiredCaption: (field) => `${field} (erforderlich)`,
    dragTargetPlaceholder: 'Spalte hierher ziehen',
    getDragTargetAssignTooltip: (columnCode: string) =>
      `Spalte ${columnCode} zuweisen`,
    dragTargetClearTooltip: 'Zugewiesene Spalte entfernen',

    columnCardDummyHeader: 'Nicht zugewiesenes Feld',
    getColumnCardHeader: (code) => `Spalte ${code}`
  },

  progressStep: {
    stepSubtitle: 'Importieren',
    uploadMoreButton: 'Weitere hochladen',
    finishButton: 'Abschließen',
    statusError: 'Konnte nicht importiert werden',
    statusComplete: 'Fertig',
    statusPending: 'Wird importiert...',
    processedRowsLabel: 'Verarbeitete Zeilen:'
  }
};
