import {
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";

import { useStore } from "@/zustand/store";

export default function UserDetailsCard() {
const {user} = useStore();
  return (
    <Card className="m-4 mt-10">
      <CardHeader>
        <CardTitle>User details on this component</CardTitle>
        <CardDescription className="text-sm">
          fetching the details from store here !
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Name: {user.username || "-"}</p>
        <p>Email:  {user.email || "-"}</p>
        <p>Address: {user.address || "-"}</p>
      </CardContent>
    </Card>
  );
}
