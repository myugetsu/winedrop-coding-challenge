import { prisma } from "../models/prisma"; // Import Prisma client

// Helper function to highlight wines based on sales metric
function highlightWines(wines, metric) {
  const sortedWines = [...wines].sort((a, b) => b[metric] - a[metric]);
  const topThreshold = Math.ceil(sortedWines.length * 0.1);
  const bottomThreshold = Math.floor(sortedWines.length * 0.9);

  return sortedWines.map((wine, index) => {
    if (index < topThreshold) {
      wine.highlight = 'top'; // Highlight in green
    } else if (index >= bottomThreshold) {
      wine.highlight = 'bottom'; // Highlight in red
    }
    return wine;
  });
}

// Fetch best-selling wines with aggregation
export async function getBestSellingWines(metric = "totalRevenue", searchQuery = "") {
  const orders = await prisma.customerOrder.findMany({
    where: {
      status: {
        in: ["paid", "dispatched"],
      },
    },
    include: {
      wineProduct: {
        include: {
          masterWine: true, // Include master wine information
        },
      },
    },
  });

  // Aggregate orders for each wine
  const wineAggregation = orders.reduce((acc, order) => {
    const wineKey = `${order.wineProduct.masterWine.name}_${order.wineProduct.masterWine.vintage}`;

    if (!acc[wineKey]) {
      acc[wineKey] = {
        name: order.wineProduct.masterWine.name,
        vintage: order.wineProduct.masterWine.vintage,
        totalRevenue: 0, // Initialize as number
        totalBottles: 0,
        totalOrders: 0,
      };
    }

    // Round total_amount to two decimal places before adding
    const roundedTotalAmount = parseFloat(order.total_amount.toFixed(2));

    acc[wineKey].totalRevenue += roundedTotalAmount; // Add to totalRevenue
    acc[wineKey].totalBottles += order.quantity;
    acc[wineKey].totalOrders += 1;

    return acc;
  }, {});

  // Convert to array and round totalRevenue to 2 decimal places
  const winesArray = Object.values(wineAggregation).map(wine => ({
    ...wine,
    totalRevenue: Number(wine.totalRevenue.toFixed(2)), // Round to 2 decimal places
  }));

  // Apply search filtering
  const filteredWines = winesArray.filter(wine =>
    wine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Highlight wines based on the chosen metric
  const highlightedWines = highlightWines(filteredWines, metric);

  // Sort highlighted wines by the selected metric in descending order
  const sortedHighlightedWines = highlightedWines.sort((a, b) => b[metric] - a[metric]);

  return sortedHighlightedWines;
}
