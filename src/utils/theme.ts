// add custom properties to mui theme
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appBar: {
      height: React.CSSProperties['height'];
    };
  }
  interface ThemeOptions {
    appBar?: {
      height?: React.CSSProperties['height'];
    };
  }
}

// export somethings, so this file count as a module
export const theme = 'theme';
