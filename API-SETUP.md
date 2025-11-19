# Guía: Integrar API de Carros (MockAPI)

## Opción 1: Datos Locales (RECOMENDADO para empezar) ✅
El sitio actualmente usa `cars-data.json` - funciona perfectamente sin internet real.

## Opción 2: MockAPI.io (Gratis, en la Nube)

Si quieres que los datos vengan de una API real en internet, sigue estos pasos:

### Paso 1: Crear cuenta en MockAPI
1. Ve a https://mockapi.io
2. Regístrate gratis (con Google o email)

### Paso 2: Crear un proyecto
1. Clic en "Create New Project"
2. Nombre: `julio-autos`

### Paso 3: Crear un endpoint
1. Click en "New Resource"
2. Nombre: `cars`
3. Estructura: Copiar y pegar el siguiente JSON:

```json
{
  "id": 1,
  "make": "Mazda",
  "model": "CX-5",
  "year": 2020,
  "class": "SUV",
  "transmission": "Automático",
  "fuel": "Gasolina",
  "mileage": "45,000 km",
  "price": "$18,500",
  "color": "#e74c3c",
  "emoji": "🚙",
  "description": "SUV en perfecto estado, único dueño, mantenimientos en concesionario. Color Rojo Cristal."
}
```

4. Clic en "Generate"
5. MockAPI genera 10 items de muestra automáticamente

### Paso 4: Obtener tu URL
Tu URL será algo como:
```
https://65a1b2c3d4e5f6g7h8i9j0k1.mockapi.io/api/cars
```

### Paso 5: Actualizar el código
En `main.js`, busca la función `fetchCars()` y cambia:

```javascript
async function fetchCars() {
    try {
        // Reemplaza esto con tu URL de MockAPI
        const response = await fetch('https://TU_ID.mockapi.io/api/cars');
        
        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        cars = data || [];
        renderCarousel();
    } catch (error) {
        console.log('Usando datos locales');
        cars = getSampleCars();
        renderCarousel();
    }
}
```

## Opción 3: Usar API Ninjas con Autenticación

Si quieres usar API Ninjas realmente:

1. Regístrate en https://api-ninjas.com (gratis)
2. Obtén tu API Key en el dashboard
3. En `main.js`:

```javascript
async function fetchCars() {
    const API_KEY = 'tu-api-key-aqui';
    
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/carmodels?make=Toyota&limit=6', {
            headers: {
                'X-Api-Key': API_KEY
            }
        });
        
        const data = await response.json();
        // Mapear datos de API Ninjas al formato esperado
        cars = data.map(car => ({
            id: car.model,
            make: 'Toyota',
            model: car.model,
            year: 2022,
            class: 'Sedan',
            transmission: 'Automático',
            fuel: 'Gasolina',
            mileage: '20,000 km',
            price: '$18,000',
            color: '#3498db',
            emoji: '🚗',
            description: `Vehículo ${car.model} en excelente estado.`
        }));
        
        renderCarousel();
    } catch (error) {
        console.log('Error: ', error);
        cars = getSampleCars();
        renderCarousel();
    }
}
```

## Resumen

| Opción | Ventajas | Desventajas |
|--------|----------|------------|
| **Datos Locales** | Funciona offline, rápido | No actualiza automáticamente |
| **MockAPI** | Gratis, en la nube, fácil | Límite de requests |
| **API Ninjas** | Datos reales de autos | Requiere autenticación, límites |

**Mi recomendación:** Comienza con datos locales (`cars-data.json`), y cuando quieras, migra a MockAPI sin cambiar código.