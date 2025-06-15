# GitHub Copilot Instructions

This is a React Native Expo web application for monitoring temperature readings.

## Project Context

- **Framework**: Expo with React Native
- **Language**: TypeScript
- **UI Library**: React Native Paper (Material Design)
- **Target Platforms**: Web (primary), iOS, Android
- **API**: Fetches data from https://temperature-monitor.zengarden.space/api/temperatures

## Code Style and Patterns

### TypeScript
- Use strict TypeScript with proper interfaces
- Define clear types for API responses and component props
- Use `React.useState` and `React.useEffect` hooks

### Components
- Use functional components with hooks
- Follow React Native Paper component patterns
- Implement proper error boundaries and loading states

### API Integration
- Use native `fetch` API for HTTP requests
- Implement proper error handling with try-catch
- Handle different response formats gracefully
- Use async/await pattern

### Styling
- Use StyleSheet.create for styles
- Follow React Native styling conventions
- Use responsive design principles
- Maintain consistency with Material Design principles

## File Structure
- `App.tsx` - Main application component
- Keep components simple and focused
- Use proper imports from React Native and Expo

## Common Tasks

### Adding New Features
1. Create proper TypeScript interfaces
2. Implement error handling
3. Add loading states
4. Use React Native Paper components
5. Test on web platform primarily

### API Changes
- Update the `TemperatureReading` interface
- Modify `fetchTemperatures` function
- Handle backward compatibility

### UI Improvements
- Use React Native Paper components
- Follow Material Design guidelines
- Ensure responsive design
- Test on different screen sizes

## Dependencies to Prefer
- React Native Paper for UI components
- Expo modules for platform features
- Native React Native components when possible
- TypeScript for type safety

## Avoid
- Third-party libraries unless necessary
- Platform-specific code without proper checks
- Inline styles (use StyleSheet.create)
- Hardcoded values (use constants)

## Testing Considerations
- Test primarily on web platform
- Ensure mobile responsiveness
- Test error states and loading states
- Verify API integration works correctly
