# Temperature Monitor App

A React Native Expo web app that displays temperature readings from the ZenGarden temperature monitoring API.

## Features

- 📊 Real-time temperature data display in a table format
- 🔄 Pull-to-refresh functionality
- 📱 Responsive design that works on web, iOS, and Android
- 🎨 Material Design UI using React Native Paper
- 🌐 Fetches data from https://temperature-monitor.zengarden.space/api/temperatures

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI (optional, can use npx)

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd temperature-monitor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

#### Web
```bash
npm run web
```

#### iOS (requires Xcode)
```bash
npm run ios
```

#### Android (requires Android Studio)
```bash
npm run android
```

#### Development Server
```bash
npm start
```

## Project Structure

```
temperature-monitor/
├── App.tsx              # Main application component
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── app.json             # Expo app configuration
├── index.ts             # Entry point
└── assets/              # Static assets
    ├── icon.png
    ├── splash-icon.png
    └── ...
```

## API Integration

The app fetches temperature data from:
```
https://temperature-monitor.zengarden.space/api/temperatures
```

### Expected Data Format

The app expects the API to return an array of temperature readings in the following format:

```json
[
  {
    "id": "unique-id",
    "timestamp": "2025-06-15T10:30:00Z",
    "temperature": 23.5,
    "humidity": 65.2,
    "location": "Living Room"
  }
]
```

Or nested under a property:
```json
{
  "temperatures": [...],
  "readings": [...]
}
```

## Dependencies

### Main Dependencies
- **expo**: ~53.0.11 - Expo framework
- **react**: 19.0.0 - React library
- **react-native**: 0.79.3 - React Native framework
- **react-native-paper**: Material Design components
- **@expo/vector-icons**: Icon library

### Development Dependencies
- **typescript**: ~5.8.3 - TypeScript support
- **@types/react**: React type definitions

## Development

### Adding Features

1. **New API endpoints**: Update the `fetchTemperatures` function in `App.tsx`
2. **UI improvements**: Modify the styles or add new components
3. **Additional data fields**: Update the `TemperatureReading` interface

### Error Handling

The app includes comprehensive error handling for:
- Network failures
- API errors
- Data format inconsistencies
- Loading states

## Building for Production

### Web
```bash
npx expo export:web
```

### Native Apps
```bash
npx expo build:android
npx expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

