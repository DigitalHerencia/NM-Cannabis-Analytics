const targetFiles = [
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\controllers\\breakdownController.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\controllers\\cityController.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\controllers\\comparisonController.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\controllers\\dispensariesController.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\controllers\\kpiController.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\controllers\\menusController.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\controllers\\salesController.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\controllers\\usersController.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\models\\Breakdown.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\models\\City.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\models\\Comparison.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\models\\Dispensaries.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\models\\KPI.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\models\\Menus.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\models\\Sales.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\models\\Users.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\routes\\breakdownRoute.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\routes\\cityRoute.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\routes\\comparisonRoute.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\routes\\dispensariesRoute.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\routes\\kpiRoute.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\routes\\menusRoute.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\routes\\salesRoute.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\routes\\usersRoute.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\index.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\server\\package.json",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\public\\index.html",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\public\\manifest.json",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\public\\robots.txt",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\AboveUserRankDispensariesCard.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\BelowUserRankDispensariesCard.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\BreakdownChart.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\ChartConfigModal.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\CircularIndeterminate.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\CombinedUserRankDispensariesCard.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\CustomButton.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\Daily.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\DataGridCustomColumnMenu.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\DataGridCustomToolbar.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\ErrorBoundary.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\FlexBetween.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\Header.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\KPI.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\LinearWithValueLabel.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\Loading.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\Market.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\MarketShare.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\MarketShareChart.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\Navbar.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\OverviewChart.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\ProductCategory.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\SalesSegment.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\SalesSegmentChart.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\SettingsModal.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\Sidebar.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\StatBox.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\components\\TrendingProductsTable.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\admin\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\breakdown\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\daily\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\dashboard\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\forecast\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\geography\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\layout\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\licensees\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\login\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\logout\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\notfound\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\overview\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\performance\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\products\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\register\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\scenes\\reports\\index.jsx",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\state\\api.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\state\\index.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\state\\legend.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\App.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\index.css",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\index.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\src\\theme.js",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\package.json",
    "H:\\DigitalHerencia\\.environments\\DigitalHerencia_CompetitiveAdvantage\\client\\webpack.config.js",
]

export default targetFiles;
