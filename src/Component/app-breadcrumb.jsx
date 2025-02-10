import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Container from "./conatiner/Container"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const routeLabels = {
    "/": "Home",
    "/calendar": "Calendar",
    "/user": "User",
};

const matchRoutePattern = (pathname, routes) => {
    for (const route in routes) {

        const pattern = route.replace(/:id/g, "([^/]+)");
        const regex = new RegExp(`^${pattern}$`);


        if (regex.test(pathname)) {
            return routes[route];
        }
    }
    return null;
};


function Appbreadcrumb() {
    const location = useLocation();

    const pathSegments = location.pathname.split("/").filter(Boolean);
    console.log(pathSegments, "pathSegments");
    if (location.pathname === "/") {
        pathSegments.unshift(""); 
    }
    
    const id = pathSegments[1] || "default-id";
    

    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")
            }`;
        const label = matchRoutePattern(href, routeLabels) || segment;
        console.log(label, "label");
        


        return { href, label };
    });

    console.log(breadcrumbs, "r");

    console.log(location.pathname, 'location');

    return (
        <div>

            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.map((breadcrumb, index) => {
                        if (index <= breadcrumbs.length ) {
                            return (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink asChild>
                                        <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
                                    </BreadcrumbLink>
                                    {index < breadcrumbs.length - 2 && <BreadcrumbSeparator />}
                                </BreadcrumbItem>
                            );
                        }
                    })}
                    {/* <BreadcrumbItem>
              <BreadcrumbPage>{children}</BreadcrumbPage>
            </BreadcrumbItem> */}
                </BreadcrumbList>
            </Breadcrumb>

        </div>
    )
}

export default Appbreadcrumb
