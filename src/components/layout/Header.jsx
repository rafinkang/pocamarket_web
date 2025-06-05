import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { HeaderNavigationMenu } from "./HeaderNavigationMenu"

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <HeaderNavigationMenu />
        </div>
      </div>
    </header>
  )
}