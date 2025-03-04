# Uber Frontend Documentation

This documentation provides an overview of the frontend structure for the Uber application, detailing the different sections for users and captains.

## Table of Contents
- [User Section](#user-section)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [User Home](#user-home)
  - [Riding](#riding)
- [Captain Section](#captain-section)
  - [Captain Registration](#captain-registration)
  - [Captain Login](#captain-login)
  - [Captain Home](#captain-home)
  - [Captain Riding](#captain-riding)
  - [Captain Protected Wrapper](#captain-protected-wrapper)
  - [Captain Logout](#captain-logout)
- [Home Page](#home-page)
- [Context](#context)
  - [User Context](#user-context)
  - [Captain Context](#captain-context)
- [Components](#components)
  - [Waiting For Driver](#waiting-for-driver)
  - [Vehicle Panel](#vehicle-panel)
  - [Looking For Driver](#looking-for-driver)
  - [Location Search Panel](#location-search-panel)
  - [Confirmed Ride](#confirmed-ride)
  - [Finish Ride](#finish-ride)
  - [Accept Ride](#accept-ride)
  - [Captain Details](#captain-details)
  - [Ride PopUp](#ride-popup)
- [App Component](#app-component)

## User Section

### User Registration
The user registration page allows new users to create an account by providing their first name, last name, email, and password.

**File:** `src/pages/Userregister.jsx`

**State Variables:**
- `firstname`
- `lastname`
- `email`
- `password`
- `userData`

**Form Fields:**
- First Name
- Last Name
- Email
- Password

### User Login
The user login page allows existing users to log in by providing their email and password.

**File:** `src/pages/Userlogin.jsx`

**State Variables:**
- `email`
- `password`
- `userData`

**Form Fields:**
- Email
- Password

### User Home
The user home page is displayed after a successful login.

**File:** `src/pages/UserHome.jsx`

### Riding
The riding page displays information about the current ride for the user.

**File:** `src/pages/Riding.jsx`

**State Variables:**
- `rideDetails`
- `driverInfo`
- `vehicleInfo`

**Displayed Information:**
- Ride Status
- Driver Name
- Vehicle Details
- Pickup Location
- Payment Amount and Method

## Captain Section

### Captain Registration
The captain registration page allows new captains to create an account by providing their personal details and vehicle information.

**File:** `src/pages/CaptainRegister.jsx`

**State Variables:**
- `firstname`
- `lastname`
- `email`
- `password`
- `color`
- `plate`
- `capacity`
- `vehicleType`
- `location`
- `captainData`

**Form Fields:**
- First Name
- Last Name
- Email
- Password
- Vehicle Color
- Plate Number
- Seating Capacity
- Vehicle Type (Car, Motorcycle, Auto)

### Captain Login
The captain login page allows existing captains to log in by providing their email and password.

**File:** `src/pages/CaptainLogin.jsx`

**State Variables:**
- `email`
- `password`
- `captainData`

**Form Fields:**
- Email
- Password

### Captain Home
The captain home page is displayed after a successful login.

**File:** `src/pages/CaptainHome.jsx`

### Captain Riding
The captain riding page displays information about the current ride for the captain.

**File:** `src/pages/CaptainRiding.jsx`

**State Variables:**
- `finishRide`

**Displayed Information:**
- Ride Status
- Rider Name
- Pickup Location
- Drop-off Location
- Payment Amount and Method

### Captain Protected Wrapper
The captain protected wrapper ensures that only authenticated captains can access certain pages.

**File:** `src/pages/CaptainProtectedWrapper.jsx`

### Captain Logout
The captain logout component handles the logout process for captains.

**File:** `src/pages/CaptainLogout.jsx`

## Home Page
The home page provides an entry point to the application, allowing users to navigate to the login page.

**File:** `src/pages/Home.jsx`

## Context

### User Context
The user context file provides a global state for user data, which can be accessed throughout the application.

**File:** `src/context/UserContext.jsx`

**State Variables:**
- `user`

**Context Provider:**
- `UserDataContext.Provider`

### Captain Context
The captain context file provides a global state for captain data, which can be accessed throughout the application.

**File:** `src/context/CaptainContext.jsx`

**State Variables:**
- `captain`
- `isLoading`
- `error`

**Context Provider:**
- `CaptainDataContext.Provider`

## Components

### Waiting For Driver
The waiting for driver component displays information while waiting for a driver.

**File:** `src/component/WaitingForDriver.jsx`

### Vehicle Panel
The vehicle panel component displays available ride options.

**File:** `src/component/VehiclePanel.jsx`

### Looking For Driver
The looking for driver component displays information while looking for a driver.

**File:** `src/component/LookingForDriver.jsx`

### Location Search Panel
The location search panel component allows users to search for locations.

**File:** `src/component/LocationSearchPanel.jsx`

### Confirmed Ride
The confirmed ride component displays information about the confirmed ride.

**File:** `src/component/ConfirmedRide.jsx`

### Finish Ride
The finish ride component displays information about the ride that needs to be finished.

**File:** `src/component/FinishRide.jsx`

### Accept Ride
The accept ride component displays information about the ride that needs to be accepted.

**File:** `src/component/AcceptRide.jsx`

### Captain Details
The captain details component displays information about the captain.

**File:** `src/component/CaptainDetails.jsx`

### Ride PopUp
The ride popup component displays a popup for ride selection.

**File:** `src/component/RidePopUp.jsx`

## App Component
The main application component that sets up the routes for different pages.

**File:** `src/App.jsx`

**Routes:**
- `/` - Home
- `/login` - User Login
- `/register` - User Registration
- `/UserHome` - User Home
- `/CaptainLogin` - Captain Login
- `/CaptainRegister` - Captain Registration
- `/CaptainHome` - Captain Home
- `/CaptainRiding` - Captain Riding
