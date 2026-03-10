# 4xMil App

A React Native application for calculating the 4x1000 tax.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    npm install @react-native-async-storage/async-storage
    ```

2.  **Start the App**:
    ```bash
    npx expo start
    ```

## Architecture

-   **Screens**:
    -   `(onboarding)/index`: Introduction screen.
    -   `(onboarding)/NameInputScreen`: User name entry (persisted).
    -   `(home)/index`: Main calculator.
    -   `(settings)/index`: Settings (Theme, Language, Name).

-   **State Management**:
    -   `AppContext`: Manages user name, onboarding status, theme, and language.
    -   Persisted using `@react-native-async-storage/async-storage`.

-   **Navigation**:
    -   Expo Router (`Stack`).
    -   `index.tsx` handles redirection based on onboarding status.

-   **Styling**:
    -   NativeWind (Tailwind CSS) for styling.
    -   Glassmorphism UI components in `components/ui`.

## Testing

Run tests with:
```bash
npm test
```
