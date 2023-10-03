import configuretheme from './configuretheme';
import * as date from './date';

// Mock the getThemes function
jest.mock('./date', () => ({
  getThemes: jest.fn(),
}));

describe('configuretheme function', () => {
  afterEach(() => {
    // Clear mock calls after each test
    jest.clearAllMocks();
  });

  it('should call date.getThemes with the correct arguments for DateTime type', () => {
    // Arrange
    const theme = { /* your theme object here */ };
    const instance = { type: 'DateTime' };

    // Act
    configuretheme.call(instance, theme);

    // Assert
    expect(date.getThemes).toHaveBeenCalledWith(theme);
  });

  it('should log a message for unknown type', () => {
    // Arrange
    const theme = { /* your theme object here */ };
    const instance = { type: 'UnknownType' };
    
    // Mock the console.log function
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Act
    configuretheme.call(instance, theme);

    // Assert
    expect(date.getThemes).not.toHaveBeenCalled(); // Ensure getThemes is not called
    expect(consoleLogMock).toHaveBeenCalledWith(`no theme ${instance.type}`);

    // Restore the original console.log function
    consoleLogMock.mockRestore();
  });
});

