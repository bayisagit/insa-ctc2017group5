// prisma/seed.ts
import { PrismaClient, Role, OrderStatus, PaymentStatus, PaymentMethod, VehicleType, OrderType, ProductType, ColorType } from '@/lib/generated/prisma';
// import { hash } from 'bcryptjs';
import fetch from 'node-fetch';

const prisma = new PrismaClient();
// Pexels API configuration
const PEXELS_API_KEY = 'cWS6dOmkduF4Vek6jGTnM1rTm3KJj0vq9xGfgRm1t3riRd3eVIjUqsjT'; // Replace with your actual Pexels API key
const PEXELS_BASE_URL = 'https://api.pexels.com/v1';


// Function to get random images from Pexels
// interface PexelsPhotoSrc {
//   original: string;
//   large2x: string;
//   large: string;
//   medium: string;
//   small: string;
//   portrait: string;
//   landscape: string;
//   tiny: string;
// }

// interface PexelsPhoto {
//   id: number;
//   src: PexelsPhotoSrc;
// }
   


// Function to get random images from Pexels
async function getPexelsImage(keyword: string, category: 'food' | 'electronics' | 'general' = 'general'): Promise<string> {
  try {
    const query = `${keyword} ${category}`;
    const response = await fetch(`${PEXELS_BASE_URL}/search?query=${encodeURIComponent(query)}&per_page=1&page=${Math.floor(Math.random() * 10) + 1}`, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }
 const data = await response.json() as any;
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.medium; // Using medium size for balance between quality and performance
    }
  } catch (error) {
    console.error('Error fetching image from Pexels:', error);
    return getDefaultImage(category);
  }
  // Fallback if no photos found and no error thrown
  return getDefaultImage(category);
}

// Fallback default images
function getDefaultImage(category: 'food' | 'electronics' | 'general'): string {
  const defaults = {
    food: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    electronics: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    general: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg'
  };
  return defaults[category] || defaults.general;
}

// Function to get food images from Pexels
async function getFoodImage(keyword: string): Promise<string> {
  return getPexelsImage(keyword, 'food');
}

// Function to get electronics images from Pexels
async function getElectronicsImage(keyword: string): Promise<string> {
  return getPexelsImage(keyword, 'electronics');
}


async function main() {
  // Clear existing data in the correct order to respect foreign key constraints
  await prisma.$transaction([
    prisma.rating.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.review.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.order.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.driverDocument.deleteMany(),
    prisma.driver.deleteMany(),
    prisma.productVariant.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.openingHour.deleteMany(),
    prisma.deliveryZone.deleteMany(),
    prisma.promotion.deleteMany(),
    prisma.store.deleteMany(),
    prisma.address.deleteMany(),
    prisma.verificationToken.deleteMany(),
    prisma.verification.deleteMany(),
    prisma.account.deleteMany(),
    prisma.session.deleteMany(),
    prisma.member.deleteMany(),
    prisma.invitation.deleteMany(),
    prisma.organization.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create Users with different roles
  const admin = await prisma.user.create({
    data: {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.ADMIN,
      // password: await hash('admin123', 12),
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      id: 'customer-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.CUSTOMER,
      phone: '+1234567890',
      // password: await hash('customer123', 12),
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      id: 'customer-2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.CUSTOMER,
      phone: '+1987654321',
      // password: await hash('customer123', 12),
    },
  });

  const storeOwner1 = await prisma.user.create({
    data: {
      id: 'owner-1',
      name: 'Store Owner One',
      email: 'owner1@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.STORE_OWNER,
      phone: '+1122334455',
      // password: await hash('owner123', 12),
    },
  });

  const storeOwner2 = await prisma.user.create({
    data: {
      id: 'owner-2',
      name: 'Store Owner Two',
      email: 'owner2@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.STORE_OWNER,
      phone: '+5566778899',
      // password: await hash('owner123', 12),
    },
  });

  const driverUser = await prisma.user.create({
    data: {
      id: 'driver-1',
      name: 'Driver User',
      email: 'driver@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: Role.DRIVER,
      phone: '+9998887777',
      // password: await hash('driver123', 12),
    },
  });

  // Create Addresses
  const address1 = await prisma.address.create({
    data: {
      street: '123 Main St',
      city: 'New York',
      latitude: 40.7128,
      longitude: -74.0060,
      userId: customer1.id,
    },
  });

  const address2 = await prisma.address.create({
    data: {
      street: '456 Elm St',
      city: 'Brooklyn',
      latitude: 40.6782,
      longitude: -73.9442,
      userId: customer2.id,
    },
  });

  const storeAddress1 = await prisma.address.create({
    data: {
      street: '789 Market St',
      city: 'New York',
      latitude: 40.7112,
      longitude: -74.0085,
    },
  });

  const storeAddress2 = await prisma.address.create({
    data: {
      street: '321 Broadway',
      city: 'New York',
      latitude: 40.7145,
      longitude: -74.0055,
    },
  });

  // Create Organizations
  const org1 = await prisma.organization.create({
    data: {
      id: 'org-1',
      name: 'Fresh Groceries Inc',
      slug: 'fresh-groceries',
      createdAt: new Date(),
    },
  });

  const org2 = await prisma.organization.create({
    data: {
      id: 'org-2',
      name: 'Tech Gadgets Corp',
      slug: 'tech-gadgets',
      createdAt: new Date(),
    },
  });

  // Create Stores with restaurant images
  const groceryStore = await prisma.store.create({
    data: {
      name: 'Fresh Groceries',
      description: 'Your local fresh grocery store with organic products',
      phone: '+18005551234',
      email: 'info@freshgroceries.com',
      isApproved: true,
      isActive: true,
      addressId: storeAddress1.id,
      productTypes: ProductType.GROCERY,
      organizationId: org1.id,
      owners: {
        connect: [{ id: storeOwner1.id }],
      },
      logo: await getFoodImage('grocery,store'),
      banner: await getFoodImage('grocery,banner'),
    },
  });

  const electronicsStore = await prisma.store.create({
    data: {
      name: 'Tech Gadgets',
      description: 'Latest electronics and gadgets',
      phone: '+18005559876',
      email: 'info@techgadgets.com',
      isApproved: true,
      isActive: true,
      addressId: storeAddress2.id,
      productTypes: ProductType.ELECTRONICS,
      organizationId: org2.id,
      owners: {
        connect: [{ id: storeOwner2.id }],
      },
      logo: await getElectronicsImage('tech,store'),
      banner: await getElectronicsImage('tech,banner'),
    },
  });

  // Create a restaurant store with food images
  const restaurantStore = await prisma.store.create({
    data: {
      name: 'Gourmet Delight',
      description: 'Fine dining restaurant with international cuisine',
      phone: '+18005554321',
      email: 'info@gourmetdelight.com',
      isApproved: true,
      isActive: true,
      address: {
        create: {
          street: '555 Food Avenue',
          city: 'New York',
          latitude: 40.7155,
          longitude: -74.0035,
        }
      },
      productTypes: ProductType.GROCERY, // Using grocery for food items
      organization: {
        create: {
          id: 'org-3',
          name: 'Gourmet Delight Inc',
          slug: 'gourmet-delight',
          createdAt: new Date(),
        }
      },
      owners: {
        connect: [{ id: storeOwner1.id }],
      },
      logo: await getFoodImage('restaurant,logo'),
      banner: await getFoodImage('restaurant,banner'),
    },
  });

  // Create Members
  await prisma.member.create({
    data: {
      id: 'member-1',
      organizationId: org1.id,
      userId: storeOwner1.id,
      role: 'OWNER',
      createdAt: new Date(),
    },
  });

  await prisma.member.create({
    data: {
      id: 'member-2',
      organizationId: org2.id,
      userId: storeOwner2.id,
      role: 'OWNER',
      createdAt: new Date(),
    },
  });

  // Create Delivery Zones
  await prisma.deliveryZone.create({
    data: {
      name: 'Downtown Area',
      radius: 5,
      deliveryFee: 4.99,
      minOrder: 15,
      storeId: groceryStore.id,
    },
  });

  await prisma.deliveryZone.create({
    data: {
      name: 'City Wide',
      radius: 10,
      deliveryFee: 7.99,
      minOrder: 25,
      storeId: electronicsStore.id,
    },
  });

  // Create restaurant delivery zone
  await prisma.deliveryZone.create({
    data: {
      name: 'Downtown Area',
      radius: 3,
      deliveryFee: 3.99,
      minOrder: 20,
      storeId: restaurantStore.id,
    },
  });

  // Create Opening Hours
  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]; // Sunday to Saturday
  for (const day of daysOfWeek) {
    await prisma.openingHour.create({
      data: {
        dayOfWeek: day,
        openingTime: '08:00',
        closingTime: '20:00',
        isClosed: day === 0, // Closed on Sunday
        storeId: groceryStore.id,
      },
    });

    await prisma.openingHour.create({
      data: {
        dayOfWeek: day,
        openingTime: '10:00',
        closingTime: '22:00',
        isClosed: false,
        storeId: electronicsStore.id,
      },
    });
    
    // Restaurant hours (open later)
    await prisma.openingHour.create({
      data: {
        dayOfWeek: day,
        openingTime: '11:00',
        closingTime: day < 5 ? '23:00' : '00:00', // Open later on weekends
        isClosed: false,
        storeId: restaurantStore.id,
      },
    });
  }

  // Create Categories
  const groceryCategories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery'];
  for (const [index, name] of groceryCategories.entries()) {
    await prisma.category.create({
      data: {
        name,
        description: `Fresh ${name.toLowerCase()} section`,
        storeId: groceryStore.id,
        position: index + 1,
        image: await getFoodImage(name.toLowerCase()),
      },
    });
  }

  const electronicsCategories = ['Smartphones', 'Laptops', 'Accessories', 'Smart Home'];
  for (const [index, name] of electronicsCategories.entries()) {
    await prisma.category.create({
      data: {
        name,
        description: `Latest ${name.toLowerCase()}`,
        storeId: electronicsStore.id,
        position: index + 1,
        image: await getElectronicsImage(name.toLowerCase()),
      },
    });
  }

  // Restaurant categories
  const restaurantCategories = ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'];
  for (const [index, name] of restaurantCategories.entries()) {
    await prisma.category.create({
      data: {
        name,
        description: `Delicious ${name.toLowerCase()}`,
        storeId: restaurantStore.id,
        position: index + 1,
        image: await getFoodImage(name.toLowerCase()),
      },
    });
  }

  // Get categories for product creation
  const categories = await prisma.category.findMany();
  const fruitsCategory = categories.find(c => c.name === 'Fruits')!;
  const vegetablesCategory = categories.find(c => c.name === 'Vegetables')!;
  const dairyCategory = categories.find(c => c.name === 'Dairy')!;
  const smartphonesCategory = categories.find(c => c.name === 'Smartphones')!;
  const laptopsCategory = categories.find(c => c.name === 'Laptops')!;
  const appetizersCategory = categories.find(c => c.name === 'Appetizers')!;
  const mainCoursesCategory = categories.find(c => c.name === 'Main Courses')!;
  const dessertsCategory = categories.find(c => c.name === 'Desserts')!;
  const drinksCategory = categories.find(c => c.name === 'Drinks')!;

  // Create Grocery Products with food images
  const apple = await prisma.product.create({
    data: {
      name: 'Organic Apples',
      description: 'Fresh organic apples from local farms',
      isAvailable: true,
      isFeatured: true,
      categoryId: fruitsCategory.id,
      storeId: groceryStore.id,
      productType: ProductType.GROCERY,
      weight: 1.0,
      barcode: '123456789012',
      sku: 'APP123',
      image: await getFoodImage('apple'),
    },
  });

  const banana = await prisma.product.create({
    data: {
      name: 'Organic Bananas',
      description: 'Sweet organic bananas, perfect for snacks',
      isAvailable: true,
      categoryId: fruitsCategory.id,
      storeId: groceryStore.id,
      productType: ProductType.GROCERY,
      weight: 0.5,
      barcode: '123456789013',
      sku: 'BAN123',
      image: await getFoodImage('banana'),
    },
  });

  const milk = await prisma.product.create({
    data: {
      name: 'Organic Milk',
      description: 'Fresh organic milk, 1 gallon',
      isAvailable: true,
      categoryId: dairyCategory.id,
      storeId: groceryStore.id,
      productType: ProductType.GROCERY,
      weight: 3.8,
      barcode: '987654321098',
      sku: 'MILK456',
      image: await getFoodImage('milk'),
    },
  });

  const bread = await prisma.product.create({
    data: {
      name: 'Whole Grain Bread',
      description: 'Freshly baked whole grain bread',
      isAvailable: true,
      categoryId: categories.find(c => c.name === 'Bakery')!.id,
      storeId: groceryStore.id,
      productType: ProductType.GROCERY,
      weight: 0.5,
      barcode: '567890123456',
      sku: 'BREAD789',
      image: await getFoodImage('bread'),
    },
  });

  // Create Electronics Products
  const iphone = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with A16 Bionic chip',
      isAvailable: true,
      isFeatured: true,
      categoryId: smartphonesCategory.id,
      storeId: electronicsStore.id,
      productType: ProductType.ELECTRONICS,
      weight: 0.2,
      dimensions: '14.6x7.1x0.8 cm',
      barcode: '567890123456',
      sku: 'IPH15P',
      isNew: true,
      image: await getElectronicsImage('iphone'),
    },
  });

  const macbook = await prisma.product.create({
    data: {
      name: 'MacBook Pro 16"',
      description: 'Powerful laptop with M2 Pro chip',
      isAvailable: true,
      categoryId: laptopsCategory.id,
      storeId: electronicsStore.id,
      productType: ProductType.ELECTRONICS,
      weight: 2.1,
      dimensions: '35.6x24.8x1.7 cm',
      barcode: '345678901234',
      sku: 'MBP16',
      image: await getElectronicsImage('macbook'),
    },
  });

  const headphones = await prisma.product.create({
    data: {
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Premium over-ear headphones with ANC',
      isAvailable: true,
      isFeatured: true,
      categoryId: categories.find(c => c.name === 'Accessories')!.id,
      storeId: electronicsStore.id,
      productType: ProductType.ELECTRONICS,
      weight: 0.3,
      dimensions: '18x15x7 cm',
      barcode: '789012345678',
      sku: 'HP-ANC50',
      image: await getElectronicsImage('headphones'),
    },
  });

  // Create Restaurant Products (Food Items)
  const bruschetta = await prisma.product.create({
    data: {
      name: 'Bruschetta',
      description: 'Toasted bread topped with tomatoes, garlic, and fresh basil',
      isAvailable: true,
      isFeatured: true,
      categoryId: appetizersCategory.id,
      storeId: restaurantStore.id,
      productType: ProductType.GROCERY,
      weight: 0.3,
      sku: 'APP001',
      image: await getFoodImage('bruschetta'),
    },
  });

  const steak = await prisma.product.create({
    data: {
      name: 'Filet Mignon',
      description: '8oz premium cut with mashed potatoes and seasonal vegetables',
      isAvailable: true,
      isFeatured: true,
      categoryId: mainCoursesCategory.id,
      storeId: restaurantStore.id,
      productType: ProductType.GROCERY,
      weight: 0.5,
      sku: 'MAIN001',
      image: await getFoodImage('steak'),
    },
  });

  const cheesecake = await prisma.product.create({
    data: {
      name: 'New York Cheesecake',
      description: 'Classic cheesecake with berry compote',
      isAvailable: true,
      categoryId: dessertsCategory.id,
      storeId: restaurantStore.id,
      productType: ProductType.GROCERY,
      weight: 0.2,
      sku: 'DES001',
      image: await getFoodImage('cheesecake'),
    },
  });

  const mojito = await prisma.product.create({
    data: {
      name: 'Mojito',
      description: 'Classic mint, lime, rum cocktail',
      isAvailable: true,
      categoryId: drinksCategory.id,
      storeId: restaurantStore.id,
      productType: ProductType.GROCERY,
      weight: 0.4,
      sku: 'DRK001',
      image: await getFoodImage('mojito'),
    },
  });

  // Create Product Variants
  // Grocery variants
  await prisma.productVariant.create({
    data: {
      name: '1kg Bag',
      price: 4.99,
      productId: apple.id,
      colors: ColorType.GREEN,
      images: {
        create: [
            {
              url: await getFoodImage('apple'),
            },
            {
              url: await getFoodImage('apple'),
            },
            {
              url: await getFoodImage('apple'),
            },
            {
              url: await getFoodImage('apple'),
            },

        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: '2kg Bag',
      price: 8.99,
      productId: apple.id,
      colors: ColorType.GREEN,
           images: {
        create: [
            {
              url: await getFoodImage('apple'),
            },
            {
              url: await getFoodImage('apple'),
            },
            {
              url: await getFoodImage('apple'),
            },
            {
              url: await getFoodImage('apple'),
            },

        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: 'Bunch (6 bananas)',
      price: 2.49,
      productId: banana.id,
      colors: ColorType.GREEN,
      images: {
        create: [
          {
            url: await getFoodImage('banana'),
          },
          {
            url: await getFoodImage('banana'),
          },
          {
            url: await getFoodImage('banana'),
          },
          {
            url: await getFoodImage('banana'),
          },
        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: '1 Gallon',
      price: 5.49,
      productId: milk.id,
      images: {
        create: [
          {
            url: await getFoodImage('milk'),
          },
          {
            url: await getFoodImage('milk'),
          },
          {
            url: await getFoodImage('milk'),
          },
          {
            url: await getFoodImage('milk'),
          },
        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: 'Loaf',
      price: 3.99,
      productId: bread.id,
      images: {
        create: [
          {
            url: await getFoodImage('bread'),
          },
          {
            url: await getFoodImage('bread'),
          },
          {
            url: await getFoodImage('bread'),
          },
          {
            url: await getFoodImage('bread'),
          },
        ],
      },
    },
  });

  // Electronics variants
  await prisma.productVariant.create({
    data: {
      name: '128GB',
      price: 999.99,
      productId: iphone.id,
      colors: ColorType.BLACK,
      images: {
        create: [
          {
            url: await getFoodImage('iphone'),
          },
          {
            url: await getFoodImage('iphone'),
          },
          {
            url: await getFoodImage('iphone'),
          },
          {
            url: await getFoodImage('iphone'),
          },
        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: '256GB',
      price: 1099.99,
      productId: iphone.id,
      colors: ColorType.WHITE,
      images: {
        create: [
          {
            url: await getFoodImage('iphone'),
          },
          {
            url: await getFoodImage('iphone'),
          },
          {
            url: await getFoodImage('iphone'),
          },
          {
            url: await getFoodImage('iphone'),
          },
        ],
      },
  }});

  await prisma.productVariant.create({
    data: {
      name: 'M2 Pro, 16GB RAM, 512GB SSD',
      price: 2499.99,
      productId: macbook.id,
      colors: ColorType.GRAY,
      images: {
        create: [
          {
            url: await getFoodImage('macbook'),
          },
          {
            url: await getFoodImage('macbook'),
          },
          {
            url: await getFoodImage('macbook'),
          },
          {
            url: await getFoodImage('macbook'),
          },
        ],
      },
  }});

  await prisma.productVariant.create({
    data: {
      name: 'Black',
      price: 299.99,
      productId: headphones.id,
      colors: ColorType.BLACK,
      images: {
        create: [
          {
            url: await getFoodImage('headphones'),
          },
          {
            url: await getFoodImage('headphones'),
          },
          {
            url: await getFoodImage('headphones'),
          },
          {
            url: await getFoodImage('headphones'),
          },
        ],
      },
    },
  });

  // Restaurant variants
  await prisma.productVariant.create({
    data: {
      name: 'Regular',
      price: 8.99,
      productId: bruschetta.id,
      images: {
        create: [
          {
            url: await getFoodImage('bruschetta'),
          },
          {
            url: await getFoodImage('bruschetta'),
          },
          {
            url: await getFoodImage('bruschetta'),
          },
          {
            url: await getFoodImage('bruschetta'),
          },
        ],
      },
  }});

  await prisma.productVariant.create({
    data: {
      name: 'Large',
      price: 12.99,
      productId: bruschetta.id,
      images: {
        create: [
          {
            url: await getFoodImage('bruschetta'),
          },
          {
            url: await getFoodImage('bruschetta'),
          },
          {
            url: await getFoodImage('bruschetta'),
          },
          {
            url: await getFoodImage('bruschetta'),
          },
        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: '8oz',
      price: 29.99,
      productId: steak.id,
      images: {
        create: [
          {
            url: await getFoodImage('steak'),
          },
          {
            url: await getFoodImage('steak'),
          },
          {
            url: await getFoodImage('steak'),
          },
          {
            url: await getFoodImage('steak'),
          },
        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: '12oz',
      price: 39.99,

      productId: steak.id,
      images: {
        create: [
          {
            url: await getFoodImage('steak'),
          },
          {
            url: await getFoodImage('steak'),
          },
          {
            url: await getFoodImage('steak'),
          },
          {
            url: await getFoodImage('steak'),
          },
        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: 'Slice',
      price: 7.99,
      productId: cheesecake.id,
      images: {
        create: [
          {
            url: await getFoodImage('cheesecake'),
          },
          {
            url: await getFoodImage('cheesecake'),
          },
          {
            url: await getFoodImage('cheesecake'),
          },
          {
            url: await getFoodImage('cheesecake'),
          },
        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: 'Classic',
      price: 9.99,
      productId: mojito.id,
      images: {
        create: [
          {
            url: await getFoodImage('mojito'),
          },
          {
            url: await getFoodImage('mojito'),
          },
          {
            url: await getFoodImage('mojito'),
          },
          {
            url: await getFoodImage('mojito'),
          },
        ],
      },
    },
  });

  await prisma.productVariant.create({
    data: {
      name: 'Premium',
      price: 12.99,
      productId: mojito.id,
      images: {
        create: [
          {
            url: await getFoodImage('mojito'),
          },
          {
            url: await getFoodImage('mojito'),
          },
          {
            url: await getFoodImage('mojito'),
          },
          {
            url: await getFoodImage('mojito'),
          },
        ],
      },
    },
  });

  // Create Driver
  const driver = await prisma.driver.create({
    data: {
      userId: driverUser.id,
      licenseNumber: 'DL12345678',
      vehicleType: VehicleType.CAR,
      vehicleMake: 'Toyota',
      vehicleModel: 'Corolla',
      vehicleYear: 2020,
      licensePlate: 'NY12345',
      isAvailable: true,
      isVerified: true,
    },
  });

  // Create Driver Documents
  await prisma.driverDocument.create({
    data: {
      type: 'license',
      documentUrl: 'https://example.com/documents/license.pdf',
      expiryDate: new Date('2025-12-31'),
      isVerified: true,
      driverId: driver.id,
    },
  });

  // Create Promotions
  const summerPromo = await prisma.promotion.create({
    data: {
      code: 'SUMMER20',
      description: 'Summer Sale - 20% off',
      discountType: 'PERCENTAGE',
      discountValue: 20,
      minOrder: 30,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      isActive: true,
      usageLimit: 100,
      storeId: groceryStore.id,
    },
  });

  const techPromo = await prisma.promotion.create({
    data: {
      code: 'TECH10',
      description: '10% off all tech products',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      startDate: new Date(),
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      isActive: true,
      storeId: electronicsStore.id,
    },
  });

  // Create restaurant promotion
  await prisma.promotion.create({
    data: {
      code: 'DINEOUT',
      description: '20% off on all main courses',
      discountType: 'PERCENTAGE',
      discountValue: 20,
      minOrder: 30,
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      isActive: true,
      storeId: restaurantStore.id,
    },
  });

  // Create Orders
  const order1 = await prisma.order.create({
    data: {
      type: OrderType.DELIVERY,
      orderNumber: 'ORD-' + Date.now(),
      deliveryFee: 4.99,
      subtotal: 10.48,
      total: 15.47,
      status: OrderStatus.DELIVERED,
      statusHistory: JSON.stringify([
        { status: 'PENDING', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
        { status: 'ACCEPTED', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        { status: 'DELIVERED', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      ]),
      paymentStatus: PaymentStatus.COMPLETED,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      deliveryAddressId: address1.id,
      storeId: groceryStore.id,
      userId: customer1.id,
      driverId: driver.id,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      type: OrderType.PICKUP,
      orderNumber: 'ORD-' + (Date.now() + 1),
      subtotal: 999.99,
      total: 999.99,
      status: OrderStatus.PROCESSING,
      statusHistory: JSON.stringify([
        { status: 'PENDING', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { status: 'PROCESSING', timestamp: new Date(Date.now() - 60 * 60 * 1000) },
      ]),
      paymentStatus: PaymentStatus.COMPLETED,
      paymentMethod: PaymentMethod.PAYPAL,
      storeId: electronicsStore.id,
      userId: customer2.id,
    },
  });

  // Create a restaurant order
  const restaurantOrder = await prisma.order.create({
    data: {
      type: OrderType.DELIVERY,
      orderNumber: 'ORD-' + (Date.now() + 2),
      deliveryFee: 3.99,
      subtotal: 47.97,
      total: 51.96,
      status: OrderStatus.DELIVERED,
      statusHistory: JSON.stringify([
        { status: 'PENDING', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
        { status: 'ACCEPTED', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { status: 'OUT_FOR_DELIVERY', timestamp: new Date(Date.now() - 90 * 60 * 1000) },
        { status: 'DELIVERED', timestamp: new Date(Date.now() - 60 * 60 * 1000) },
      ]),
      paymentStatus: PaymentStatus.COMPLETED,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      deliveryAddressId: address1.id,
      storeId: restaurantStore.id,
      userId: customer1.id,
      driverId: driver.id,
    },
  });

  // Create Order Items
  const appleVariant = await prisma.productVariant.findFirst({
    where: { productId: apple.id, name: '1kg Bag' },
  });

  const milkVariant = await prisma.productVariant.findFirst({
    where: { productId: milk.id },
  });

  const iphoneVariant = await prisma.productVariant.findFirst({
    where: { productId: iphone.id, name: '128GB' },
  });

  await prisma.orderItem.create({
    data: {
      quantity: 2,
      price: 4.99,
      orderId: order1.id,
      productId: apple.id,
      variantId: appleVariant?.id,
    },
  });

  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 5.49,
      orderId: order1.id,
      productId: milk.id,
      variantId: milkVariant?.id,
    },
  });

  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 999.99,
      orderId: order2.id,
      productId: iphone.id,
      variantId: iphoneVariant?.id,
    },
  });

  // Add items to restaurant order
  const bruschettaVariant = await prisma.productVariant.findFirst({
    where: { productId: bruschetta.id, name: 'Regular' },
  });

  const steakVariant = await prisma.productVariant.findFirst({
    where: { productId: steak.id, name: '8oz' },
  });

  const cheesecakeVariant = await prisma.productVariant.findFirst({
    where: { productId: cheesecake.id },
  });

  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 8.99,
      orderId: restaurantOrder.id,
      productId: bruschetta.id,
      variantId: bruschettaVariant?.id,
    },
  });

  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 29.99,
      orderId: restaurantOrder.id,
      productId: steak.id,
      variantId: steakVariant?.id,
    },
  });

  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 7.99,
      orderId: restaurantOrder.id,
      productId: cheesecake.id,
      variantId: cheesecakeVariant?.id,
    },
  });

  // Create Payments
  await prisma.payment.create({
    data: {
      orderId: order1.id,
      amount: 15.47,
      method: PaymentMethod.CREDIT_CARD,
      status: PaymentStatus.COMPLETED,
      transactionId: 'txn_' + Math.random().toString(36).substring(2, 15),
      provider: 'Stripe',
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order2.id,
      amount: 999.99,
      method: PaymentMethod.PAYPAL,
      status: PaymentStatus.COMPLETED,
      transactionId: 'PAYID-' + Math.random().toString(36).substring(2, 15),
      provider: 'PayPal',
    },
  });

  // Create restaurant payment
  await prisma.payment.create({
    data: {
      orderId: restaurantOrder.id,
      amount: 51.96,
      method: PaymentMethod.CREDIT_CARD,
      status: PaymentStatus.COMPLETED,
      transactionId: 'txn_' + Math.random().toString(36).substring(2, 15),
      provider: 'Stripe',
    },
  });

  // Create Reviews
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Great service and fresh products!',
      orderId: order1.id,
      userId: customer1.id,
      storeId: groceryStore.id,
      driverRating: 5,
      driverComment: 'Driver was very punctual',
    },
  });

  // Add restaurant review
  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Great food and timely delivery!',
      orderId: restaurantOrder.id,
      userId: customer1.id,
      storeId: restaurantStore.id,
      driverRating: 5,
      driverComment: 'Driver was very polite and careful with the food',
    },
  });

  // Create Carts
  const cart1 = await prisma.cart.create({
    data: {
      userId: customer1.id,
      storeId: groceryStore.id,
    },
  });

  // Create a restaurant cart
  const restaurantCart = await prisma.cart.create({
    data: {
      userId: customer2.id,
      storeId: restaurantStore.id,
    },
  });

  // Create Cart Items
  await prisma.cartItem.create({
    data: {
      quantity: 3,
      cartId: cart1.id,
      productId: apple.id,
      variantId: appleVariant?.id,
    },
  });

  // Add items to restaurant cart
  await prisma.cartItem.create({
    data: {
      quantity: 2,
      cartId: restaurantCart.id,
      productId: mojito.id,
      variantId: (await prisma.productVariant.findFirst({
        where: { productId: mojito.id, name: 'Classic' },
      }))?.id,
    },
  });

  await prisma.cartItem.create({
    data: {
      quantity: 1,
      cartId: restaurantCart.id,
      productId: steak.id,
      variantId: steakVariant?.id,
    },
  });

  // Create Notifications
  await prisma.notification.create({
    data: {
      title: 'Order Delivered',
      message: 'Your order #' + order1.orderNumber + ' has been delivered',
      type: 'ORDER_UPDATE',
      userId: customer1.id,
      metadata: JSON.stringify({ orderId: order1.id }),
    },
  });

  await prisma.notification.create({
    data: {
      title: 'New Promotion',
      message: '20% off on all groceries with code SUMMER20',
      type: 'PROMOTION',
      userId: customer1.id,
      metadata: JSON.stringify({ promotionId: summerPromo.id }),
    },
  });

  // Create restaurant notification
  await prisma.notification.create({
    data: {
      title: 'Your food is on the way!',
      message: 'Your order #' + restaurantOrder.orderNumber + ' is out for delivery',
      type: 'ORDER_UPDATE',
      userId: customer1.id,
      metadata: JSON.stringify({ orderId: restaurantOrder.id }),
    },
  });

  // Create Ratings
  await prisma.rating.create({
    data: {
      orderScore: 5,
      storeScore: 5,
      driverScore: 5,
      comment: 'Excellent service all around',
      orderId: order1.id,
      userId: customer1.id,
      storeId: groceryStore.id,
      driverId: driver.id,
    },
  });

  // Create restaurant rating
  await prisma.rating.create({
    data: {
      orderScore: 4,
      storeScore: 5,
      driverScore: 5,
      comment: 'Delicious food and great delivery experience',
      orderId: restaurantOrder.id,
      userId: customer1.id,
      storeId: restaurantStore.id,
      driverId: driver.id,
    },
  });

  console.log('Database seeded successfully with restaurant data and images!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });