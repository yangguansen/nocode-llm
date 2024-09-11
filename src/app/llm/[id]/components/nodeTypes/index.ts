import { memorizeModelNode } from "./ModelNode";
import { memorizeSystemRoleNode } from "./SystemRoleNode";

export const nodeTypes = {
  model: memorizeModelNode,
  systemRole: memorizeSystemRoleNode,
};
