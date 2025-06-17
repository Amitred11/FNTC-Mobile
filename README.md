# <span style="color:#0aada8;">FiBear Network Corp.</span> Mobile App

> This mobile application, developed with **React Native** and **Expo**, provides a modern and user-friendly interface for managing FiBear Network Corp. services. The app is built with a focus on security and a seamless user experience, leveraging *Firebase* for robust backend authentication. Its design is clean and intuitive, with a professional aesthetic defined by its distinctive <span style="color:#051d5f;">`Kufam`</span> and <span style="color:#333333;">`Lato`</span> typography.

---

## <span style="color:#051d5f;">Core Functions</span>

🚪 **Intelligent Splash Screen**
*   Displays a loading screen upon startup while it intelligently checks the user's authentication status, directing them to the correct screen without manual intervention.

🔐 **Complete User Authentication**
*   Provides a full suite of authentication features powered by Firebase, presented on clean <span style="background-color:#f9fafd; color:#333333; padding: 2px 4px; border-radius: 3px;">neutral backgrounds</span>.
    *   **Secure Sign-Up:** New users can create an account using their email and a password.
    *   **Email & Password Login:** Existing users can sign in securely with a primary <span style="color:#0aada8;">**Sign In**</span> button.
    *   **Google Sign-In:** Offers a one-tap sign-in option for convenience.
    *   **Password Reset:** Includes a "Forgot Password" flow, highlighted with an <span style="color:#e88832;">accent color</span> for visibility.
    *   **Secure Logout:** Allows users to safely end their session.

🌐 **Global State Management**
*   Uses React's Context API to manage the user's session globally. This ensures that the entire app is aware of the user's login status, providing a smooth and predictable experience.

🧭 **Conditional Navigation**
*   The app's navigation is dynamic and responds to the user's authentication state.
    *   **Authentication Stack:** Unauthenticated users are restricted to the Login and Sign-Up screens.
    *   **Application Stack:** Once authenticated, users are granted access to the main app, featuring a <span style="color:#0aada8;">**main header**</span> and clean interface.

🎨 **Drawer-Based App Navigation**
*   Once logged in, a slide-out drawer menu provides easy and intuitive access to different application screens, such as `Home`, `Profile`, and `Settings`, each accompanied by a simple, clear icon.
