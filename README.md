Of course. Here is the revised `README.md` file, focusing entirely on the design, color palette, and visual identity of the FiBear Network Corp. mobile app, with all code and license information removed.

***

# FiBear Network Corp. Mobile App

## Overview

This mobile application provides a user-friendly interface for FiBear Network Corp. services. It is built around a modern, clean, and trustworthy design system to ensure a seamless and intuitive user experience. The app's visual identity is crafted to be welcoming and professional, guiding users effortlessly through authentication and into the main application.

## Design & User Experience

The app's design philosophy is centered on clarity, consistency, and a professional aesthetic. We use a defined color palette, modern typography, and clean iconography to create a cohesive and pleasant user journey.

### Color Palette

The color scheme is designed to be calming yet professional, building user trust. It uses a primary teal for actionable items, a deep navy for text, and soft neutrals for backgrounds.

| Color       | Hex Code  | Usage                                                              |
| :---------- | :-------- | :----------------------------------------------------------------- |
| **Primary** | `#0aada8` | Buttons, headers, active links, and key interactive elements.      |
| **Accent**  | `#e88832` | Secondary actions, highlights, or links like "Terms of Service".   |
| **Text**    | `#051d5f` | Main headings and important text to create strong visual hierarchy. |
| **Body**    | `#333333` | Standard body text and labels for excellent readability.           |
| **Neutral** | `#f9fafd` | Main screen backgrounds for a clean, airy feel.                    |
| **White**   | `#ffffff` | Card backgrounds and button text.                                  |
| **Grey**    | `#cccccc` | Borders and inactive elements.                                     |

### Typography

The app utilizes a combination of a unique display font for branding and a highly readable sans-serif font for all other content.

*   **Headings & Logo Text:** `Kufam` (Semi-Bold Italic) - A distinctive font used for screen titles and branding to give the app a unique character.
*   **Body & UI Text:** `Lato` (Regular) - A clean and modern sans-serif font chosen for its high legibility on mobile screens. Used for input fields, labels, buttons, and all paragraph text.

### Iconography

Icons are used to enhance usability and provide quick visual cues. We use the **FontAwesome** and **AntDesign** icon sets from `react-native-vector-icons` for a consistent and professional look.

*   **Style:** Solid, line-art icons that are simple and universally understood.
*   **Usage:** Used in input fields (`user`, `lock`), social login buttons (`google`), and the navigation drawer menu.

### Layout & Spacing

A consistent spacing and layout system is used throughout the app to create a sense of order and balance.
*   **Padding:** Generous padding is used within screens (e.g., `20px`) and components to avoid a cluttered look.
*   **Vertical Rhythm:** Consistent margins (`10px`, `15px`, `25px`) are used between elements to guide the user's eye down the screen.
*   **Centering:** Most screens use a centered layout to focus the user's attention on the primary task.

---

## Key UI Component Designs

### Input Fields (`FormInput`)

*   **Appearance:** Clean, rectangular fields with a light grey (`#ccc`) 1px border and a white background.
*   **Icon:** An icon is placed on the left side within a bordered container, providing a visual cue for the input type (e.g., a user icon for email, a lock for password).
*   **State:** When focused, the border could change color to the primary teal (`#0aada8`) to indicate an active state.
*   **Text:** Uses `Lato-Regular` font for clear readability.

### Buttons (`FormButton`, `SocialButton`)

*   **Primary Button:**
    *   **Background:** Solid primary color (`#2e64e5` or `#0aada8`).
    *   **Text:** Bold, white text for high contrast.
    *   **Shape:** Rectangular with slightly rounded corners.
    *   **Action:** Used for the most important actions, like "Sign In" or "Sign Up".

*   **Social Login Button (Google):**
    *   **Background:** A light, tinted background (`#f5e7ea`) to differentiate it from the primary action.
    *   **Icon:** The official Google brand icon on the left.
    *   **Text:** The button text ("Sign In with Google") uses the corresponding brand color (`#de4d41`).

---

## Screen Designs (Visual Description)

### Login & Signup Screens

These screens present a clean, focused, and welcoming entry point to the app.

*   **Background:** A soft, neutral off-white (`#f9fafd`).
*   **Logo:** The "FiBear" logo is prominently displayed at the top, followed by the app name in the `Kufam` display font.
*   **Forms:** The input fields are neatly stacked and centered, with clear placeholder text.
*   **Actions:** A bold, primary-colored "Sign In" or "Sign Up" button is the main call-to-action. Secondary actions like "Forgot Password?" and links to the other screen are presented as understated text links, using the accent color to draw attention without competing with the primary button.

### Home Screen

After logging in, the user is greeted with a clean and organized home screen.

*   **Header:** A header bar in the primary teal color (`#0aada8`) with a white title ("Home") and a hamburger icon to open the navigation drawer.
*   **Content Area:** The main content area has the neutral background color. A welcome message is displayed at the top in a large, bold font.
*   **User Info:** The user's email is displayed clearly, confirming their identity.
*   **Actions:** A "Logout" button is available, styled as a primary button. The screen is designed to be easily extendable with cards or lists for other services.

### Drawer Navigation Menu

The drawer provides easy access to different parts of the app.

*   **Appearance:** Slides out from the left side, overlaying the home screen.
*   **Background:** Can be a solid color, like white or a dark navy, for contrast.
*   **Items:** A list of navigation links (e.g., "Home," "Profile," "Settings"), each with an icon on the left and a text label.
*   **Active State:** The currently active screen is highlighted, often with a different background color or a bolded text label.

## Technologies Used for Design

*   **React Native Elements:** Provides a set of pre-styled, customizable UI components.
*   **react-native-vector-icons:** The source for our clean and professional icon sets.
*   **expo-font:** Used to load our custom brand fonts (`Kufam` and `Lato`).

## Prerequisites

*   **Node.js and npm/yarn:** Make sure you have Node.js and either npm or yarn installed on your development machine.
*   **Expo CLI:** Install the Expo command-line interface globally: `npm install -g expo-cli`
*   **Firebase Account:** Create a Firebase account ([https://firebase.google.com/](https://firebase.google.com/)).
*   **Firebase Project:** Create a Firebase project in the Firebase console.
*   **Mobile Device/Emulator:** An Android or iOS device or an emulator/simulator for testing.

## Setup and Installation

1.  **Clone the repository.**
2.  **Install dependencies** using `npm install` or `yarn install`.
3.  **Configure Firebase** by creating a `firebase.js` file and adding your project's configuration details. For Google Sign-In, ensure your platform-specific client IDs are configured.
4.  **Run the app** using `npx expo start`.

## Project Structure

```
fibear-app/
├── assets/
│   ├── fonts/
│   │   └── Kufam-SemiBoldItalic.ttf
│   └── images/
│       ├── logo.png
│       └── on-boarding-image.png
├── src/
│   ├── components/
│   │   ├── FormButton.js
│   │   ├── FormInput.js
│   │   └── SocialButton.js
│   ├── constants/
│   │   └── theme.js
│   ├── context/
│   │   └── AuthProvider.js
│   ├── navigation/
│   │   ├── AppStack.js
│   │   ├── AuthStack.js
│   │   └── Routes.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   └── SignupScreen.js
│   └── utils/
│       └── firebase.js
├── App.js
├── app.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.
