# simple-vite-react-express

<p align="center">
  <img src="./public/template-logo.png" alt="simple-vite-react-express-logo" height="200">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat-square&logo=Vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Express-000000.svg?style=flat-square&logo=Express&logoColor=white" alt="Express">
    <img src="https://img.shields.io/badge/postgresql-4169e1.svg?style=flat-square&logo=PostgreSQL&logoColor=white" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat-square&logo=Prisma&logoColor=white" alt="Prisma">
    <br>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat-square&logo=Nodemon&logoColor=white" alt="Nodemon">
    <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat-square&logo=Axios&logoColor=white" alt="Axios">
    <img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON">
</p>

A modern full-stack template using React, Vite, Express, and PostgreSQL.

## Quick Start

```bash
# Clone and rename the template
git clone git@github.com:Avinava/simple-vite-react-express.git your-project-name
cd your-project-name

# Install dependencies
yarn (or npm install)

# Set up your environment
cp .env.example .env

# Initialize database
npx prisma migrate dev
npx prisma generate

# Start development
yarn dev
```

## Template Structure

```
src/
├── client/               # Frontend React application
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   └── theme/            # MUI theme customization
├── server/               # Backend Express application
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── middleware/       # Express middleware
└── prisma/               # Database schema and migrations
```

## First Steps After Cloning (Your Project Launch Checklist)

> Complete these steps in order to transform this template into your application

1. **Update Project Information**

   > Set up your project identity and remove template-specific content

   - [ ] Change `name`, `version`, and `description` in `package.json`
     - Update to reflect your project's identity
     - Choose a meaningful version number (e.g., 0.1.0)
   - [ ] Update repository URLs in `package.json`
     - Point to your own repository
     - Update homepage and bugs URLs if applicable
   - [ ] Review and modify LICENSE file
     - Ensure it matches your project's licensing needs
     - Update copyright holder information
   - [ ] Update README.md with your project details
     - Remove template examples
     - Add your project-specific documentation
   - [ ] Remove template-specific documentation
     - Delete the example contact management system
     - Remove template feature descriptions
   - [ ] Update Git remote URL to your repository
     - `git remote set-url origin your-repo-url`

2. **Configure Environment**

   > Set up your development and production environments

   - [ ] Copy `.env.example` to `.env`
     - Never commit `.env` file (it's in .gitignore)
     - Keep sensitive information secure
   - [ ] Set up PostgreSQL database and update DATABASE_URL
     - Format: `postgresql://username:password@localhost:5432/dbname`
     - Create separate databases for development and testing
   - [ ] Configure PORT (default: 3000)
     - Ensure it doesn't conflict with other services
     - Set different ports for development and production
   - [ ] Set NODE_ENV for different environments
     - development: for local development
     - production: for deployment

3. **Database Setup**

   > Configure your data models and initialize the database

   - [ ] Review and modify `prisma/schema.prisma`
     - Define your data models
     - Set up relationships between models
   - [ ] Remove or modify the example Contact model
     - Either repurpose it for your needs
     - Or delete it completely
   - [ ] Add your own models and relationships
     - Follow Prisma schema conventions
     - Define proper indexes and constraints
   - [ ] Run initial migration: `npx prisma migrate dev`
     - Creates database tables
     - Generates Prisma Client

4. **Frontend Customization**

   > Personalize the user interface and setup routes

   - [ ] Update title and meta tags in `index.html`
     - Set your application name
     - Add proper meta descriptions
   - [ ] Replace template logo and favicon in `/public`
     - Use your own branding
     - Ensure proper image optimization
   - [ ] Modify theme colors in `src/client/theme/theme.js`
     - Match your brand colors
     - Ensure proper contrast ratios
   - [ ] Update app name in Header component
     - Replace template name with your app name
     - Add your own navigation items
   - [ ] Remove example components or modify for your use
     - Start with components you need
     - Remove unused example code
   - [ ] Review and update route structure
     - Plan your application routes
     - Set up proper navigation flow

## Template Features

### Frontend

- ⚡️ Vite for fast development
- 🎨 Material-UI with theme customization
- 📝 Form handling with Formik
- 🚦 React Router for navigation
- 🔄 Axios for API requests

### Backend

- 📡 Express with structured routes
- 🗄️ Prisma ORM for database operations
- 🔐 Basic error handling setup
- 📝 API route examples
- 🔧 Environment configuration

### Development

- 🔥 Hot reloading for both frontend and backend
- 📱 Responsive design ready
- 🐛 Debug configuration
- 🧪 Basic test setup

## Example Features

The template includes a basic contact management system demonstrating:

- CRUD operations
- Form validation
- Database interactions
- Error handling
- Component organization

## Customization Guide

### Adding New Features

1. **Database Model**

   ```prisma
   // In prisma/schema.prisma
   model YourModel {
     id        Int      @id @default(autoincrement())
     createdAt DateTime @default(now())
     // Add your fields
   }
   ```

2. **API Route Creation**

   ```bash
   # Create new route file
   touch src/server/routes/v1/your-model.route.js

   # Add to routes/v1/index.js
   import yourModelRoutes from './your-model.route.js'
   router.use('/your-model', yourModelRoutes)
   ```

3. **Frontend Components**

   ```bash
   # Create component files
   mkdir -p src/client/pages/YourModel
   touch src/client/pages/YourModel/List.jsx
   touch src/client/pages/YourModel/Detail.jsx
   touch src/client/pages/YourModel/Form.jsx
   ```

4. **Add Navigation**
   - Update `src/client/components/Header.jsx`
   - Modify `src/client/index.jsx` routes

### Theme Customization

1. **Colors and Typography**

   ```javascript
   // In src/client/theme/theme.js
   const theme = createTheme({
     palette: {
       primary: {
         main: "#your-color",
       },
     },
     typography: {
       fontFamily: "your-font, Arial, sans-serif",
     },
   });
   ```

2. **Component Styling**
   - Use `sx` prop for direct styling
   - Create styled components for reuse
   - Add global styles in theme

### API Development

1. **Route Structure**

   ```javascript
   // Template for new routes
   router.get("/list", async (req, res) => {
     try {
       // Your logic here
       const data = await db.prisma.yourModel.findMany();
       res.json(data);
     } catch (err) {
       // Error handling
     }
   });
   ```

2. **Validation**

   ```javascript
   // Using celebrate/Joi
   const validate = {
     body: Joi.object({
       // Your validation schema
     }),
   };
   router.post("/create", celebrate(validate), async (req, res) => {});
   ```

3. **Error Handling**
   - Use try/catch blocks
   - Implement error middleware
   - Add logging
