# Calculator-app-mobile

A Calculator app built with React Native Expo, based on the Frontend Mentor calculator app challenge.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Three color themes to choose from
- Responsive design
- Number formatting with commas for large numbers

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn
- Expo CLI (comes with npx)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tundeloper/Calculator-app-mobile.git
cd Calculator-app-mobile
```

2. Install dependencies:
```bash
npm install
```

### Running the App

```bash
# Start the development server
npm run start

# Run on Android
npm run android

# Run on iOS (requires macOS)
npm run ios

# Run on web
npm run web
```

## Project Structure

```
├── App.tsx                    # Main app entry point
├── src/
│   └── components/
│       ├── Calculator.tsx     # Main calculator component with logic and themes
│       └── Keyboards.tsx      # Calculator keypad component
├── app.json                   # Expo configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## Technologies Used

- [React Native](https://reactnative.dev/) - Mobile framework
- [Expo](https://expo.dev/) - Development platform
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Themes

The calculator includes 3 distinct color themes:

1. **Theme 1** (Default): Dark blue with red equals button
2. **Theme 2**: Light gray with orange equals button
3. **Theme 3**: Purple/violet with cyan equals button

## License

This project is open source and available under the MIT License.
