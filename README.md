# Rehaish 🏠💼

Rehaish Code is a web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It's designed to be a marketplace for listing properties for rent or sale. 

## Project Overview

The project is currently in development, with approximately 60% of the features implemented. Below are the key features that have been developed so far:

## Features Implemented

- **User Authentication:**
  - Implemented user sign-up and sign-in functionalities using regular email/password and Google OAuth via Firebase authentication.
  - Utilized strong password feature to ensure only secure passwords are allowed during registration.

- **Profile Management:**
  - Users have individual profile pages where they can view and manage their account information.
  - Profile pages include avatars, with Google-authenticated users displaying their Google account avatars, while regular sign-ups are assigned default avatars.
  - Users can edit their profile picture and name, as well as delete their account if needed.

- **Listing Management:**
  - Implemented a feature for users to create listings for properties they wish to rent or sell.
  - Required information for creating a listing includes description, name, address, number of beds and baths, offer status, furnished or not, parking spot available or not and up to 6 images uploaded to Firebase storage.
  - Created a listing page where users can view all the listings they have created. As I am a Pakistani so the units for price use Rs and لاکھ، کڑوڑ as suffix.

## Future Development

- **Enhanced Default Avatars:**
  - Plan to implement two default avatars (male and female) and use an API to determine which one to assign based on the user's name and gender. This feature is currently pending implementation.

- **Listing Page Improvements:**
  - add edit and delete listing for user. sort the listing in descending order of their last updation date.

- **Search:**
  - add advance search with keywords suggestions while searching and filters based on facilities and price of house.

- **Home:**
  - Home page the main page where everyone can see all the available listings (without logging in).

## Contributing

This project is currently in development, and contributions are welcome. If you're interested in contributing, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.
