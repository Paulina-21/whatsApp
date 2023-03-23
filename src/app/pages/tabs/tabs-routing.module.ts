import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
{
  path: "",
  component: TabsPage,
  children: [
    {
      path: "status",
      loadChildren: () =>
      import("../status/status.module").then((m) => m.StatusPageModule),
    },
    {
      path: "calls",
      loadChildren: () =>
      import("../calls/calls.module").then((m) => m.CallsPageModule),
    },
    {
      path: "camera",
      loadChildren: () =>
      import("../camera/camera.module").then((m) =>m.CameraPageModule),
    },
    {
      path: "chats",
      loadChildren: () =>
      import("../chats/chats.module").then((m) => m.ChatsPageModule),
    },
    {
      path: "settings",
      loadChildren: () =>
      import("../settings/settings.module").then((m) => m.SettingsPageModule),
    },
    {
    path: "",
    pathMatch: "full",
    redirectTo: "chats",
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}