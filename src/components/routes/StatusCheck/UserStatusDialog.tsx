import { axiosInstance } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { apiRoutes, translate } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function UserStatusDialog() {
  const [open, setOpen] = useState(false);

  async function checkStatus() {
    const res = await axiosInstance.get(apiRoutes.status);

    if (res.data.response.registration_status === "waiting_for_confirmation") setOpen(true);
  }

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <Dialog open={open} modal>
      <DialogContent
        className="w-[375px] bottom-0 top-[none] h-[292px] translate-y-[0] rounded-b-none rounded-t-[20px]  p-6"
        showCloseButton={false}
      >
        <DialogHeader className="h-fit">
          <div className="m-auto w-fit text-sm">
            <img src="/public/wait.svg" width={56} height={56} />
          </div>
        </DialogHeader>
        <DialogDescription className="font-medium leading-8">
          <div>{translate("dearAgent")}</div>
          {translate("waitingStatusMessage")}
        </DialogDescription>
        <DialogFooter>
          <Button className="w-full">{translate("loginWithAnotherAccount")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
