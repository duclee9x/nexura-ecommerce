
˝˚
nexura.protonexuraTelemetry":
GetBatchAddressesRequest

addressIds (	R
addressIds"[
GetBatchAddressesResponse>
	addresses (2 .nexuraTelemetry.ExtendedAddressR	addresses"1
GetAddressRequest
	addressId (	R	addressId"P
GetAddressResponse:
address (2 .nexuraTelemetry.ExtendedAddressRaddress"-
GetAddressesRequest
userId (	RuserId"ä
GetAddressesResponse
success (Rsuccess
message (	Rmessage>
	addresses (2 .nexuraTelemetry.ExtendedAddressR	addresses"Ç
GetCountriesResponse
success (Rsuccess
message (	Rmessage6
	countries (2.nexuraTelemetry.CountryR	countries"<
GetProvincesByCountryRequest
	countryId (	R	countryId"É
GetProvincesResponse
success (Rsuccess
message (	Rmessage7
	provinces (2.nexuraTelemetry.ProvinceR	provinces"?
GetDistrictsByProvinceRequest

provinceId (	R
provinceId"É
GetDistrictsResponse
success (Rsuccess
message (	Rmessage7
	districts (2.nexuraTelemetry.DistrictR	districts";
GetWardsByDistrictRequest

districtId (	R
districtId"s
GetWardsResponse
success (Rsuccess
message (	Rmessage+
wards (2.nexuraTelemetry.WardRwards"_
AddAddressRequest
userId (	RuserId2
address (2.nexuraTelemetry.AddressRaddress"j
UpdateAddressRequest
userId (	RuserId:
address (2 .nexuraTelemetry.ExtendedAddressRaddress"L
DeleteAddressRequest
userId (	RuserId
	addressId (	R	addressId"y
AddressResponse
success (Rsuccess
message (	Rmessage2
address (2.nexuraTelemetry.AddressRaddress"K
DeleteAddressResponse
success (Rsuccess
message (	Rmessage"I
Country
id (	Rid
name (	Rname
codeName (	RcodeName"å
Province
id (	Rid
name (	Rname
nameEn (	RnameEn
fullName (	RfullName

fullNameEn (	R
fullNameEn2
administrativeUnitId (	RadministrativeUnitId6
administrativeRegionId (	RadministrativeRegionId
	countryId (	R	countryId"÷
District
id (	Rid
name (	Rname
nameEn (	RnameEn
fullName (	RfullName

fullNameEn (	R
fullNameEn

provinceId (	R
provinceId2
administrativeUnitId (	RadministrativeUnitId"“
Ward
id (	Rid
name (	Rname
nameEn (	RnameEn
fullName (	RfullName

fullNameEn (	R
fullNameEn

districtId (	R
districtId2
administrativeUnitId (	RadministrativeUnitId"<
ResendOTPRequest
email (	Remail
type (	Rtype"G
ResendOTPResponse
success (Rsuccess
message (	Rmessage"0
GetBatchUsersRequest
userIds (	RuserIds"D
GetBatchUsersResponse+
users (2.nexuraTelemetry.UserRusers"K
GetAllUsersResponse4
users (2.nexuraTelemetry.UserWithOrderRusers"É
RegisterUserForAdminRequest
	firstName (	R	firstName
lastName (	RlastName
email (	Remail
phone (	Rphone"j
RegisterUserForAdminResponse
success (Rsuccess
message (	Rmessage
userId (	RuserId"P
UpdatePasswordRequest
email (	Remail!
new_password (	RnewPassword"L
UpdatePasswordResponse
success (Rsuccess
message (	Rmessage"-
ForgotPasswordRequest
email (	Remail"L
ForgotPasswordResponse
success (Rsuccess
message (	Rmessage"<
ValidateOTPRequest
email (	Remail
otp (	Rotp"i
ValidateOTPResponse
success (Rsuccess
message (	Rmessage

resetToken (	R
resetToken"e
ResetPasswordRequest
email (	Remail!
new_password (	RnewPassword
token (	Rtoken"K
ResetPasswordResponse
success (Rsuccess
message (	Rmessage" 
GetUserRequest
id (	Rid"s
UpdateUserResponse
success (Rsuccess
message (	Rmessage)
user (2.nexuraTelemetry.UserRuser"p
GetUserResponse
success (Rsuccess
message (	Rmessage)
user (2.nexuraTelemetry.UserRuser"#
DeleteUserRequest
id (	Rid"ä
UpdateUserRequest)
user (2.nexuraTelemetry.UserRuser(
currentPassword (	RcurrentPassword 
newPassword (	RnewPassword"Å
RegisterUserRequest
	firstName (	R	firstName
lastName (	RlastName
email (	Remail
password (	Rpassword"J
RegisterUserResponse
success (Rsuccess
message (	Rmessage"D
LoginUserRequest
email (	Remail
password (	Rpassword"∏
LoginUserResponse
success (Rsuccess
message (	Rmessage 
accessToken (	RaccessToken"
refreshToken (	RrefreshToken)
user (2.nexuraTelemetry.UserRuser"„
UserWithOrder
id (	Rid
	firstName (	R	firstName
lastName (	RlastName
email (	Remail
phone (	Rphone
	createdAt (	R	createdAt
isActive (	RisActive:
address (2 .nexuraTelemetry.ExtendedAddressRaddress 
totalOrders	 (RtotalOrders

totalSpent
 (R
totalSpent$
lastOrderDate (	RlastOrderDate"∞
User
id (	Rid
	firstName (	R	firstName
lastName (	RlastName
email (	Remail
phone (	Rphone
	createdAt (	R	createdAt 
dateOfBirth (	RdateOfBirth
gender (	Rgender
	updatedAt	 (	R	updatedAt
isActive
 (RisActive

isVerified (R
isVerified
role (	Rrole
	lastLogin (	R	lastLogin 
permissions (	Rpermissions,
profilePictureUrl (	RprofilePictureUrl"˜
ExtendedAddress
id (	Rid
name (	Rname
street (	Rstreet
city (	Rcity
state (	Rstate
	countryId (	R	countryId 
countryName (	RcountryName
zip (	Rzip"
vnProvinceId	 (	RvnProvinceId&
vnProvinceName
 (	RvnProvinceName"
vnDistrictId (	RvnDistrictId&
vnDistrictName (	RvnDistrictName
vnWardId (	RvnWardId

vnWardName (	R
vnWardName
	isDefault (R	isDefault
	createdAt (	R	createdAt
	updatedAt (	R	updatedAt"›
Address
id (	Rid
name (	Rname
street (	Rstreet
city (	Rcity
state (	Rstate
	countryId (	R	countryId
zip (	Rzip"
vnProvinceId (	RvnProvinceId"
vnDistrictId	 (	RvnDistrictId
vnWardId
 (	RvnWardId
	isDefault (R	isDefault
	createdAt (	R	createdAt
	updatedAt (	R	updatedAt"H
DeleteUserResponse
success (Rsuccess
message (	Rmessage",
VerifyAccountRequest
token (	Rtoken"K
VerifyAccountResponse
success (Rsuccess
message (	Rmessage")
GetCartRequest
user_id (	RuserId"<
GetCartResponse)
cart (2.nexuraTelemetry.CartRcart"æ
AddItemRequest
user_id (	RuserId

product_id (	R	productId

variant_id (	R	variantId
quantity (Rquantity
image (	Rimage#
currency_code (	RcurrencyCode"<
AddItemResponse)
cart (2.nexuraTelemetry.CartRcart"ú
UpdateItemRequest
user_id (	RuserId

product_id (	R	productId

variant_id (	R	variantId
quantity (Rquantity
image (	Rimage"?
UpdateItemResponse)
cart (2.nexuraTelemetry.CartRcart"j
RemoveItemRequest
user_id (	RuserId

product_id (	R	productId

variant_id (	R	variantId"?
RemoveItemResponse)
cart (2.nexuraTelemetry.CartRcart"+
ClearCartRequest
user_id (	RuserId"-
ClearCartResponse
success (Rsuccess"√
Cart
id (	Rid
user_id (	RuserId/
items (2.nexuraTelemetry.CartItemRitems

created_at (	R	createdAt

updated_at (	R	updatedAt#
currency_code (	RcurrencyCode"»
CartItem
id (	Rid

product_id (	R	productId

variant_id (	R	variantId
image (	Rimage
quantity (Rquantity

created_at (	R	createdAt

updated_at (	R	updatedAt".
ValidateCartRequest
user_id (	RuserId"è
ValidateCartResponse
valid (Rvalid
message (	Rmessage/
items (2.nexuraTelemetry.CartItemRitems
issues (	Rissues"V
ListRecommendationsRequest
user_id (	RuserId
product_ids (	R
productIds">
ListRecommendationsResponse
product_ids (	R
productIds"
Empty",
GetWishlistRequest
userId (	RuserId"Z
GetWishlistResponseC
wishlistItems (2.nexuraTelemetry.WishlistItemRwishlistItems"O
RemoveWishlistRequest

wishlistId (	R
wishlistId
userId (	RuserId"2
RemoveWishlistResponse
success (Rsuccess"»
WishlistItem
id (	Rid
	productId (	R	productId 
productName (	RproductName"
productImage (	RproductImage"
productPrice (RproductPrice 
productSlug (	RproductSlug"J
AddWishlistRequest
userId (	RuserId
	productId (	R	productId"I
AddWishlistResponse
success (Rsuccess
message (	Rmessage"<
GetVariantsForCartRequest
variant_ids (	R
variantIds"V
GetVariantsForCartResponse8
variants (2.nexuraTelemetry.VariantCartRvariants"S
ChangeProductStatusRequest

product_id (	R	productId
status (	Rstatus"7
ChangeProductStatusResponse
success (Rsuccess"ƒ
VariantCart
id (	Rid
price (Rprice
image (	Rimage
sku (	Rsku1
stock (2.nexuraTelemetry.StockH Rstockà!
variant_name (	RvariantName!
product_name (	RproductName!
product_slug (	RproductSlugA

attributes	 (2!.nexuraTelemetry.VariantAttributeR
attributesB
_stock"<
GetProductAttributesRequest

product_id (	R	productId"a
GetProductAttributesResponseA

attributes (2!.nexuraTelemetry.ProductAttributeR
attributes"a
UpdateProductAttributesRequest?
	attribute (2!.nexuraTelemetry.ProductAttributeR	attribute"b
UpdateProductAttributesResponse?
	attribute (2!.nexuraTelemetry.ProductAttributeR	attribute"C
DeleteProductAttributesRequest!
attribute_id (	RattributeId"D
DeleteProductAttributesResponse!
attribute_id (	RattributeId"`
CreateProductAttributeRequest?
	attribute (2!.nexuraTelemetry.ProductAttributeR	attribute"a
CreateProductAttributeResponse?
	attribute (2!.nexuraTelemetry.ProductAttributeR	attribute"®
ProductAttribute
id (	Rid
name (	Rname
required (Rrequired
visible (Rvisible
values (	Rvalues
	productId (	R	productId 
variantable (Rvariantable

filterable (R
filterable

searchable	 (R
searchable"
displayOrder
 (RdisplayOrder"Å
Product
id (	Rid
name (	Rname
slug (	Rslug 
description (	Rdescription
	costPrice (R	costPrice
	basePrice (R	basePrice
sku (	Rsku
barcode (	Rbarcode
brandId	 (	RbrandId
featured
 (Rfeatured
status (	Rstatus
	createdAt (	R	createdAt
	updatedAt (	R	updatedAt&
seo (2.nexuraTelemetry.SeoRseo
taxable (Rtaxable
	shippable (R	shippable

categories (	R
categories=
productTags (2.nexuraTelemetry.ProductTagRproductTags.
images (2.nexuraTelemetry.ImageRimagesA

attributes (2!.nexuraTelemetry.ProductAttributeR
attributes;
variants (2.nexuraTelemetry.ProductVariantRvariants;

dimensions (2.nexuraTelemetry.DimensionsR
dimensions:

sizeCharts (2.nexuraTelemetry.SizeChartR
sizeChartsB
relatedProducts (2.nexuraTelemetry.ProductRrelatedProducts"{
ProductRelatedProduct
id (	Rid
name (	Rname
slug (	Rslug
price (Rprice
image (	Rimage"Ñ
	SizeChart
id (	Rid
name (	Rname
category (	Rcategory%
description (	H Rdescriptionà
	productId (	R	productId:
columns (2 .nexuraTelemetry.SizeChartColumnRcolumns1
rows (2.nexuraTelemetry.SizeChartRowRrows7
images (2.nexuraTelemetry.SizeChartImageRimages
	createdAt	 (	R	createdAt
	updatedAt
 (	R	updatedAtB
_description"´
SizeChartColumn
id (	Rid
name (	Rname
type (	Rtype
unit (	H Runità 
sizeChartId (	RsizeChartId
	createdAt (	R	createdAtB
_unit"h
SizeChartRow
id (	Rid
name (	Rname4
cells (2.nexuraTelemetry.SizeChartCellRcells"5
SizeChartCell
id (	Rid
value (	Rvalue"Ü
SizeChartImage
id (	Rid
url (	Rurl
name (	Rname 
sizeChartId (	RsizeChartId
	createdAt (	R	createdAt"b

ProductTag
id (	Rid&
tag (2.nexuraTelemetry.TagRtag
	productId (	R	productId"e
Tag
id (	Rid
name (	Rname
	createdAt (	R	createdAt
	updatedAt (	R	updatedAt"j

Dimensions
length (Rlength
width (Rwidth
height (Rheight
weight (Rweight"Y
Seo
title (	Rtitle 
description (	Rdescription
keywords (	Rkeywords"π
ProductVariant
id (	Rid
name (	Rname
sku (	Rsku
price (Rprice,
lowStockThreshold (RlowStockThreshold,
stock (2.nexuraTelemetry.StockRstock 
warehouseId (	RwarehouseId
imageIds (	RimageIdsA

attributes	 (2!.nexuraTelemetry.VariantAttributeR
attributes"?
Stock
quantity (Rquantity
reserved (Rreserved"l
VariantAttribute
id (	Rid
name (	Rname
value (	Rvalue

extraValue (	R
extraValue"]
Image
id (	Rid
url (	Rurl
blurhash (	Rblurhash
isMain (RisMain"x
CreateProductRequest2
product (2.nexuraTelemetry.ProductRproduct,
relatedProductIds (	RrelatedProductIds"K
CreateProductResponse2
product (2.nexuraTelemetry.ProductRproduct"x
UpdateProductRequest2
product (2.nexuraTelemetry.ProductRproduct,
relatedProductIds (	RrelatedProductIds"1
UpdateProductResponse
success (Rsuccess"&
DeleteProductRequest
id (	Rid"'
DeleteProductResponse
id (	Rid"Q
CreateVariantRequest9
variant (2.nexuraTelemetry.ProductVariantRvariant"R
CreateVariantResponse9
variant (2.nexuraTelemetry.ProductVariantRvariant"B
CreateBrandRequest,
brand (2.nexuraTelemetry.BrandRbrand"C
CreateBrandResponse,
brand (2.nexuraTelemetry.BrandRbrand"S
GetAllCategoryResponse9

categories (2.nexuraTelemetry.CategoryR
categories"N
CreateCategoryRequest5
category (2.nexuraTelemetry.CategoryRcategory"O
CreateCategoryResponse5
category (2.nexuraTelemetry.CategoryRcategory"N
UpdateCategoryRequest5
category (2.nexuraTelemetry.CategoryRcategory"O
UpdateCategoryResponse5
category (2.nexuraTelemetry.CategoryRcategory"'
DeleteCategoryRequest
id (	Rid"(
DeleteCategoryResponse
id (	Rid"B
CreateImageRequest,
image (2.nexuraTelemetry.ImageRimage"C
CreateImageResponse,
image (2.nexuraTelemetry.ImageRimage"L
ListProductsResponse4
products (2.nexuraTelemetry.ProductRproducts"
ListProductsRequest";
GetProductRequest
data (	Rdata
type (	Rtype"H
GetProductResponse2
product (2.nexuraTelemetry.ProductRproduct"?
Brand
id (	Rid
name (	Rname
logo (	Rlogo"J
Category
id (	Rid
name (	Rname
parentId (	RparentId"S
GetWarehousesResponse:

warehouses (2.nexuraTelemetry.WarehouseR
warehouses"Å
	Warehouse
id (	Rid
name (	Rname
code (	Rcode
location (	Rlocation
address (	Raddress
manager (	Rmanager
contact (	Rcontact
status (	Rstatus
	createdAt	 (	R	createdAt
	updatedAt
 (	R	updatedAt"-
SearchProductsRequest
query (	Rquery"L
SearchProductsResponse2
results (2.nexuraTelemetry.ProductRresults".
	AdRequest!
context_keys (	RcontextKeys"3

AdResponse%
ads (2.nexuraTelemetry.AdRads";
Ad!
redirect_url (	RredirectUrl
text (	Rtext"?
NewBrandRequest,
brand (2.nexuraTelemetry.BrandRbrand"t
NewBrandResponse
success (Rsuccess
message (	Rmessage,
brand (2.nexuraTelemetry.BrandRbrand"$
RemoveBrandRequest
id (	Rid"I
RemoveBrandResponse
success (Rsuccess
message (	Rmessage"y
GetAllBrandResponse
success (Rsuccess
message (	Rmessage.
brands (2.nexuraTelemetry.BrandRbrands".
HealthCheckRequest
service (	Rservice"≤
HealthCheckResponseJ
status (22.nexuraTelemetry.HealthCheckResponse.ServingStatusRstatus"O
ServingStatus
UNKNOWN 
SERVING
NOT_SERVING
SERVICE_UNKNOWN"U
UpdateOrderPaymentRequest
order_id (	RorderId

payment_id (	R	paymentId"6
UpdateOrderPaymentResponse
success (Rsuccess"5
GetOrdersForAdminRequest
user_ids (	RuserIds"S
GetOrdersForAdminResponse6
orders (2.nexuraTelemetry.OrderForAdminRorders"ì
OrderForAdmin
userId (	RuserId!
total_orders (RtotalOrders
total_spent (R
totalSpent&
last_order_date (	RlastOrderDate"G
ListAllOrdersResponse.
orders (2.nexuraTelemetry.OrderRorders"a
UpdateTrackingNumberRequest
order_id (	RorderId'
tracking_number (	RtrackingNumber"8
UpdateTrackingNumberResponse
success (Rsuccess"D
AddOrderNoteRequest
order_id (	RorderId
note (	Rnote"H
AddOrderNoteResponse0
notes (2.nexuraTelemetry.OrderNoteRnotes"L
DeleteOrderNoteRequest
order_id (	RorderId
note_id (	RnoteId"3
DeleteOrderNoteResponse
success (Rsuccess",
ListOrdersRequest
user_id (	RuserId"D
ListOrdersResponse.
orders (2.nexuraTelemetry.OrderRorders"‚
CreateOrderRequest
user_id (	RuserId
cart_id (	RcartId0
items (2.nexuraTelemetry.OrderItemRitems%
payment_method (	RpaymentMethod)
payment_subtotal (RpaymentSubtotal#
payment_total (RpaymentTotal'
shipping_method (	RshippingMethod#
shipping_cost (RshippingCostK
shipping_address	 (2 .nexuraTelemetry.ExtendedAddressRshippingAddress1
coupons
 (2.nexuraTelemetry.CouponRcoupons#
currency_code (	RcurrencyCode"0
CreateOrderResponse
order_id (	RorderId"2
GetOrderStatusRequest
order_id (	RorderId"N
GetOrderStatusResponse4
status (2.nexuraTelemetry.OrderStatusRstatus",
GetOrderRequest
order_id (	RorderId"º
Order
id (	Rid)
user (2.nexuraTelemetry.UserRuser 
totalAmount (RtotalAmountJ
shippingAddress (2 .nexuraTelemetry.ExtendedAddressRshippingAddress
	paymentId (	R	paymentId4
status (2.nexuraTelemetry.OrderStatusRstatus
	createdAt (	R	createdAt0
items (2.nexuraTelemetry.OrderItemRitems5
shipping	 (2.nexuraTelemetry.ShippingRshipping2
payment
 (2.nexuraTelemetry.PaymentRpaymentI
statusHistory (2#.nexuraTelemetry.OrderStatusHistoryRstatusHistory0
notes (2.nexuraTelemetry.OrderNoteRnotes"g
	OrderNote
id (	Rid
orderId (	RorderId
note (	Rnote
	createdAt (	R	createdAt"ö
OrderStatusHistory
id (	Rid4
status (2.nexuraTelemetry.OrderStatusRstatus 
description (	Rdescription
	createdAt (	R	createdAt"@
GetOrderResponse,
order (2.nexuraTelemetry.OrderRorder"k
UpdateOrderStatusRequest
order_id (	RorderId4
status (2.nexuraTelemetry.OrderStatusRstatus"∏
UpdateOrderStatusResponse
order_id (	RorderId4
status (2.nexuraTelemetry.OrderStatusRstatus0
steps (2.nexuraTelemetry.OrderStepRsteps
message (	Rmessage"/
CancelOrderRequest
order_id (	RorderId"Ä
CancelOrderResponse
order_id (	RorderId4
status (2.nexuraTelemetry.OrderStatusRstatus
message (	Rmessage"é
	OrderStep
service (	Rservice3
status (2.nexuraTelemetry.StepStatusRstatus
error (	Rerror
	timestamp (	R	timestamp"f
ValidateAndReserveRequest
user_id (	RuserId0
items (2.nexuraTelemetry.OrderItemRitems"j
EnrichedCartItem
id (	Rid
price (Rprice
quantity (Rquantity
image (	Rimage"¨
ValidateAndReserveResponse
success (Rsuccess%
reservation_id (	RreservationIdM
validation_errors (2 .nexuraTelemetry.ValidationErrorRvalidationErrors"F
ValidationError

variant_id (	R	variantId
error (	Rerror"B
ReleaseReservationRequest%
reservation_id (	RreservationId"P
ReleaseReservationResponse
success (Rsuccess
message (	Rmessage"\
CommitReservationRequest%
reservation_id (	RreservationId
order_id (	RorderId"j
CommitReservationResponse
success (Rsuccess
message (	Rmessage
order_id (	RorderId"9
GetBatchPaymentsRequest

paymentIds (	R
paymentIds"P
GetBatchPaymentsResponse4
payments (2.nexuraTelemetry.PaymentRpayments"1
GetPaymentRequest
	paymentId (	R	paymentId"H
GetPaymentResponse2
payment (2.nexuraTelemetry.PaymentRpayment"ä
InitiatePaymentRequest
amount (Ramount<
provider (2 .nexuraTelemetry.PaymentProviderRprovider
currency (	Rcurrency"œ
InitiatePaymentResponse
	paymentId (	R	paymentId<
provider (2 .nexuraTelemetry.PaymentProviderRprovider 
redirectUrl (	RredirectUrl6
status (2.nexuraTelemetry.PaymentStatusRstatus"4
VerifyPaymentRequest
	paymentId (	R	paymentId"O
VerifyPaymentResponse6
status (2.nexuraTelemetry.PaymentStatusRstatus"4
CancelPaymentRequest
	paymentId (	R	paymentId"1
CancelPaymentResponse
success (Rsuccess"4
RefundPaymentRequest
	paymentId (	R	paymentId"1
RefundPaymentResponse
success (Rsuccess"7
GetPaymentStatusRequest
	paymentId (	R	paymentId"R
GetPaymentStatusResponse6
status (2.nexuraTelemetry.PaymentStatusRstatus"ö
CreateSagaOrderRequest
user_id (	RuserId
cart_id (	RcartId0
items (2.nexuraTelemetry.OrderItemRitems%
payment_method (	RpaymentMethod%
payment_amount (RpaymentAmount)
payment_currency (	RpaymentCurrencyK
shipping_address (2 .nexuraTelemetry.ExtendedAddressRshippingAddress'
shipping_method (	RshippingMethod#
shipping_cost	 (RshippingCost
subtotal
 (Rsubtotal1
coupons (2.nexuraTelemetry.CouponRcoupons
total (Rtotal#
currency_code (	RcurrencyCode"j
CreateSagaOrderResponse
order_id (	RorderId4
status (2.nexuraTelemetry.OrderStatusRstatus"ó
	OrderItem
id (	Rid
	variantId (	R	variantId
quantity (Rquantity
price (Rprice
	productId (	R	productId 
productName (	RproductName 
productSlug (	RproductSlug 
variantName (	RvariantName
sku	 (	Rsku
image
 (	Rimage"8
Coupon
code (	Rcode
discount (Rdiscount"◊
Payment
id (	Rid
method (	Rmethod
subtotal (Rsubtotal
total (Rtotal6
status (2.nexuraTelemetry.PaymentStatusRstatus
	createdAt (	R	createdAt
	updatedAt (	R	updatedAt"Á
Shipping
method (	Rmethod
cost (RcostJ
shippingAddress (2 .nexuraTelemetry.ExtendedAddressRshippingAddress,
estimatedDelivery (	RestimatedDelivery5
tracking (2.nexuraTelemetry.TrackingRtracking"¯
Tracking
number (	Rnumber
carrier (	Rcarrier
status (	Rstatus(
currentLocation (	RcurrentLocation8
history (2.nexuraTelemetry.TrackingEventRhistory>
coordinates (2.nexuraTelemetry.CoordinatesRcoordinates"ç
TrackingEvent
date (	Rdate
time (	Rtime
location (	Rlocation
status (	Rstatus 
description (	Rdescription"©
Coordinates.
origin (2.nexuraTelemetry.PointRorigin0
current (2.nexuraTelemetry.PointRcurrent8
destination (2.nexuraTelemetry.PointRdestination"+
Point
lat (Rlat
lng (Rlng*ú
ServiceName
UNSPECIFIED 
CART_SERVICE
USER_SERVICE
PRODUCT_SERVICE
RECOMMENDATION_SERVICE
SHIPPING_SERVICE
CURRENCY_SERVICE
PAYMENT_SERVICE
CHECKOUT_SERVICE

AD_SERVICE	
FEATURE_FLAG_SERVICE

ADDRESS_SERVICE
ORDER_SERVICE*∂
OrderStatus
ORDER_PENDING 
ORDER_PROCESSING
ORDER_SHIPPED
ORDER_COMPENSATING
ORDER_DELIVERED
ORDER_CANCELLED
ORDER_COMPLETED
ORDER_FAILED
ORDER_REFUNDED
ORDER_EXPIRED	
ORDER_ON_HOLD

ORDER_PAYMENT_PAID
ORDER_TRACKING_UPDATED
ORDER_NOTE_ADDED*k

StepStatus
STEP_PENDING 
STEP_STARTED
STEP_COMPLETED
STEP_FAILED
STEP_COMPENSATED*1
PaymentProvider
COD 

STRIPE	
VNPAY*å
PaymentStatus
PAYMENT_PENDING 
PAYMENT_PAID
PAYMENT_FAILED
PAYMENT_CANCELLED
PAYMENT_REFUNDED
PAYMENT_EXPIRED2“
AddressServiceM
GetCountries.nexuraTelemetry.Empty%.nexuraTelemetry.GetCountriesResponsem
GetProvincesByCountry-.nexuraTelemetry.GetProvincesByCountryRequest%.nexuraTelemetry.GetProvincesResponseo
GetDistrictsByProvince..nexuraTelemetry.GetDistrictsByProvinceRequest%.nexuraTelemetry.GetDistrictsResponsec
GetWardsByDistrict*.nexuraTelemetry.GetWardsByDistrictRequest!.nexuraTelemetry.GetWardsResponseR

AddAddress".nexuraTelemetry.AddAddressRequest .nexuraTelemetry.AddressResponseX
UpdateAddress%.nexuraTelemetry.UpdateAddressRequest .nexuraTelemetry.AddressResponse^
DeleteAddress%.nexuraTelemetry.DeleteAddressRequest&.nexuraTelemetry.DeleteAddressResponse[
GetAddresses$.nexuraTelemetry.GetAddressesRequest%.nexuraTelemetry.GetAddressesResponseU

GetAddress".nexuraTelemetry.GetAddressRequest#.nexuraTelemetry.GetAddressResponsej
GetBatchAddresses).nexuraTelemetry.GetBatchAddressesRequest*.nexuraTelemetry.GetBatchAddressesResponse2ê

UserService^
GetBatchUsers%.nexuraTelemetry.GetBatchUsersRequest&.nexuraTelemetry.GetBatchUsersResponseL
GetUser.nexuraTelemetry.GetUserRequest .nexuraTelemetry.GetUserResponseK
GetAllUsers.nexuraTelemetry.Empty$.nexuraTelemetry.GetAllUsersResponseU

UpdateUser".nexuraTelemetry.UpdateUserRequest#.nexuraTelemetry.UpdateUserResponseU

DeleteUser".nexuraTelemetry.DeleteUserRequest#.nexuraTelemetry.DeleteUserResponseR
	ResendOTP!.nexuraTelemetry.ResendOTPRequest".nexuraTelemetry.ResendOTPResponse[
RegisterUser$.nexuraTelemetry.RegisterUserRequest%.nexuraTelemetry.RegisterUserResponseR
	LoginUser!.nexuraTelemetry.LoginUserRequest".nexuraTelemetry.LoginUserResponsea
ForgotPassword&.nexuraTelemetry.ForgotPasswordRequest'.nexuraTelemetry.ForgotPasswordResponseX
ValidateOTP#.nexuraTelemetry.ValidateOTPRequest$.nexuraTelemetry.ValidateOTPResponse^
ResetPassword%.nexuraTelemetry.ResetPasswordRequest&.nexuraTelemetry.ResetPasswordResponse^
VerifyAccount%.nexuraTelemetry.VerifyAccountRequest&.nexuraTelemetry.VerifyAccountResponsea
UpdatePassword&.nexuraTelemetry.UpdatePasswordRequest'.nexuraTelemetry.UpdatePasswordResponses
RegisterUserForAdmin,.nexuraTelemetry.RegisterUserForAdminRequest-.nexuraTelemetry.RegisterUserForAdminResponse2í
CartServiceN
GetCart.nexuraTelemetry.GetCartRequest .nexuraTelemetry.GetCartResponse" N
AddItem.nexuraTelemetry.AddItemRequest .nexuraTelemetry.AddItemResponse" W

UpdateItem".nexuraTelemetry.UpdateItemRequest#.nexuraTelemetry.UpdateItemResponse" W

RemoveItem".nexuraTelemetry.RemoveItemRequest#.nexuraTelemetry.RemoveItemResponse" T
	ClearCart!.nexuraTelemetry.ClearCartRequest".nexuraTelemetry.ClearCartResponse" [
ValidateCart$.nexuraTelemetry.ValidateCartRequest%.nexuraTelemetry.ValidateCartResponse2ã
RecommendationServicer
ListRecommendations+.nexuraTelemetry.ListRecommendationsRequest,.nexuraTelemetry.ListRecommendationsResponse" 2ª
ProductService`
CreateProduct%.nexuraTelemetry.CreateProductRequest&.nexuraTelemetry.CreateProductResponse" `
UpdateProduct%.nexuraTelemetry.UpdateProductRequest&.nexuraTelemetry.UpdateProductResponse" `
DeleteProduct%.nexuraTelemetry.DeleteProductRequest&.nexuraTelemetry.DeleteProductResponse" `
CreateVariant%.nexuraTelemetry.CreateVariantRequest&.nexuraTelemetry.CreateVariantResponse" W

GetProduct".nexuraTelemetry.GetProductRequest#.nexuraTelemetry.GetProductResponse" ]
ListProducts$.nexuraTelemetry.ListProductsRequest%.nexuraTelemetry.ListProductsResponse" Z
CreateBrand#.nexuraTelemetry.CreateBrandRequest$.nexuraTelemetry.CreateBrandResponse" Q
NewBrand .nexuraTelemetry.NewBrandRequest!.nexuraTelemetry.NewBrandResponse" Z
RemoveBrand#.nexuraTelemetry.RemoveBrandRequest$.nexuraTelemetry.RemoveBrandResponse" M
GetAllBrand.nexuraTelemetry.Empty$.nexuraTelemetry.GetAllBrandResponse" o
GetVariantsForCart*.nexuraTelemetry.GetVariantsForCartRequest+.nexuraTelemetry.GetVariantsForCartResponse" r
ChangeProductStatus+.nexuraTelemetry.ChangeProductStatusRequest,.nexuraTelemetry.ChangeProductStatusResponse" c
CreateCategory&.nexuraTelemetry.CreateCategoryRequest'.nexuraTelemetry.CreateCategoryResponse" c
UpdateCategory&.nexuraTelemetry.UpdateCategoryRequest'.nexuraTelemetry.UpdateCategoryResponse" c
DeleteCategory&.nexuraTelemetry.DeleteCategoryRequest'.nexuraTelemetry.DeleteCategoryResponse" S
GetAllCategory.nexuraTelemetry.Empty'.nexuraTelemetry.GetAllCategoryResponse" u
GetProductAttributes,.nexuraTelemetry.GetProductAttributesRequest-.nexuraTelemetry.GetProductAttributesResponse" ~
UpdateProductAttributes/.nexuraTelemetry.UpdateProductAttributesRequest0.nexuraTelemetry.UpdateProductAttributesResponse" ~
DeleteProductAttributes/.nexuraTelemetry.DeleteProductAttributesRequest0.nexuraTelemetry.DeleteProductAttributesResponse" {
CreateProductAttribute..nexuraTelemetry.CreateProductAttributeRequest/.nexuraTelemetry.CreateProductAttributeResponse" Q
GetWarehouses.nexuraTelemetry.Empty&.nexuraTelemetry.GetWarehousesResponse" m
ValidateAndReserve*.nexuraTelemetry.ValidateAndReserveRequest+.nexuraTelemetry.ValidateAndReserveResponsem
ReleaseReservation*.nexuraTelemetry.ReleaseReservationRequest+.nexuraTelemetry.ReleaseReservationResponsej
CommitReservation).nexuraTelemetry.CommitReservationRequest*.nexuraTelemetry.CommitReservationResponseX
AddWishlist#.nexuraTelemetry.AddWishlistRequest$.nexuraTelemetry.AddWishlistResponseX
GetWishlist#.nexuraTelemetry.GetWishlistRequest$.nexuraTelemetry.GetWishlistResponsea
RemoveWishlist&.nexuraTelemetry.RemoveWishlistRequest'.nexuraTelemetry.RemoveWishlistResponse2P
	AdServiceC
GetAds.nexuraTelemetry.AdRequest.nexuraTelemetry.AdResponse" 2π
HealthServiceR
Check#.nexuraTelemetry.HealthCheckRequest$.nexuraTelemetry.HealthCheckResponseT
Watch#.nexuraTelemetry.HealthCheckRequest$.nexuraTelemetry.HealthCheckResponse02µ	
OrderServiceZ
createOrder#.nexuraTelemetry.CreateOrderRequest$.nexuraTelemetry.CreateOrderResponse" c
GetOrderStatus&.nexuraTelemetry.GetOrderStatusRequest'.nexuraTelemetry.GetOrderStatusResponse" Q
GetOrder .nexuraTelemetry.GetOrderRequest!.nexuraTelemetry.GetOrderResponse" l
GetOrdersForAdmin).nexuraTelemetry.GetOrdersForAdminRequest*.nexuraTelemetry.GetOrdersForAdminResponse" Z
CancelOrder#.nexuraTelemetry.CancelOrderRequest$.nexuraTelemetry.CancelOrderResponse" l
UpdateOrderStatus).nexuraTelemetry.UpdateOrderStatusRequest*.nexuraTelemetry.UpdateOrderStatusResponse" o
UpdateOrderPayment*.nexuraTelemetry.UpdateOrderPaymentRequest+.nexuraTelemetry.UpdateOrderPaymentResponse" W

ListOrders".nexuraTelemetry.ListOrdersRequest#.nexuraTelemetry.ListOrdersResponse" ]
AddOrderNote$.nexuraTelemetry.AddOrderNoteRequest%.nexuraTelemetry.AddOrderNoteResponse" f
DeleteOrderNote'.nexuraTelemetry.DeleteOrderNoteRequest(.nexuraTelemetry.DeleteOrderNoteResponse" u
UpdateTrackingNumber,.nexuraTelemetry.UpdateTrackingNumberRequest-.nexuraTelemetry.UpdateTrackingNumberResponse" Q
ListAllOrders.nexuraTelemetry.Empty&.nexuraTelemetry.ListAllOrdersResponse" 2ø
PaymentServiced
InitiatePayment'.nexuraTelemetry.InitiatePaymentRequest(.nexuraTelemetry.InitiatePaymentResponse^
VerifyPayment%.nexuraTelemetry.VerifyPaymentRequest&.nexuraTelemetry.VerifyPaymentResponse^
CancelPayment%.nexuraTelemetry.CancelPaymentRequest&.nexuraTelemetry.CancelPaymentResponse^
RefundPayment%.nexuraTelemetry.RefundPaymentRequest&.nexuraTelemetry.RefundPaymentResponseU

GetPayment".nexuraTelemetry.GetPaymentRequest#.nexuraTelemetry.GetPaymentResponseg
GetPaymentStatus(.nexuraTelemetry.GetPaymentStatusRequest).nexuraTelemetry.GetPaymentStatusResponseg
GetBatchPayments(.nexuraTelemetry.GetBatchPaymentsRequest).nexuraTelemetry.GetBatchPaymentsResponsebproto3