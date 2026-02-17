import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import CreateProjectForm from "../Project/CreateProjectForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Redux/Store";
import { logout } from "../../Redux/Auth/Action";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector(store => store)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="border-b px-3 sm:px-6 lg:px-10 py-3">
      <div className="flex items-center justify-between gap-2">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer text-lg sm:text-2xl font-bold text-primary"
          >
            Projeklty
          </p>

          {/* Dialog Fix → asChild */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="cursor-pointer">
                New Project
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>

              <CreateProjectForm />
            </DialogContent>
          </Dialog>

          <Button onClick={() => navigate("/upgrade_plan")} variant="ghost" size="sm" className="cursor-pointer">
            Upgrade
          </Button>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Dropdown Fix → asChild */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full cursor-pointer"
              >
                <PersonIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} >LogOut</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hide name on very small screens */}
          <p className="text-sm hidden sm:block">{auth.user?.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
