CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  duration INT NOT NULL, -- in minutes
  servings INT NOT NULL,
  ingredients TEXT[] NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO recipes (
  title,
  category,
  duration,
  servings,
  ingredients,
  description,
  image
)
VALUES

(
  'Spaghetti Carbonara',
  'Italian',
  25,
  4,
  ARRAY[
    '400g spaghetti',
    '150g guanciale or pancetta',
    '3 large eggs',
    '2 egg yolks',
    '80g Pecorino Romano',
    '40g Parmesan',
    '1 tsp freshly ground black pepper',
    'Salt'
  ],
  'A classic Roman pasta made with spaghetti, crispy guanciale, eggs, Pecorino Romano, and freshly cracked black pepper. The hot pasta creates a rich and silky sauce without using cream.',
  'https://images.unsplash.com/photo-1755594461640-b800c6bafdfa?auto=format&fit=crop&w=1200&q=80'
),

(
  'Chicken Curry',
  'Indian',
  45,
  4,
  ARRAY[
    '700g chicken thighs',
    '1 large onion',
    '3 garlic cloves',
    '1 tbsp fresh ginger',
    '2 tbsp curry powder',
    '1 tsp ground cumin',
    '1 tsp ground turmeric',
    '400g diced tomatoes',
    '250ml chicken stock',
    '2 carrots',
    '2 potatoes',
    '2 tbsp vegetable oil',
    'Salt',
    'Fresh cilantro'
  ],
  'A warming chicken curry cooked with aromatic spices, tomatoes, carrots, and potatoes. Serve it with steamed rice for a satisfying and comforting dinner.',
  'https://images.unsplash.com/photo-1532384159185-16f0bcfd5a5b?auto=format&fit=crop&w=1200&q=80'
),

(
  'Greek Salad',
  'Mediterranean',
  15,
  4,
  ARRAY[
    '3 ripe tomatoes',
    '1 cucumber',
    '1 green bell pepper',
    '1/2 red onion',
    '150g feta cheese',
    '100g Kalamata olives',
    '3 tbsp extra virgin olive oil',
    '1 tbsp red wine vinegar',
    '1 tsp dried oregano',
    'Salt',
    'Black pepper'
  ],
  'A fresh Mediterranean salad with tomatoes, cucumber, green pepper, red onion, Kalamata olives, and creamy feta finished with olive oil, vinegar, and oregano.',
  'https://images.unsplash.com/photo-1769481614068-47cfb4d1f125?auto=format&fit=crop&w=1200&q=80'
),

(
  'Blueberry Pancakes',
  'Breakfast',
  20,
  4,
  ARRAY[
    '250g all-purpose flour',
    '2 tbsp sugar',
    '2 tsp baking powder',
    '1/2 tsp salt',
    '2 large eggs',
    '300ml milk',
    '60g melted butter',
    '150g blueberries',
    'Maple syrup',
    '1 banana'
  ],
  'Light and fluffy pancakes layered into a stack with fresh blueberries and banana, then finished with a generous drizzle of maple syrup.',
  'https://images.unsplash.com/photo-1528198622811-0842b4e50787?auto=format&fit=crop&w=1200&q=80'
),

(
  'Margherita Pizza',
  'Italian',
  35,
  2,
  ARRAY[
    '300g pizza dough',
    '150g crushed tomatoes',
    '200g fresh mozzarella',
    'Fresh basil leaves',
    '2 tbsp extra virgin olive oil',
    '1 garlic clove',
    '1/2 tsp dried oregano',
    'Salt',
    'Black pepper'
  ],
  'A simple Italian pizza topped with tomato sauce, fresh mozzarella, basil, and olive oil. A hot oven gives the crust a crisp edge while keeping the center soft and flavorful.',
  'https://images.unsplash.com/photo-1772494047915-79042d21eb09?auto=format&fit=crop&w=1200&q=80'
),

(
  'Avocado Toast with Fried Eggs',
  'Breakfast',
  20,
  2,
  ARRAY[
    '2 slices sourdough bread',
    '1 ripe avocado',
    '2 large eggs',
    '1 tbsp lemon juice',
    '1 small red chili',
    '1 tbsp olive oil',
    '1/4 tsp chili flakes',
    '1 tbsp microgreens',
    'Salt',
    'Black pepper'
  ],
  'Crispy sourdough topped with creamy smashed avocado and fried eggs, finished with fresh microgreens, chili flakes, and a squeeze of lemon.',
  'https://images.unsplash.com/photo-1772717737730-85eff61606c8?auto=format&fit=crop&w=1200&q=80'
),

(
  'Japanese Pork Ramen',
  'Japanese',
  40,
  2,
  ARRAY[
    '2 portions ramen noodles',
    '400ml chicken or pork broth',
    '200g pork belly',
    '2 large eggs',
    '2 nori sheets',
    '2 spring onions',
    '100g bok choy',
    '1 tbsp soy sauce',
    '1 tbsp miso paste',
    '1 tsp sesame oil',
    '1 tsp grated ginger',
    '1 garlic clove'
  ],
  'A rich Japanese-inspired ramen bowl with tender pork, noodles, soft-boiled egg, bok choy, nori, and spring onions in a savory miso broth.',
  'https://images.unsplash.com/photo-1772217261042-0175d0b2fcb0?auto=format&fit=crop&w=1200&q=80'
),

(
  'Chocolate Cake',
  'Dessert',
  55,
  8,
  ARRAY[
    '200g all-purpose flour',
    '200g sugar',
    '60g cocoa powder',
    '1 tsp baking powder',
    '1 tsp baking soda',
    '1/2 tsp salt',
    '2 large eggs',
    '240ml buttermilk',
    '120ml vegetable oil',
    '2 tsp vanilla extract',
    '240ml hot coffee',
    '200g dark chocolate',
    '120ml heavy cream'
  ],
  'A rich and moist chocolate cake with an intense cocoa flavor and a smooth chocolate frosting. A little hot coffee enhances the depth of the chocolate.',
  'https://images.unsplash.com/photo-1518091270798-06f27624a89e?auto=format&fit=crop&w=1200&q=80'
),

(
  'Classic Beef Burger',
  'American',
  30,
  4,
  ARRAY[
    '600g ground beef',
    '4 brioche burger buns',
    '4 slices cheddar cheese',
    '1 tomato',
    '1 small lettuce',
    '1/2 red onion',
    '4 tbsp mayonnaise',
    '2 tbsp ketchup',
    '1 tbsp mustard',
    'Salt',
    'Black pepper'
  ],
  'A juicy beef burger with melted cheddar, crisp lettuce, tomato, red onion, and a simple combination of mayonnaise, ketchup, and mustard.',
  'https://images.unsplash.com/photo-1498654831517-895a5dfe4edc?auto=format&fit=crop&w=1200&q=80'
),

(
  'Caesar Salad',
  'Salad',
  20,
  4,
  ARRAY[
    '2 romaine lettuce hearts',
    '60g Parmesan cheese',
    '100g croutons',
    '2 anchovy fillets',
    '1 garlic clove',
    '1 egg yolk',
    '1 tbsp lemon juice',
    '1 tsp Dijon mustard',
    '80ml olive oil',
    'Salt',
    'Black pepper'
  ],
  'Crisp romaine lettuce tossed with Parmesan, crunchy croutons, and a creamy homemade Caesar dressing with lemon, garlic, Dijon mustard, and anchovies.',
  'https://images.unsplash.com/photo-1556386734-4227a180d19e?auto=format&fit=crop&w=1200&q=80'
),

(
  'French Toast with Berries',
  'Breakfast',
  20,
  4,
  ARRAY[
    '8 slices brioche bread',
    '3 large eggs',
    '180ml milk',
    '1 tsp vanilla extract',
    '1 tbsp sugar',
    '1/2 tsp cinnamon',
    '30g butter',
    '100g blueberries',
    '100g raspberries',
    'Maple syrup'
  ],
  'Golden French toast made with buttery brioche and warm cinnamon, served with fresh blueberries, raspberries, and maple syrup.',
  'https://images.unsplash.com/photo-1776763255323-373bd0e826b5?auto=format&fit=crop&w=1200&q=80'
),

(
  'Grilled Salmon with Lime',
  'Seafood',
  25,
  4,
  ARRAY[
    '4 salmon fillets',
    '2 limes',
    '2 garlic cloves',
    '2 tbsp olive oil',
    '1 tsp smoked paprika',
    '1/2 tsp dried oregano',
    '1 tbsp fresh cilantro',
    'Salt',
    'Black pepper'
  ],
  'Tender grilled salmon seasoned with garlic, smoked paprika, oregano, and lime. A bright and simple seafood dish that works well with rice or roasted vegetables.',
  'https://images.unsplash.com/photo-1773969423899-01812e1537f6?auto=format&fit=crop&w=1200&q=80'
),
(
  'Homemade Salmon Sushi',
  'Japanese',
  45,
  4,
  ARRAY[
    '300g sushi rice',
    '250g sushi-grade salmon',
    '4 nori sheets',
    '1 cucumber',
    '1 avocado',
    '3 tbsp rice vinegar',
    '1 tbsp sugar',
    '1 tsp salt',
    'Soy sauce',
    'Wasabi',
    'Pickled ginger'
  ],
  'Fresh homemade sushi rolls made with seasoned sushi rice, salmon, avocado, and cucumber, served with soy sauce, wasabi, and pickled ginger.',
  'https://images.unsplash.com/photo-1515692688679-6e42f517b64d?auto=format&fit=crop&w=1200&q=80'
),

(
  'Creamy White Bean Soup',
  'Soup',
  35,
  4,
  ARRAY[
    '400g cannellini beans',
    '1 onion',
    '2 garlic cloves',
    '2 carrots',
    '750ml vegetable stock',
    '150g mushrooms',
    '2 tbsp olive oil',
    '1 tsp dried thyme',
    '1 tsp rosemary',
    '1 lemon',
    'Salt',
    'Black pepper'
  ],
  'A hearty white bean soup with mushrooms, herbs, and roasted lemon. The creamy beans make this simple soup filling while keeping it vegetarian.',
  'https://images.unsplash.com/photo-1606791496080-69a6e309f42c?auto=format&fit=crop&w=1200&q=80'
),

(
  'Loaded Cheeseburger',
  'American',
  30,
  4,
  ARRAY[
    '600g ground beef',
    '4 burger buns',
    '4 slices cheddar cheese',
    '1 tomato',
    '1/2 onion',
    '4 lettuce leaves',
    '4 tbsp mayonnaise',
    '2 tbsp ketchup',
    '1 tbsp mustard',
    'Salt',
    'Black pepper'
  ],
  'A juicy cheeseburger piled high with melted cheddar, lettuce, tomato, onion, and a tangy burger sauce.',
  'https://images.unsplash.com/photo-1656439659132-24c68e36b553?auto=format&fit=crop&w=1200&q=80'
),

(
  'Grilled Cheese Sandwich',
  'American',
  15,
  2,
  ARRAY[
    '4 slices sourdough bread',
    '120g cheddar cheese',
    '40g butter',
    '1 tsp Dijon mustard',
    'Black pepper'
  ],
  'Golden grilled cheese sandwiches with crisp buttery bread and a rich, melted cheddar center. Perfect with tomato soup.',
  'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?auto=format&fit=crop&w=1200&q=80'
),

(
  'Green Goddess Vegetable Pita',
  'Vegetarian',
  20,
  2,
  ARRAY[
    '2 pita breads',
    '1 avocado',
    '100g mushrooms',
    '1 cup kale',
    '1/2 cucumber',
    '1 tomato',
    '50g hummus',
    '1 tbsp lemon juice',
    '1 tbsp olive oil',
    'Salt',
    'Black pepper'
  ],
  'A colorful vegetable pita packed with avocado, mushrooms, kale, tomato, cucumber, and creamy hummus.',
  'https://images.unsplash.com/photo-1534352211968-8d25dbe0e951?auto=format&fit=crop&w=1200&q=80'
),

(
  'Steak and Rosemary Fries',
  'American',
  35,
  2,
  ARRAY[
    '2 beef steaks',
    '500g potatoes',
    '2 tbsp olive oil',
    '2 rosemary sprigs',
    '2 garlic cloves',
    '30g butter',
    'Salt',
    'Black pepper'
  ],
  'Juicy pan-seared steak served with crisp rosemary fries and garlic butter. A straightforward steakhouse-style dinner.',
  'https://images.unsplash.com/photo-1752095809291-e183b49e1e4b?auto=format&fit=crop&w=1200&q=80'
),

(
  'Malaysian Fried Rice with Egg',
  'Asian',
  25,
  2,
  ARRAY[
    '400g cooked jasmine rice',
    '2 eggs',
    '1 carrot',
    '2 spring onions',
    '2 garlic cloves',
    '2 tbsp soy sauce',
    '1 tbsp sesame oil',
    '1 tbsp vegetable oil',
    '1/2 tsp white pepper',
    'Salt'
  ],
  'Fragrant fried rice tossed with vegetables and soy sauce, topped with a sunny fried egg for a satisfying one-pan meal.',
  'https://images.unsplash.com/photo-1768634003113-42903d7ffe1b?auto=format&fit=crop&w=1200&q=80'
),

(
  'Vegetable Omelette',
  'Breakfast',
  15,
  2,
  ARRAY[
    '4 large eggs',
    '1 tomato',
    '1/2 bell pepper',
    '1/4 onion',
    '50g cheddar cheese',
    '1 tbsp butter',
    '1 tbsp fresh parsley',
    'Salt',
    'Black pepper'
  ],
  'A fluffy omelette filled with colorful vegetables, melted cheese, and fresh herbs. A quick and protein-rich breakfast.',
  'https://images.unsplash.com/photo-1494597706938-de2cd7341979?auto=format&fit=crop&w=1200&q=80'
),

(
  'Butter Chicken with Naan',
  'Indian',
  50,
  4,
  ARRAY[
    '700g chicken thighs',
    '400g crushed tomatoes',
    '150ml heavy cream',
    '1 onion',
    '3 garlic cloves',
    '1 tbsp ginger',
    '2 tbsp butter',
    '2 tsp garam masala',
    '1 tsp turmeric',
    '1 tsp cumin',
    'Fresh mint',
    'Naan bread',
    'Salt'
  ],
  'Tender chicken simmered in a creamy tomato sauce with garam masala, ginger, garlic, and butter. Serve with warm naan bread.',
  'https://images.unsplash.com/photo-1772730065344-4cf131b39951?auto=format&fit=crop&w=1200&q=80'
),

(
  'Sri Lankan Vegetable Curry',
  'Sri Lankan',
  40,
  4,
  ARRAY[
    '1 eggplant',
    '2 carrots',
    '1 potato',
    '200g green beans',
    '1 onion',
    '3 garlic cloves',
    '200ml coconut milk',
    '1 tbsp curry powder',
    '1 tsp turmeric',
    '1 tsp cumin',
    '150g red lentils',
    'Fresh cilantro',
    'Salt'
  ],
  'A colorful Sri Lankan-inspired vegetable curry combining eggplant, lentils, vegetables, coconut milk, and warming spices.',
  'https://images.unsplash.com/photo-1743525700011-afac212694d7?auto=format&fit=crop&w=1200&q=80'
),

(
  'Fish and Vegetable Curry',
  'Asian',
  40,
  4,
  ARRAY[
    '500g white fish fillets',
    '200ml coconut milk',
    '1 broccoli head',
    '1 carrot',
    '100g bean sprouts',
    '1 onion',
    '2 garlic cloves',
    '1 tbsp fresh ginger',
    '2 tbsp curry paste',
    '150g cooked rice',
    '1 lime',
    'Fresh cilantro',
    'Salt'
  ],
  'A fragrant fish curry with broccoli, vegetables, bean sprouts, and rice in a lightly spiced coconut sauce.',
  'https://images.unsplash.com/photo-1761314036698-a7a6e8514905?auto=format&fit=crop&w=1200&q=80'
),

(
  'Fudgy Chocolate Brownies',
  'Dessert',
  40,
  9,
  ARRAY[
    '200g dark chocolate',
    '150g butter',
    '180g sugar',
    '3 eggs',
    '100g all-purpose flour',
    '40g cocoa powder',
    '1 tsp vanilla extract',
    '1/2 tsp salt',
    '100g chocolate chips'
  ],
  'Dense and fudgy chocolate brownies with a crisp top and rich chocolate center. Serve warm or let them cool completely for cleaner slices.',
  'https://images.unsplash.com/photo-1777647362214-ae62d7d4a707?auto=format&fit=crop&w=1200&q=80'
),

(
  'Almond Croissant',
  'Breakfast',
  10,
  2,
  ARRAY[
    '2 croissants',
    '60g almond paste',
    '30g butter',
    '30g powdered sugar',
    '30g sliced almonds',
    '1 tbsp milk',
    '1/2 tsp vanilla extract'
  ],
  'Buttery croissants filled and topped with almond cream and sliced almonds, then baked until golden and fragrant.',
  'https://images.unsplash.com/photo-1769437626773-4b2c1ac0cf6c?auto=format&fit=crop&w=1200&q=80'
),

(
  'Simple Garlic Noodles',
  'Asian',
  20,
  2,
  ARRAY[
    '250g noodles',
    '4 garlic cloves',
    '2 tbsp butter',
    '1 tbsp soy sauce',
    '1 tsp sesame oil',
    '2 spring onions',
    '1 tsp sesame seeds',
    '1/2 tsp chili flakes'
  ],
  'Quick noodles tossed with garlic, butter, soy sauce, sesame oil, and spring onions. An easy weeknight meal ready in minutes.',
  'https://images.unsplash.com/photo-1553909489-2542a1068437?auto=format&fit=crop&w=1200&q=80'
),

(
  'Egg Noodle Bowl',
  'Asian',
  25,
  2,
  ARRAY[
    '250g egg noodles',
    '2 eggs',
    '100g bok choy',
    '1 carrot',
    '2 spring onions',
    '2 garlic cloves',
    '500ml vegetable broth',
    '1 tbsp soy sauce',
    '1 tsp sesame oil',
    '1 tsp grated ginger'
  ],
  'A comforting bowl of noodles in a light savory broth with egg, bok choy, carrots, ginger, and spring onions.',
  'https://images.unsplash.com/photo-1545729869-e4f40b34394d?auto=format&fit=crop&w=1200&q=80'
),

(
  'Beef and Cheese Burrito',
  'Mexican',
  30,
  4,
  ARRAY[
    '500g ground beef',
    '4 large flour tortillas',
    '150g cheddar cheese',
    '200g cooked rice',
    '150g black beans',
    '1 tomato',
    '1/2 onion',
    '100g salsa',
    '1 tsp cumin',
    '1 tsp smoked paprika',
    'Fresh cilantro',
    'Salt'
  ],
  'A hearty burrito filled with seasoned beef, rice, black beans, cheese, tomato, onion, and salsa, wrapped in a warm flour tortilla.',
  'https://images.unsplash.com/photo-1707528904057-1b699ebb09b9?auto=format&fit=crop&w=1200&q=80'
),

(
  'Street Tacos with Lime',
  'Mexican',
  30,
  3,
  ARRAY[
    '450g skirt steak',
    '6 small corn tortillas',
    '1/2 red onion',
    '1 lime',
    '1 tomato',
    'Fresh cilantro',
    '1 tsp cumin',
    '1 tsp smoked paprika',
    '1 garlic clove',
    '1 tbsp olive oil',
    'Salt'
  ],
  'Tender steak tacos served on warm corn tortillas with red onion, tomato, cilantro, and plenty of fresh lime.',
  'https://images.unsplash.com/photo-1648437595587-e6a8b0cdf1f9?auto=format&fit=crop&w=1200&q=80'
),

(
  'Carne Asada Tacos',
  'Mexican',
  35,
  3,
  ARRAY[
    '450g flank steak',
    '6 corn tortillas',
    '1/2 red onion',
    '1 lime',
    '1/2 cup salsa verde',
    'Fresh cilantro',
    '1 avocado',
    '1 garlic clove',
    '1 tsp cumin',
    'Salt',
    'Black pepper'
  ],
  'Grilled carne asada served in soft corn tortillas with salsa verde, avocado, onion, cilantro, and lime.',
  'https://images.unsplash.com/photo-1760322327968-d5a0184003bb?auto=format&fit=crop&w=1200&q=80'
),

(
  'Blue Corn Fish Tacos',
  'Mexican',
  30,
  3,
  ARRAY[
    '400g white fish fillets',
    '6 blue corn tortillas',
    '4 radishes',
    '1/4 red cabbage',
    '1 lime',
    '1/2 cup salsa verde',
    'Fresh cilantro',
    '2 tbsp olive oil',
    '1 tsp cumin',
    'Salt',
    'Black pepper'
  ],
  'Fresh fish tacos served on blue corn tortillas with crunchy radish, cabbage, salsa verde, cilantro, and lime.',
  'https://images.unsplash.com/photo-1760322327968-d5a0184003bb?auto=format&fit=crop&w=1200&q=80'
),

(
  'Hearty Beef and Vegetable Soup',
  'Soup',
  55,
  6,
  ARRAY[
    '500g beef stew meat',
    '3 carrots',
    '2 potatoes',
    '2 celery stalks',
    '1 onion',
    '2 garlic cloves',
    '1 liter beef stock',
    '2 bay leaves',
    '1 tsp thyme',
    '2 tbsp olive oil',
    'Salt',
    'Black pepper'
  ],
  'A hearty slow-simmered soup with tender beef, carrots, potatoes, celery, and herbs in a rich savory broth.',
  'https://images.unsplash.com/photo-1572171579626-e79450374587?auto=format&fit=crop&w=1200&q=80'
),

(
  'Classic Ham and Cheese Sandwich',
  'Lunch',
  10,
  2,
  ARRAY[
    '4 slices sandwich bread',
    '100g ham',
    '80g cheddar cheese',
    '2 lettuce leaves',
    '1 tomato',
    '2 tbsp mayonnaise',
    '1 tsp Dijon mustard',
    'Butter',
    'Black pepper'
  ],
  'A classic ham and cheese sandwich with crisp lettuce, tomato, creamy mustard mayonnaise, and soft toasted bread.',
  'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=1200&q=80'
),

(
  'Egg and Avocado Breakfast Burger',
  'Breakfast',
  20,
  2,
  ARRAY[
    '2 whole grain buns',
    '3 eggs',
    '1 avocado',
    '2 lettuce leaves',
    '1 tomato',
    '1 tbsp mayonnaise',
    '1 tsp lemon juice',
    '1 tbsp olive oil',
    'Salt',
    'Black pepper'
  ],
  'A breakfast sandwich served in a toasted whole grain bun with creamy avocado, fluffy egg, lettuce, and tomato.',
  'https://images.unsplash.com/photo-1661699627895-407d542b78d1?auto=format&fit=crop&w=1200&q=80'
),

(
  'Tomato Basil Spaghetti',
  'Italian',
  25,
  4,
  ARRAY[
    '400g spaghetti',
    '400g cherry tomatoes',
    '3 garlic cloves',
    '3 tbsp olive oil',
    '40g Parmesan',
    'Fresh basil',
    '1/2 tsp chili flakes',
    'Salt',
    'Black pepper'
  ],
  'Simple spaghetti tossed with sweet tomatoes, garlic, olive oil, Parmesan, and fresh basil for a light Italian dinner.',
  'https://images.unsplash.com/photo-1593353618575-7cd597c5607e?auto=format&fit=crop&w=1200&q=80'
),

(
  'Mediterranean Olive Pasta',
  'Mediterranean',
  30,
  4,
  ARRAY[
    '400g linguine',
    '300g tomato passata',
    '100g black olives',
    '1 red bell pepper',
    '2 garlic cloves',
    '2 tbsp olive oil',
    '30g Parmesan',
    'Fresh parsley',
    '1 tsp oregano',
    'Salt',
    'Black pepper'
  ],
  'A vibrant pasta dish with tomato sauce, black olives, peppers, garlic, herbs, and Parmesan.',
  'https://images.unsplash.com/photo-1597131628347-c769fc631754?auto=format&fit=crop&w=1200&q=80'
),

(
  'Chicken Vegetable Tagliatelle',
  'Italian',
  35,
  4,
  ARRAY[
    '400g tagliatelle',
    '300g chicken breast',
    '1 zucchini',
    '1 bell pepper',
    '1 carrot',
    '2 garlic cloves',
    '2 tbsp olive oil',
    '2 tbsp soy sauce',
    '1 tsp paprika',
    'Fresh parsley',
    'Salt',
    'Black pepper'
  ],
  'Tender chicken and fresh vegetables tossed with tagliatelle in a savory sauce. A colorful and satisfying pasta dinner.',
  'https://images.unsplash.com/photo-1622219891248-f51115d632f0?auto=format&fit=crop&w=1200&q=80'
),

(
  'Classic Bolognese Spaghetti',
  'Italian',
  60,
  4,
  ARRAY[
    '400g spaghetti',
    '500g ground beef',
    '1 onion',
    '1 carrot',
    '1 celery stalk',
    '400g crushed tomatoes',
    '2 garlic cloves',
    '2 tbsp tomato paste',
    '150ml beef stock',
    '50g Parmesan',
    '2 tbsp olive oil',
    'Fresh basil',
    'Salt',
    'Black pepper'
  ],
  'A rich tomato-based Bolognese sauce slowly cooked with beef, onion, carrot, celery, and garlic, served over spaghetti with Parmesan.',
  'https://images.unsplash.com/photo-1614777986387-015c2a89b696?auto=format&fit=crop&w=1200&q=80'
),

(
  'Creamy Chicken Tagliatelle',
  'Italian',
  35,
  4,
  ARRAY[
    '400g tagliatelle',
    '300g chicken breast',
    '150ml heavy cream',
    '1 red bell pepper',
    '100g broccoli',
    '1 carrot',
    '2 garlic cloves',
    '40g Parmesan',
    '2 tbsp olive oil',
    '1 tsp paprika',
    'Salt',
    'Black pepper'
  ],
  'Creamy tagliatelle with golden pieces of chicken, broccoli, peppers, and carrots finished with Parmesan.',
  'https://images.unsplash.com/photo-1622219891248-f51115d632f0?auto=format&fit=crop&w=1200&q=80'
),

(
  'Blueberry Raspberry Pancakes',
  'Breakfast',
  20,
  4,
  ARRAY[
    '250g all-purpose flour',
    '2 tbsp sugar',
    '2 tsp baking powder',
    '1/2 tsp salt',
    '2 eggs',
    '300ml milk',
    '50g melted butter',
    '100g blueberries',
    '100g raspberries',
    'Maple syrup'
  ],
  'Fluffy pancakes served with fresh blueberries and raspberries, butter, and maple syrup.',
  'https://images.unsplash.com/photo-1488558980948-81db7f6c239c?auto=format&fit=crop&w=1200&q=80'
),

(
  'Berry Breakfast Waffles',
  'Breakfast',
  25,
  4,
  ARRAY[
    '250g all-purpose flour',
    '2 tbsp sugar',
    '2 tsp baking powder',
    '1/2 tsp salt',
    '2 eggs',
    '300ml milk',
    '70g melted butter',
    '100g mixed berries',
    'Maple syrup',
    'Powdered sugar'
  ],
  'Crisp golden waffles topped with fresh berries and maple syrup. A simple weekend breakfast with plenty of buttery flavor.',
  'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1200&q=80'
),

(
  'Fig and Pistachio Breakfast Tacos',
  'Breakfast',
  15,
  3,
  ARRAY[
    '3 small flour tortillas',
    '150g Greek yogurt',
    '3 fresh figs',
    '40g pistachios',
    '1 tbsp honey',
    '1/2 tsp cinnamon',
    '1 tbsp pomegranate seeds'
  ],
  'A creative sweet breakfast taco inspired by the photographed dish, combining creamy yogurt, fresh figs, pistachios, honey, and pomegranate.',
  'https://images.unsplash.com/photo-1632370339733-4896d407f6f9?auto=format&fit=crop&w=1200&q=80'
),

(
  'Dark Chocolate Cake',
  'Dessert',
  50,
  8,
  ARRAY[
    '200g all-purpose flour',
    '200g sugar',
    '60g cocoa powder',
    '1 tsp baking powder',
    '1 tsp baking soda',
    '1/2 tsp salt',
    '2 eggs',
    '240ml buttermilk',
    '120ml vegetable oil',
    '1 tsp vanilla extract',
    '200g dark chocolate',
    '120ml heavy cream'
  ],
  'A rich dark chocolate cake with layers of chocolate flavor and a smooth, indulgent finish.',
  'https://images.unsplash.com/photo-1518091270798-06f27624a89e?auto=format&fit=crop&w=1200&q=80'
);


