import Themes from '../index'; // Adjust the path as needed
import { configureTheme, getThemes } from '../index'; // Adjust the path as needed

describe('configureTheme', () => {
  it('should return standby theme', () => {
    const theme = {
      colors: ['col1', 'col2', 'col3', 'col4'],
      fontFamily: 'Arial',
    };
    const result = configureTheme('standby', theme);
    expect(result).toEqual({
      fontFamily: 'Arial',
      color: 'col3',
    });
  });

  it('should return default theme', () => {
    const theme = {
      colors: ['col1', 'col2', 'col3', 'col4'],
      fontFamily: 'Arial',
    };
    const result = configureTheme('otherType', theme);
    expect(result).toEqual({
      fontFamily: 'Arial',
      color: 'col4',
    });
  });
});

describe('getThemes', () => {
  it('should apply a specified theme', () => {
    const dateElement = {
      style: {},
    };
    const timeElement = {
      style: {},
    };
    const classnames = ['standby'];
    const themeToBeApply = 'customTheme';
    const customTheme = {
      colors: ['customCol1', 'customCol2', 'customCol3', 'customCol4'],
      fontFamily: 'Verdana',
      borderRadius: '5px',
    };

    Themes.allThemes.customTheme = customTheme;

    getThemes.call(
      {
        classnames,
        date: dateElement,
        time: timeElement,
        style: {},
      },
      themeToBeApply
    );

    expect(dateElement.style).toEqual({
      fontFamily: 'Verdana',
      color: 'customCol3',
    });

    expect(timeElement.style).toEqual({
      fontFamily: 'Verdana',
      color: 'customCol3',
    });
  });

  it('should apply the default theme if no theme is specified', () => {
    const dateElement = {
      style: {},
    };
    const timeElement = {
      style: {},
    };
    const classnames = ['standby'];

    getThemes.call(
      {
        classnames,
        date: dateElement,
        time: timeElement,
        style: {},
      },
      null
    );

    expect(dateElement.style).toEqual({
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      color: 'col3',
    });

    expect(timeElement.style).toEqual({
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      color: 'col3',
    });
  });
});

