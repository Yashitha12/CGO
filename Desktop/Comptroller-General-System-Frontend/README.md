# Comptroller-General-System-Fronted (Structures)

## Installation

Install project with npm

### User Module - Internal

```bash
  cd User Module - Internal
  npm install
  npm run dev
```

### User Module - External

```bash
  cd User Module - External
  npm install
  npm run dev
```
    
## Instructions

* Create a folder called "Structures" inside the Components folder and implement interfaces
* In router.js, declare the path of the page and use requireAuth as false.
```
example:
    {
        path: "/dashboard",
        component: dashboard,
        meta: {
            requiresAuth: false
        }
    }
```
* And test the interfaces by typing the URL
```
example:
    http://localhost:300x/dashboard
```

