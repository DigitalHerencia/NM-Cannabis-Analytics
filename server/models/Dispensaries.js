import mongoose from "mongoose";

const avatarImageSchema = new mongoose.Schema(
  {
    small_url: { type: String },
    original_url: { type: String },
  },
  { _id: false }
);

const purchaseMinSchema = new mongoose.Schema(
  {
    cents: { type: Number },
    currency: { type: String },
    amount: { type: Number },
  },
  { _id: false }
);

const feeSchema = new mongoose.Schema(
  {
    cents: { type: Number },
    currency: { type: String },
    amount: { type: Number },
  },
  { _id: false }
);

const wmServiceFeeSchema = new mongoose.Schema(
  {
    cents: { type: Number },
    currency: { type: String },
    amount: { type: Number },
  },
  { _id: false }
);

const onlineOrderingSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean },
    disabled_reasons: [String],
    is_orders_enabled: { type: Boolean },
    is_logistics_enabled: { type: Boolean },
    after_hours_enabled: { type: Boolean },
    allow_hybrid_carts: { type: Boolean },
    accepting_orders: { type: Boolean },
    enabled_for_pickup: { type: Boolean },
    enabled_for_delivery: { type: Boolean },
    identification_required: { type: Boolean },
    display_delivery_details: { type: Boolean },
    purchase_min: purchaseMinSchema,
    fee: feeSchema,
    standard_eta_min: { type: Number },
    standard_eta_max: { type: Number },
    eta_min: { type: Number },
    eta_max: { type: Number },
    display_eta: { type: Boolean },
    wm_service_fee: wmServiceFeeSchema,
  },
  { _id: false }
);

const topDealsSchema = new mongoose.Schema(
  {
    id: { type: Number },
    slug: { type: String },
    title: { type: String },
  },
  { _id: false }
);

const dispensariesDataSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  slug: { type: String },
  state: { type: String },
  best_of_weedmaps: { type: Boolean },
  best_of_weedmaps_years: [Number],
  best_of_weedmaps_nominee_years: [Number],
  best_of_weedmaps_nominee: { type: Boolean },
  social_equity: { type: Boolean },
  city: { type: String },
  type: { type: String },
  wmid: { type: Number },
  latitude: { type: Number },
  longitude: { type: Number },
  web_url: { type: String },
  package_level: { type: String },
  feature_order: { type: Number },
  ranking: { type: Number },
  rating: { type: Number },
  reviews_count: { type: Number },
  avatar_image: avatarImageSchema,
  has_sale_items: { type: Boolean },
  license_type: { type: String },
  address: { type: String },
  distance: { type: Number },
  zip_code: { type: String },
  timezone: { type: String },
  timezone_display: { type: String },
  intro_body: { type: String },
  support_cause_link: { type: String },
  gofundme_link: { type: String },
  open_now: { type: Boolean },
  closes_in: { type: Number },
  todays_hours_str: { type: String },
  has_age_gate: { type: Boolean },
  min_age: { type: Number },
  region_id: { type: Number },
  promo_code: { type: String },
  menu_items_count: { type: Number },
  verified_menu_items_count: { type: Number },
  endorsement_badge_count: { type: Number },
  is_published: { type: Boolean },
  online_ordering: onlineOrderingSchema,
  retailer_services: [String],
  has_curbside_pickup: { type: Boolean },
  has_featured_deal: { type: Boolean },
  menu_id: { type: Number },
  email: { type: String },
  phone_number: { type: String },
  country: { type: String },
  accepts_credit_cards: { type: Boolean },
  is_brand_preferred_listing: { type: Boolean },
  preferred_organization_position: { type: String },
  events_link: { type: String },
  registration_link: { type: String },
  reservation_link: { type: String },
  top_deals: [topDealsSchema],
  top_deals_count: { type: Number },
});

const Dispensaries = mongoose.model(
  "Dispensaries",
  dispensariesDataSchema,
  "Dispensaries"
);

export default Dispensaries;
