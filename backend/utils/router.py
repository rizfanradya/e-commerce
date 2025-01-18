from fastapi import APIRouter
import api.user as user
import api.auth as auth
import api.role as role
import api.item as item
import api.category as category
import api.cart as cart

routers = [
    (auth.router, "Auth API", "/api"),
    (role.router, "Role API", "/api"),
    (user.router, "User API", "/api"),
    (item.router, "Item API", "/api"),
    (cart.router, "Cart API", "/api"),
    (category.router, "Category API", "/api"),
]

sorted_routers = sorted(routers, key=lambda x: x[1])
router = APIRouter()
for router_instance, tag, prefix in sorted_routers:
    router.include_router(router_instance, tags=[tag], prefix=prefix)
