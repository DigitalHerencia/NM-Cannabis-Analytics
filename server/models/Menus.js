import mongoose from "mongoose";

const pricesSchema = new mongoose.Schema(
  {
    price_unit: { type: Number },
    price_half_gram: { type: Number },
    price_gram: { type: Number },
    price_two_grams: { type: Number },
    price_eighth: { type: Number },
    price_quarter: { type: Number },
    price_half_ounce: { type: Number },
    price_ounce: { type: Number },
    prices_other: { type: Object },
  },
  { _id: false }
);

const parentCategorySchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    slug: { type: String },
  },
  { _id: false }
);

const subCategorySchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    slug: { type: String },
  },
  { _id: false }
);

const relationshipsSchema = new mongoose.Schema(
  {
    brand: {
      data: {
        id: { type: Number },
        type: { type: String },
      },
    },
    listing: {
      data: {
        id: { type: Number },
        type: { type: String },
      },
    },
    product: {
      data: {
        id: { type: Number },
        type: { type: String },
      },
    },
    strain: {
      data: { type: String },
    },
    categories: {
      meta: {
        total: { type: Number },
      },
      data: [
        {
          id: { type: Number },
          type: { type: String },
        },
      ],
    },
    tags: {
      meta: {
        total: { type: Number },
      },
      data: [String],
    },
    menu_parent: {
      data: {
        id: { type: Number },
        type: { type: String },
      },
    },
  },
  { _id: false }
);

const attributesSchema = new mongoose.Schema(
  {
    name: { type: String },
    slug: { type: String },
    category_name: { type: String },
    body: { type: String },
    is_published: { type: Boolean },
    license_type: { type: String },
    online_orderable: { type: Boolean },
    picture_url: { type: String },
    position: { type: Number },
    original_picture_url: { type: String },
    avatar_image_url: { type: String },
    is_badged: { type: Boolean },
    brand_name: { type: String },
    cannabinoids: { type: Object },
    genetics: { type: String },
    prices: pricesSchema,
    grams_per_eighth: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    parent_category: parentCategorySchema,
    sub_category: subCategorySchema,
    measurements: [String],
    variants: [Object],
    external_id: { type: String },
    sale: { type: String },
    sku: { type: String },
    compliance_net_mg: { type: Number },
    compliance_net_precalc: { type: Boolean },
    cart_quantity_multiplier: { type: Number },
    inventory_quantity: { type: Number },
    shared_inventory: { type: Boolean },
  },
  { _id: false }
);

const dataSchema = new mongoose.Schema(
  {
    id: { type: Number },
    type: { type: String },
    attributes: attributesSchema,
    links: {
      self: { type: String },
      order: { type: String },
    },
    relationships: relationshipsSchema,
  },
  { _id: false }
);

const metaSchema = new mongoose.Schema(
  {
    page: { type: Number },
    per_page: { type: Number },
    total: { type: Number },
  },
  { _id: false }
);

const menusDataSchema = new mongoose.Schema({
  meta: metaSchema,
  data: [dataSchema],
});

const Menus = mongoose.model("Menus", menusDataSchema, "Menus");

export default Menus;
