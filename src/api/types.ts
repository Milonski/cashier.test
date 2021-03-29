export type TResponse<T> = {
  jsonrpc: string;
  id: number;
} & (
  | { result: T }
  | {
      error: {
        code: number;
        message: string;
      };
    }
);

type TBaseUser = {
  id: number;
  login: string;
  name: string;
};

type TAdminRole = {
  role: "Admin";
};

type TManagerRole = {
  role: "Manager";
};

type TClientAdminRole = {
  role: "ClientAdmin";
  clientId: number;
};

type TAgentAdminRole = {
  role: "AgentAdmin";
  agentId: number;
};

type THallAdminRole = {
  role: "HallAdmin";
  hallId: number;
};

type TCashierRole = {
  role: "Cashier";
  hallId: number;
};

export type TUser = TBaseUser &
  (
    | TAdminRole
    | TManagerRole
    | TClientAdminRole
    | TAgentAdminRole
    | THallAdminRole
    | TCashierRole
  );

export type TPlayer = {
  id: number;
  login: string;
  balance: number;
  isBlocked: boolean;
  hallId: number;
  currency: string;
};

export type TAgent = {
  id: number;
  cliendId: number;
  parentAgentId: number | null;
  login: string;
  name: string;
  canHaveChildren: boolean;
  isBlocked: boolean;
  isBalanceUnlimited: boolean;
  balance: number;
  currency: string;
  subagentsCount: number;
  hallsCount: number;
};

export type TClient = {
  id: number;
  login: string;
  name: string;
  isBlocked: boolean;
};

export type TCurrency = {
  code: string;
  name: string;
};

export type THall = {
  id: number;
  login: string;
  clientId: number;
  agentId: number;
  name: string;
  balance: number;
  isBlocked: boolean;
  isBalanceUnlimited: boolean;
  currency: string;
  playersCount: number;
};

export type THistory = {
  id: number;
  externalId: string;
  roundId: string;
  createdAt: string;
  type: string;
  bet: number;
  win: number;
  balanceAfter: number;
  sessionStringId: string;
};

export type TProvider = {
  id: 4;
  name: string;
  isEnabled: boolean;
};

export type TWebsite = {
  id: number;
  domainName: string;
  isEnabled: boolean;
};

export type TGame = {
  id: number;
  stringId: string;
  brandId: number;
  providerId: number;
  name: string;
};

export type TChangeMoneyParams = {
  id: any;
  amount: any;
};

export type TGetByIdParams = {
  id: any;
};

export type TAccessParams = {
  ids?: any;
  clientId?: any;
  agentId?: any;
  hallId?: any;
};
