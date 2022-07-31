var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Authenticated: () => Authenticated,
  CanAccess: () => CanAccess,
  ErrorComponent: () => ErrorComponent,
  LayoutWrapper: () => LayoutWrapper,
  LoginPage: () => LoginPage,
  ReadyPage: () => ReadyPage,
  Refine: () => Refine,
  RouteChangeHandler: () => RouteChangeHandler,
  UndoableQueue: () => UndoableQueue,
  createTreeView: () => createTreeView,
  file2Base64: () => file2Base64,
  getDefaultFilter: () => getDefaultFilter,
  getDefaultSortOrder: () => getDefaultSortOrder,
  handleUseParams: () => handleUseParams,
  importCSVMapper: () => importCSVMapper,
  parseTableParams: () => parseTableParams,
  parseTableParamsFromQuery: () => parseTableParamsFromQuery,
  routeGenerator: () => routeGenerator,
  setInitialFilters: () => setInitialFilters,
  setInitialSorters: () => setInitialSorters,
  stringifyTableParams: () => stringifyTableParams,
  unionFilters: () => unionFilters,
  unionSorters: () => unionSorters,
  useApiUrl: () => useApiUrl,
  useAuthenticated: () => useAuthenticated,
  useBreadcrumb: () => useBreadcrumb,
  useCan: () => useCan,
  useCanWithoutCache: () => useCanWithoutCache,
  useCancelNotification: () => useCancelNotification,
  useCheckError: () => useCheckError,
  useCreate: () => useCreate,
  useCreateMany: () => useCreateMany,
  useCustom: () => useCustom,
  useCustomMutation: () => useCustomMutation,
  useDataProvider: () => useDataProvider,
  useDelete: () => useDelete,
  useDeleteMany: () => useDeleteMany,
  useExport: () => useExport,
  useForm: () => useForm,
  useGetIdentity: () => useGetIdentity,
  useGetLocale: () => useGetLocale,
  useHandleNotification: () => useHandleNotification,
  useImport: () => useImport,
  useInvalidate: () => useInvalidate,
  useIsExistAuthentication: () => useIsExistAuthentication,
  useList: () => useList,
  useLiveMode: () => useLiveMode,
  useLog: () => useLog,
  useLogList: () => useLogList,
  useLogin: () => useLogin,
  useLogout: () => useLogout,
  useMany: () => useMany,
  useMenu: () => useMenu,
  useModal: () => useModal,
  useMutationMode: () => useMutationMode,
  useNavigation: () => useNavigation,
  useNotification: () => useNotification,
  useOne: () => useOne,
  usePermissions: () => usePermissions,
  usePublish: () => usePublish,
  useRedirectionAfterSubmission: () => useRedirectionAfterSubmission,
  useRefineContext: () => useRefineContext,
  useResource: () => useResource,
  useResourceSubscription: () => useResourceSubscription,
  useResourceWithRoute: () => useResourceWithRoute,
  useRouterContext: () => useRouterContext,
  useSelect: () => useSelect,
  useSetLocale: () => useSetLocale,
  useShow: () => useShow,
  useSubscription: () => useSubscription,
  useSyncWithLocation: () => useSyncWithLocation,
  useTable: () => useTable,
  useTitle: () => useTitle,
  useTranslate: () => useTranslate,
  useUpdate: () => useUpdate,
  useUpdateMany: () => useUpdateMany,
  useWarnAboutChange: () => useWarnAboutChange,
  userFriendlyResourceName: () => userFriendlyResourceName
});
module.exports = __toCommonJS(src_exports);

// src/components/pages/error/index.tsx
var import_react55 = __toESM(require("react"));

// src/hooks/auth/usePermissions/index.ts
var import_react2 = require("react");

// src/contexts/auth/index.tsx
var import_react = __toESM(require("react"));
var import_react_query = require("react-query");
var AuthContext = import_react.default.createContext({});
var AuthContextProvider = ({ children, isProvided, ...authOperations }) => {
  const { replace } = useNavigation();
  const queryClient = (0, import_react_query.useQueryClient)();
  const invalidateAuthStore = () => {
    queryClient.invalidateQueries(["useAuthenticated"]);
    queryClient.invalidateQueries(["getUserIdentity"]);
    queryClient.invalidateQueries(["usePermissions"]);
  };
  const loginFunc = async (params) => {
    var _a;
    try {
      const result = await ((_a = authOperations.login) == null ? void 0 : _a.call(authOperations, params));
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      invalidateAuthStore();
    }
  };
  const logoutFunc = async (params) => {
    var _a;
    try {
      const redirectPath = await ((_a = authOperations.logout) == null ? void 0 : _a.call(authOperations, params));
      return Promise.resolve(redirectPath);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      invalidateAuthStore();
    }
  };
  const checkAuthFunc = async (params) => {
    var _a;
    try {
      await ((_a = authOperations.checkAuth) == null ? void 0 : _a.call(authOperations, params));
      return Promise.resolve();
    } catch (error) {
      if (error == null ? void 0 : error.redirectPath) {
        replace(error.redirectPath);
      }
      return Promise.reject(error);
    } finally {
      invalidateAuthStore();
    }
  };
  return /* @__PURE__ */ import_react.default.createElement(AuthContext.Provider, {
    value: {
      ...authOperations,
      login: loginFunc,
      logout: logoutFunc,
      checkAuth: checkAuthFunc,
      isProvided
    }
  }, children);
};

// src/hooks/auth/usePermissions/index.ts
var import_react_query2 = require("react-query");
var usePermissions = (options) => {
  const { getPermissions } = (0, import_react2.useContext)(AuthContext);
  const queryResponse = (0, import_react_query2.useQuery)(
    ["usePermissions"],
    getPermissions != null ? getPermissions : () => Promise.resolve(void 0),
    {
      enabled: !!getPermissions,
      ...options
    }
  );
  return queryResponse;
};

// src/hooks/auth/useGetIdentity/index.ts
var import_react3 = __toESM(require("react"));
var import_react_query3 = require("react-query");
var useGetIdentity = ({
  queryOptions
} = {}) => {
  const { getUserIdentity } = import_react3.default.useContext(AuthContext);
  const queryResponse = (0, import_react_query3.useQuery)(
    ["getUserIdentity"],
    getUserIdentity != null ? getUserIdentity : () => Promise.resolve(void 0),
    {
      enabled: !!getUserIdentity,
      retry: false
    }
  );
  return queryResponse;
};

// src/hooks/auth/useLogout/index.ts
var import_react4 = __toESM(require("react"));
var import_react_query4 = require("react-query");
var useLogout = () => {
  const { push } = useNavigation();
  const { logout: logoutFromContext } = import_react4.default.useContext(AuthContext);
  const { open } = useNotification();
  const queryResponse = (0, import_react_query4.useMutation)(
    "useLogout",
    logoutFromContext,
    {
      onSuccess: (redirectPathFromAuth) => {
        if (redirectPathFromAuth !== false) {
          if (redirectPathFromAuth) {
            push(redirectPathFromAuth);
          } else {
            push("/login");
          }
        }
      },
      onError: (error) => {
        open == null ? void 0 : open({
          key: "useLogout-error",
          type: "error",
          message: (error == null ? void 0 : error.name) || "Logout Error",
          description: (error == null ? void 0 : error.message) || "Something went wrong during logout"
        });
      }
    }
  );
  return queryResponse;
};

// src/hooks/auth/useLogin/index.ts
var import_react5 = __toESM(require("react"));
var import_react_query5 = require("react-query");
var import_qs = __toESM(require("qs"));
var useLogin = () => {
  const { replace } = useNavigation();
  const { login: loginFromContext } = import_react5.default.useContext(AuthContext);
  const { useLocation } = useRouterContext();
  const { search } = useLocation();
  const { close, open } = useNotification();
  const { to } = import_qs.default.parse(search == null ? void 0 : search.substring(1));
  const queryResponse = (0, import_react_query5.useMutation)(
    "useLogin",
    loginFromContext,
    {
      onSuccess: (redirectPathFromAuth) => {
        if (to) {
          return replace(to);
        }
        if (redirectPathFromAuth !== false) {
          if (redirectPathFromAuth) {
            replace(redirectPathFromAuth);
          } else {
            replace("/");
          }
        }
        close == null ? void 0 : close("login-error");
      },
      onError: (error) => {
        open == null ? void 0 : open({
          message: (error == null ? void 0 : error.name) || "Login Error",
          description: (error == null ? void 0 : error.message) || "Invalid credentials",
          key: "login-error",
          type: "error"
        });
      }
    }
  );
  return queryResponse;
};

// src/hooks/auth/useAuthenticated/index.ts
var import_react6 = require("react");
var import_react_query6 = require("react-query");
var useAuthenticated = (params) => {
  const { checkAuth } = (0, import_react6.useContext)(AuthContext);
  const queryResponse = (0, import_react_query6.useQuery)(
    ["useAuthenticated", params],
    async () => {
      await (checkAuth == null ? void 0 : checkAuth(params));
    },
    {
      retry: false
    }
  );
  return queryResponse;
};

// src/hooks/auth/useCheckError/index.ts
var import_react7 = __toESM(require("react"));
var import_react_query7 = require("react-query");
var useCheckError = () => {
  const { checkError: checkErrorFromContext } = import_react7.default.useContext(AuthContext);
  const { mutate: logout } = useLogout();
  const queryResponse = (0, import_react_query7.useMutation)("useCheckError", checkErrorFromContext, {
    onError: (redirectPath) => {
      logout({ redirectPath });
    }
  });
  return queryResponse;
};

// src/hooks/auth/useIsExistAuthentication.ts
var import_react8 = require("react");
var useIsExistAuthentication = () => {
  const { isProvided } = (0, import_react8.useContext)(AuthContext);
  return isProvided || false;
};

// src/hooks/data/useList.ts
var import_react_query8 = require("react-query");

// src/definitions/helpers/userFriendlySeconds/index.ts
var userFriendlySecond = (miliseconds) => {
  return miliseconds / 1e3;
};

// src/definitions/helpers/importCSVMapper/index.ts
var import_zip = __toESM(require("lodash/zip"));
var import_fromPairs = __toESM(require("lodash/fromPairs"));
var importCSVMapper = (data, mapData = (item) => item) => {
  const [headers, ...body] = data;
  return body.map((entry) => (0, import_fromPairs.default)((0, import_zip.default)(headers, entry))).map(
    (item, index, array) => mapData.call(void 0, item, index, array)
  );
};

// src/definitions/helpers/userFriendlyResourceName/index.ts
var import_humanize_string = __toESM(require("humanize-string"));
var import_pluralize = __toESM(require("pluralize"));
var userFriendlyResourceName = (resource = "", type) => {
  const humanizeResource = (0, import_humanize_string.default)(resource);
  if (type === "singular") {
    return import_pluralize.default.singular(humanizeResource);
  }
  return import_pluralize.default.plural(humanizeResource);
};

// src/definitions/helpers/handleUseParams/index.tsx
var handleUseParams = (params = {}) => {
  if (params == null ? void 0 : params.id) {
    return {
      ...params,
      id: decodeURIComponent(params.id)
    };
  }
  return params;
};

// src/definitions/helpers/queryKeys/index.ts
var queryKeys = (resource, dataProviderName, metaData) => {
  const providerName = dataProviderName || "default";
  const keys = {
    all: [providerName],
    resourceAll: [providerName, resource || ""],
    list: (config) => [
      ...keys.resourceAll,
      "list",
      { ...config, ...metaData }
    ],
    many: (ids) => [
      ...keys.resourceAll,
      "getMany",
      ids && ids.map(String),
      { ...metaData }
    ].filter((item) => item !== void 0),
    detail: (id) => [
      ...keys.resourceAll,
      "detail",
      id == null ? void 0 : id.toString(),
      { ...metaData }
    ],
    logList: (meta) => ["logList", resource, meta, metaData].filter(
      (item) => item !== void 0
    )
  };
  return keys;
};

// src/definitions/helpers/hasPermission/index.ts
var hasPermission = (permissions, action) => {
  if (!permissions || !action) {
    return false;
  }
  return !!permissions.find((i) => i === action);
};

// src/definitions/helpers/routeGenerator/index.ts
var routeGenerator = (item, resourcesFromProps) => {
  let route;
  if (item.parentName) {
    const hasParentName = resourcesFromProps.find(
      (p) => p.name === item.parentName
    );
    if (hasParentName == null ? void 0 : hasParentName.parentName) {
      const routePrefix = routeGenerator(
        hasParentName,
        resourcesFromProps
      );
      route = `${routePrefix}/${item.name}`;
      routeGenerator(hasParentName, resourcesFromProps);
    } else if (item.parentName) {
      route = `${item.parentName}/${item.name}`;
    }
  } else {
    route = item.name;
  }
  return route;
};

// src/definitions/helpers/treeView/createTreeView/index.ts
var createTreeView = (resources) => {
  var _a, _b, _c;
  const tree = [];
  const resourcesRouteObject = {};
  const resourcesNameObject = {};
  let parent;
  let child;
  for (let i = 0; i < resources.length; i++) {
    parent = resources[i];
    const route = (_c = (_b = parent.route) != null ? _b : (_a = parent.options) == null ? void 0 : _a.route) != null ? _c : "";
    resourcesRouteObject[route] = parent;
    resourcesRouteObject[route]["children"] = [];
    resourcesNameObject[parent.name] = parent;
    resourcesNameObject[parent.name]["children"] = [];
  }
  for (const name in resourcesRouteObject) {
    if (resourcesRouteObject.hasOwnProperty(name)) {
      child = resourcesRouteObject[name];
      if (child.parentName && resourcesNameObject[child.parentName]) {
        resourcesNameObject[child.parentName]["children"].push(child);
      } else {
        tree.push(child);
      }
    }
  }
  return tree;
};

// src/hooks/data/useList.ts
var useList = ({
  resource,
  config,
  queryOptions,
  successNotification,
  errorNotification,
  metaData,
  liveMode,
  onLiveEvent,
  liveParams,
  dataProviderName
}) => {
  const dataProvider = useDataProvider();
  const queryKey = queryKeys(resource, dataProviderName, metaData);
  const { getList } = dataProvider(dataProviderName);
  const translate = useTranslate();
  const { mutate: checkError } = useCheckError();
  const handleNotification = useHandleNotification();
  const isEnabled = (queryOptions == null ? void 0 : queryOptions.enabled) === void 0 || (queryOptions == null ? void 0 : queryOptions.enabled) === true;
  useResourceSubscription({
    resource,
    types: ["*"],
    params: {
      metaData,
      pagination: config == null ? void 0 : config.pagination,
      hasPagination: config == null ? void 0 : config.hasPagination,
      sort: config == null ? void 0 : config.sort,
      filters: config == null ? void 0 : config.filters,
      subscriptionType: "useList",
      ...liveParams
    },
    channel: `resources/${resource}`,
    enabled: isEnabled,
    liveMode,
    onLiveEvent
  });
  const queryResponse = (0, import_react_query8.useQuery)(
    queryKey.list(config),
    () => {
      const { hasPagination, ...restConfig } = config || {};
      return getList({
        resource,
        ...restConfig,
        hasPagination,
        metaData
      });
    },
    {
      ...queryOptions,
      onSuccess: (data) => {
        var _a;
        (_a = queryOptions == null ? void 0 : queryOptions.onSuccess) == null ? void 0 : _a.call(queryOptions, data);
        const notificationConfig = typeof successNotification === "function" ? successNotification(
          data,
          { metaData, config },
          resource
        ) : successNotification;
        handleNotification(notificationConfig);
      },
      onError: (err) => {
        var _a;
        checkError(err);
        (_a = queryOptions == null ? void 0 : queryOptions.onError) == null ? void 0 : _a.call(queryOptions, err);
        const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, { metaData, config }, resource) : errorNotification;
        handleNotification(notificationConfig, {
          key: `${resource}-useList-notification`,
          message: translate(
            "common:notifications.error",
            { statusCode: err.statusCode },
            `Error (status code: ${err.statusCode})`
          ),
          description: err.message,
          type: "error"
        });
      }
    }
  );
  return queryResponse;
};

// src/hooks/data/useOne.ts
var import_react_query9 = require("react-query");

// src/definitions/table/index.ts
var import_qs2 = __toESM(require("qs"));
var import_unionWith = __toESM(require("lodash/unionWith"));
var import_differenceWith = __toESM(require("lodash/differenceWith"));
var parseTableParams = (url) => {
  const { current, pageSize, sorter, filters } = import_qs2.default.parse(
    url.substring(1)
  );
  return {
    parsedCurrent: current && Number(current),
    parsedPageSize: pageSize && Number(pageSize),
    parsedSorter: sorter != null ? sorter : [],
    parsedFilters: filters != null ? filters : []
  };
};
var parseTableParamsFromQuery = (params) => {
  const url = import_qs2.default.stringify(params);
  return parseTableParams(`/${url}`);
};
var stringifyTableParams = (params) => {
  const options = {
    skipNulls: true,
    arrayFormat: "indices",
    encode: false
  };
  const { pagination, sorter, filters } = params;
  const queryString = import_qs2.default.stringify(
    { ...pagination ? pagination : {}, sorter, filters },
    options
  );
  return queryString;
};
var compareFilters = (left, right) => {
  return ("field" in left ? left.field : void 0) == ("field" in right ? right.field : void 0) && left.operator == right.operator;
};
var compareSorters = (left, right) => left.field == right.field;
var unionFilters = (permanentFilter, newFilters, prevFilters = []) => (0, import_unionWith.default)(permanentFilter, newFilters, prevFilters, compareFilters).filter(
  (crudFilter) => crudFilter.value !== void 0 && crudFilter.value !== null && (crudFilter.operator !== "or" || crudFilter.operator === "or" && crudFilter.value.length !== 0)
);
var unionSorters = (permanentSorter, newSorters) => (0, import_unionWith.default)(permanentSorter, newSorters, compareSorters).filter(
  (crudSorter) => crudSorter.order !== void 0 && crudSorter.order !== null
);
var setInitialFilters = (permanentFilter, defaultFilter) => [
  ...(0, import_differenceWith.default)(defaultFilter, permanentFilter, compareFilters),
  ...permanentFilter
];
var setInitialSorters = (permanentSorter, defaultSorter) => [
  ...(0, import_differenceWith.default)(defaultSorter, permanentSorter, compareSorters),
  ...permanentSorter
];
var getDefaultSortOrder = (columnName, sorter) => {
  if (!sorter) {
    return void 0;
  }
  const sortItem = sorter.find((item) => item.field === columnName);
  if (sortItem) {
    return sortItem.order;
  }
  return void 0;
};
var getDefaultFilter = (columnName, filters, operatorType = "eq") => {
  const filter = filters == null ? void 0 : filters.find((filter2) => {
    if (filter2.operator !== "or") {
      const { operator, field } = filter2;
      return field === columnName && operator === operatorType;
    }
    return void 0;
  });
  if (filter) {
    return filter.value || [];
  }
  return void 0;
};

// src/definitions/upload/file2Base64/index.ts
var file2Base64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const resultHandler = () => {
      if (reader.result) {
        reader.removeEventListener("load", resultHandler, false);
        resolve(reader.result);
      }
    };
    reader.addEventListener("load", resultHandler, false);
    reader.readAsDataURL(file.originFileObj);
    reader.onerror = (error) => {
      reader.removeEventListener("load", resultHandler, false);
      return reject(error);
    };
  });
};

// src/hooks/data/useOne.ts
var useOne = ({
  resource,
  id,
  queryOptions,
  successNotification,
  errorNotification,
  metaData,
  liveMode,
  onLiveEvent,
  liveParams,
  dataProviderName
}) => {
  const dataProvider = useDataProvider();
  const queryKey = queryKeys(resource, dataProviderName, metaData);
  const { getOne } = dataProvider(dataProviderName);
  const translate = useTranslate();
  const { mutate: checkError } = useCheckError();
  const handleNotification = useHandleNotification();
  useResourceSubscription({
    resource,
    types: ["*"],
    channel: `resources/${resource}`,
    params: {
      ids: id ? [id] : [],
      id,
      metaData,
      subscriptionType: "useOne",
      ...liveParams
    },
    enabled: queryOptions == null ? void 0 : queryOptions.enabled,
    liveMode,
    onLiveEvent
  });
  const queryResponse = (0, import_react_query9.useQuery)(
    queryKey.detail(id),
    () => getOne({ resource, id, metaData }),
    {
      ...queryOptions,
      onSuccess: (data) => {
        var _a;
        (_a = queryOptions == null ? void 0 : queryOptions.onSuccess) == null ? void 0 : _a.call(queryOptions, data);
        const notificationConfig = typeof successNotification === "function" ? successNotification(data, { id, metaData }, resource) : successNotification;
        handleNotification(notificationConfig);
      },
      onError: (err) => {
        var _a;
        checkError(err);
        (_a = queryOptions == null ? void 0 : queryOptions.onError) == null ? void 0 : _a.call(queryOptions, err);
        const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, { id, metaData }, resource) : errorNotification;
        handleNotification(notificationConfig, {
          key: `${id}-${resource}-getOne-notification`,
          message: translate(
            "notifications.error",
            { statusCode: err.statusCode },
            `Error (status code: ${err.statusCode})`
          ),
          description: err.message,
          type: "error"
        });
      }
    }
  );
  return queryResponse;
};

// src/hooks/data/useMany.ts
var import_react_query10 = require("react-query");
var useMany = ({
  resource,
  ids,
  queryOptions,
  successNotification,
  errorNotification,
  metaData,
  liveMode,
  onLiveEvent,
  liveParams,
  dataProviderName
}) => {
  const dataProvider = useDataProvider();
  const queryKey = queryKeys(resource, dataProviderName, metaData);
  const { getMany } = dataProvider(dataProviderName);
  const translate = useTranslate();
  const { mutate: checkError } = useCheckError();
  const handleNotification = useHandleNotification();
  const isEnabled = (queryOptions == null ? void 0 : queryOptions.enabled) === void 0 || (queryOptions == null ? void 0 : queryOptions.enabled) === true;
  useResourceSubscription({
    resource,
    types: ["*"],
    params: {
      ids: ids != null ? ids : [],
      metaData,
      subscriptionType: "useMany",
      ...liveParams
    },
    channel: `resources/${resource}`,
    enabled: isEnabled,
    liveMode,
    onLiveEvent
  });
  const queryResponse = (0, import_react_query10.useQuery)(
    queryKey.many(ids),
    () => getMany({ resource, ids, metaData }),
    {
      ...queryOptions,
      onSuccess: (data) => {
        var _a;
        (_a = queryOptions == null ? void 0 : queryOptions.onSuccess) == null ? void 0 : _a.call(queryOptions, data);
        const notificationConfig = typeof successNotification === "function" ? successNotification(data, ids, resource) : successNotification;
        handleNotification(notificationConfig);
      },
      onError: (err) => {
        var _a;
        checkError(err);
        (_a = queryOptions == null ? void 0 : queryOptions.onError) == null ? void 0 : _a.call(queryOptions, err);
        const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, ids, resource) : errorNotification;
        handleNotification(notificationConfig, {
          key: `${ids[0]}-${resource}-getMany-notification`,
          message: translate(
            "notifications.error",
            { statusCode: err.statusCode },
            `Error (status code: ${err.statusCode})`
          ),
          description: err.message,
          type: "error"
        });
      }
    }
  );
  return queryResponse;
};

// src/hooks/data/useUpdate.ts
var import_react_query11 = require("react-query");

// src/contexts/undoableQueue/undoableQueueContext.tsx
var import_react9 = __toESM(require("react"));
var import_react_dom = require("react-dom");
var UndoableQueueContext = import_react9.default.createContext({
  notifications: [],
  notificationDispatch: () => false
});
var initialState = [];
var undoableQueueReducer = (state, action) => {
  switch (action.type) {
    case "ADD" /* ADD */:
      return [
        ...state.filter(
          (notificationItem) => notificationItem.id != action.payload.id && notificationItem.resource == action.payload.resource
        ),
        {
          ...action.payload,
          isRunning: true
        }
      ];
    case "REMOVE" /* REMOVE */:
      return state.filter(
        (notificationItem) => notificationItem.id != action.payload.id && notificationItem.resource == action.payload.resource
      );
    case "DECREASE_NOTIFICATION_SECOND" /* DECREASE_NOTIFICATION_SECOND */:
      return state.map((notificationItem) => {
        if (notificationItem.id == action.payload.id && notificationItem.resource == action.payload.resource) {
          return {
            ...notificationItem,
            seconds: action.payload.seconds - 1e3
          };
        }
        return notificationItem;
      });
    default:
      return state;
  }
};
var UndoableQueueContextProvider = ({ children }) => {
  const [notifications, notificationDispatch] = (0, import_react9.useReducer)(
    undoableQueueReducer,
    initialState
  );
  const notificationData = { notifications, notificationDispatch };
  return /* @__PURE__ */ import_react9.default.createElement(UndoableQueueContext.Provider, {
    value: notificationData
  }, children, typeof window !== "undefined" && (0, import_react_dom.createPortal)(
    /* @__PURE__ */ import_react9.default.createElement(UndoableQueue, {
      notifications
    }),
    document.body
  ));
};

// src/hooks/data/useUpdate.ts
var import_pluralize2 = __toESM(require("pluralize"));
var useUpdate = () => {
  const queryClient = (0, import_react_query11.useQueryClient)();
  const dataProvider = useDataProvider();
  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext
  } = useMutationMode();
  const translate = useTranslate();
  const { mutate: checkError } = useCheckError();
  const publish = usePublish();
  const { log } = useLog();
  const { notificationDispatch } = useCancelNotification();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const mutation = (0, import_react_query11.useMutation)(
    ({
      id,
      values,
      resource,
      mutationMode,
      undoableTimeout,
      onCancel,
      metaData,
      dataProviderName
    }) => {
      const mutationModePropOrContext = mutationMode != null ? mutationMode : mutationModeContext;
      const undoableTimeoutPropOrContext = undoableTimeout != null ? undoableTimeout : undoableTimeoutContext;
      if (!(mutationModePropOrContext === "undoable")) {
        return dataProvider(dataProviderName).update(
          {
            resource,
            id,
            variables: values,
            metaData
          }
        );
      }
      const updatePromise = new Promise(
        (resolve, reject) => {
          const doMutation = () => {
            dataProvider(dataProviderName).update({
              resource,
              id,
              variables: values,
              metaData
            }).then((result) => resolve(result)).catch((err) => reject(err));
          };
          const cancelMutation = () => {
            reject({ message: "mutationCancelled" });
          };
          if (onCancel) {
            onCancel(cancelMutation);
          }
          notificationDispatch({
            type: "ADD" /* ADD */,
            payload: {
              id,
              resource,
              cancelMutation,
              doMutation,
              seconds: undoableTimeoutPropOrContext,
              isSilent: !!onCancel
            }
          });
        }
      );
      return updatePromise;
    },
    {
      onMutate: async ({
        resource,
        id,
        mutationMode,
        values,
        dataProviderName
      }) => {
        const queryKey = queryKeys(resource, dataProviderName);
        const previousQueries = queryClient.getQueriesData(queryKey.resourceAll);
        const mutationModePropOrContext = mutationMode != null ? mutationMode : mutationModeContext;
        await queryClient.cancelQueries(
          queryKey.resourceAll,
          void 0,
          {
            silent: true
          }
        );
        if (!(mutationModePropOrContext === "pessimistic")) {
          queryClient.setQueriesData(
            queryKey.list(),
            (previous) => {
              if (!previous) {
                return null;
              }
              const data = previous.data.map((record) => {
                var _a;
                if (((_a = record.id) == null ? void 0 : _a.toString()) === (id == null ? void 0 : id.toString())) {
                  return {
                    id,
                    ...values
                  };
                }
                return record;
              });
              return {
                ...previous,
                data
              };
            }
          );
          queryClient.setQueriesData(
            queryKey.many(),
            (previous) => {
              if (!previous) {
                return null;
              }
              const data = previous.data.map((record) => {
                var _a;
                if (((_a = record.id) == null ? void 0 : _a.toString()) === (id == null ? void 0 : id.toString())) {
                  record = {
                    id,
                    ...values
                  };
                }
                return record;
              });
              return {
                ...previous,
                data
              };
            }
          );
          queryClient.setQueriesData(
            queryKey.detail(id),
            (previous) => {
              if (!previous) {
                return null;
              }
              return {
                ...previous,
                data: {
                  ...previous.data,
                  ...values
                }
              };
            }
          );
        }
        return {
          previousQueries,
          queryKey
        };
      },
      onSettled: (_data, _error, {
        id,
        resource,
        dataProviderName,
        invalidates = ["list", "many", "detail"]
      }) => {
        invalidateStore({
          resource,
          dataProviderName,
          invalidates,
          id
        });
        notificationDispatch({
          type: "REMOVE" /* REMOVE */,
          payload: { id, resource }
        });
      },
      onSuccess: (data, {
        id,
        resource,
        successNotification,
        dataProviderName,
        values,
        metaData
      }, context) => {
        var _a;
        const resourceSingular = import_pluralize2.default.singular(resource);
        const notificationConfig = typeof successNotification === "function" ? successNotification(data, { id, values }, resource) : successNotification;
        handleNotification(notificationConfig, {
          key: `${id}-${resource}-notification`,
          description: translate(
            "notifications.success",
            "Successful"
          ),
          message: translate(
            "notifications.editSuccess",
            {
              resource: translate(
                `${resource}.${resource}`,
                resourceSingular
              )
            },
            `Successfully updated ${resourceSingular}`
          ),
          type: "success"
        });
        publish == null ? void 0 : publish({
          channel: `resources/${resource}`,
          type: "updated",
          payload: {
            ids: ((_a = data.data) == null ? void 0 : _a.id) ? [data.data.id] : void 0
          },
          date: new Date()
        });
        let previousData;
        if (context) {
          const queryData = queryClient.getQueryData(context.queryKey.detail(id));
          previousData = Object.keys(values).reduce(
            (acc, item) => {
              var _a2;
              acc[item] = (_a2 = queryData == null ? void 0 : queryData.data) == null ? void 0 : _a2[item];
              return acc;
            },
            {}
          );
        }
        const { fields, operation, variables, ...rest } = metaData || {};
        log == null ? void 0 : log.mutate({
          action: "update",
          resource,
          data: values,
          previousData,
          meta: {
            id,
            dataProviderName,
            ...rest
          }
        });
      },
      onError: (err, { id, resource, errorNotification, values }, context) => {
        if (context) {
          for (const query of context.previousQueries) {
            queryClient.setQueryData(query[0], query[1]);
          }
        }
        if (err.message !== "mutationCancelled") {
          checkError == null ? void 0 : checkError(err);
          const resourceSingular = import_pluralize2.default.singular(resource);
          const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, { id, values }, resource) : errorNotification;
          handleNotification(notificationConfig, {
            key: `${id}-${resource}-notification`,
            message: translate(
              "notifications.editError",
              {
                resource: translate(
                  `${resource}.${resource}`,
                  resourceSingular
                ),
                statusCode: err.statusCode
              },
              `Error when updating ${resourceSingular} (status code: ${err.statusCode})`
            ),
            description: err.message,
            type: "error"
          });
        }
      }
    }
  );
  return mutation;
};

// src/hooks/data/useCreate.ts
var import_react_query12 = require("react-query");
var import_pluralize3 = __toESM(require("pluralize"));
var useCreate = () => {
  const { mutate: checkError } = useCheckError();
  const dataProvider = useDataProvider();
  const invalidateStore = useInvalidate();
  const translate = useTranslate();
  const publish = usePublish();
  const { log } = useLog();
  const handleNotification = useHandleNotification();
  const mutation = (0, import_react_query12.useMutation)(
    ({
      resource,
      values,
      metaData,
      dataProviderName
    }) => {
      return dataProvider(dataProviderName).create({
        resource,
        variables: values,
        metaData
      });
    },
    {
      onSuccess: (data, {
        resource,
        successNotification: successNotificationFromProp,
        dataProviderName,
        invalidates = ["list", "many"],
        values,
        metaData
      }) => {
        var _a, _b, _c;
        const resourceSingular = import_pluralize3.default.singular(resource);
        const notificationConfig = typeof successNotificationFromProp === "function" ? successNotificationFromProp(data, values, resource) : successNotificationFromProp;
        handleNotification(notificationConfig, {
          key: `create-${resource}-notification`,
          message: translate(
            "notifications.createSuccess",
            {
              resource: translate(
                `${resource}.${resource}`,
                resourceSingular
              )
            },
            `Successfully created ${resourceSingular}`
          ),
          description: translate("notifications.success", "Success"),
          type: "success"
        });
        invalidateStore({
          resource,
          dataProviderName,
          invalidates
        });
        publish == null ? void 0 : publish({
          channel: `resources/${resource}`,
          type: "created",
          payload: {
            ids: ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.id) ? [data.data.id] : void 0
          },
          date: new Date()
        });
        const { fields, operation, variables, ...rest } = metaData || {};
        log == null ? void 0 : log.mutate({
          action: "create",
          resource,
          data: values,
          meta: {
            dataProviderName,
            id: (_c = (_b = data == null ? void 0 : data.data) == null ? void 0 : _b.id) != null ? _c : void 0,
            ...rest
          }
        });
      },
      onError: (err, {
        resource,
        errorNotification: errorNotificationFromProp,
        values
      }) => {
        checkError(err);
        const resourceSingular = import_pluralize3.default.singular(resource);
        const notificationConfig = typeof errorNotificationFromProp === "function" ? errorNotificationFromProp(err, values, resource) : errorNotificationFromProp;
        handleNotification(notificationConfig, {
          key: `create-${resource}-notification`,
          description: err.message,
          message: translate(
            "notifications.createError",
            {
              resource: translate(
                `${resource}.${resource}`,
                resourceSingular
              ),
              statusCode: err.statusCode
            },
            `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`
          ),
          type: "error"
        });
      }
    }
  );
  return mutation;
};

// src/hooks/data/useDelete.ts
var import_react_query13 = require("react-query");
var import_pluralize4 = __toESM(require("pluralize"));
var useDelete = () => {
  const { mutate: checkError } = useCheckError();
  const dataProvider = useDataProvider();
  const queryClient = (0, import_react_query13.useQueryClient)();
  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext
  } = useMutationMode();
  const { notificationDispatch } = useCancelNotification();
  const translate = useTranslate();
  const publish = usePublish();
  const { log } = useLog();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const mutation = (0, import_react_query13.useMutation)(
    ({
      id,
      mutationMode,
      undoableTimeout,
      resource,
      onCancel,
      metaData,
      dataProviderName,
      values
    }) => {
      const mutationModePropOrContext = mutationMode != null ? mutationMode : mutationModeContext;
      const undoableTimeoutPropOrContext = undoableTimeout != null ? undoableTimeout : undoableTimeoutContext;
      if (!(mutationModePropOrContext === "undoable")) {
        return dataProvider(dataProviderName).deleteOne({
          resource,
          id,
          metaData,
          variables: values
        });
      }
      const deletePromise = new Promise(
        (resolve, reject) => {
          const doMutation = () => {
            dataProvider(dataProviderName).deleteOne({
              resource,
              id,
              metaData,
              variables: values
            }).then((result) => resolve(result)).catch((err) => reject(err));
          };
          const cancelMutation = () => {
            reject({ message: "mutationCancelled" });
          };
          if (onCancel) {
            onCancel(cancelMutation);
          }
          notificationDispatch({
            type: "ADD" /* ADD */,
            payload: {
              id,
              resource,
              cancelMutation,
              doMutation,
              seconds: undoableTimeoutPropOrContext,
              isSilent: !!onCancel
            }
          });
        }
      );
      return deletePromise;
    },
    {
      onMutate: async ({
        id,
        resource,
        mutationMode,
        dataProviderName
      }) => {
        const queryKey = queryKeys(resource, dataProviderName);
        const mutationModePropOrContext = mutationMode != null ? mutationMode : mutationModeContext;
        await queryClient.cancelQueries(
          queryKey.resourceAll,
          void 0,
          {
            silent: true
          }
        );
        const previousQueries = queryClient.getQueriesData(queryKey.resourceAll);
        if (!(mutationModePropOrContext === "pessimistic")) {
          queryClient.setQueriesData(
            queryKey.list(),
            (previous) => {
              if (!previous) {
                return null;
              }
              const data = previous.data.filter(
                (record) => {
                  var _a;
                  return ((_a = record.id) == null ? void 0 : _a.toString()) !== id.toString();
                }
              );
              return {
                data,
                total: previous.total - 1
              };
            }
          );
          queryClient.setQueriesData(
            queryKey.many(),
            (previous) => {
              if (!previous) {
                return null;
              }
              const data = previous.data.filter(
                (record) => {
                  var _a;
                  return ((_a = record.id) == null ? void 0 : _a.toString()) !== (id == null ? void 0 : id.toString());
                }
              );
              return {
                ...previous,
                data
              };
            }
          );
        }
        return {
          previousQueries,
          queryKey
        };
      },
      onSettled: (_data, _error, {
        id,
        resource,
        dataProviderName,
        invalidates = ["list", "many"]
      }) => {
        invalidateStore({
          resource,
          dataProviderName,
          invalidates
        });
        notificationDispatch({
          type: "REMOVE" /* REMOVE */,
          payload: { id, resource }
        });
      },
      onSuccess: (_data, {
        id,
        resource,
        successNotification,
        dataProviderName,
        metaData
      }, context) => {
        const resourceSingular = import_pluralize4.default.singular(resource != null ? resource : "");
        queryClient.removeQueries(context == null ? void 0 : context.queryKey.detail(id));
        const notificationConfig = typeof successNotification === "function" ? successNotification(_data, id, resource) : successNotification;
        handleNotification(notificationConfig, {
          key: `${id}-${resource}-notification`,
          description: translate("notifications.success", "Success"),
          message: translate(
            "notifications.deleteSuccess",
            {
              resource: translate(
                `${resource}.${resource}`,
                resourceSingular
              )
            },
            `Successfully deleted a ${resourceSingular}`
          ),
          type: "success"
        });
        publish == null ? void 0 : publish({
          channel: `resources/${resource}`,
          type: "deleted",
          payload: {
            ids: id ? [id] : []
          },
          date: new Date()
        });
        const { fields, operation, variables, ...rest } = metaData || {};
        log == null ? void 0 : log.mutate({
          action: "delete",
          resource,
          meta: {
            id,
            dataProviderName,
            ...rest
          }
        });
        queryClient.removeQueries(context == null ? void 0 : context.queryKey.detail(id));
      },
      onError: (err, { id, resource, errorNotification }, context) => {
        if (context) {
          for (const query of context.previousQueries) {
            queryClient.setQueryData(query[0], query[1]);
          }
        }
        if (err.message !== "mutationCancelled") {
          checkError(err);
          const resourceSingular = import_pluralize4.default.singular(resource != null ? resource : "");
          const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, id, resource) : errorNotification;
          handleNotification(notificationConfig, {
            key: `${id}-${resource}-notification`,
            message: translate(
              "notifications.deleteError",
              {
                resource: resourceSingular,
                statusCode: err.statusCode
              },
              `Error (status code: ${err.statusCode})`
            ),
            description: err.message,
            type: "error"
          });
        }
      }
    }
  );
  return mutation;
};

// src/hooks/data/useCreateMany.ts
var import_react_query14 = require("react-query");
var import_pluralize5 = __toESM(require("pluralize"));
var useCreateMany = () => {
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const publish = usePublish();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const mutation = (0, import_react_query14.useMutation)(
    ({
      resource,
      values,
      metaData,
      dataProviderName
    }) => dataProvider(dataProviderName).createMany({
      resource,
      variables: values,
      metaData
    }),
    {
      onSuccess: (response, {
        resource,
        successNotification,
        dataProviderName,
        invalidates = ["list", "many"],
        values
      }) => {
        const resourcePlural = import_pluralize5.default.plural(resource);
        const notificationConfig = typeof successNotification === "function" ? successNotification(response, values, resource) : successNotification;
        handleNotification(notificationConfig, {
          key: `createMany-${resource}-notification`,
          message: translate(
            "notifications.createSuccess",
            {
              resource: translate(
                `${resource}.${resource}`,
                resource
              )
            },
            `Successfully created ${resourcePlural}`
          ),
          description: translate("notifications.success", "Success"),
          type: "success"
        });
        invalidateStore({
          resource,
          dataProviderName,
          invalidates
        });
        const ids = response == null ? void 0 : response.data.filter((item) => (item == null ? void 0 : item.id) !== void 0).map((item) => item.id);
        publish == null ? void 0 : publish({
          channel: `resources/${resource}`,
          type: "created",
          payload: {
            ids
          },
          date: new Date()
        });
      },
      onError: (err, { resource, errorNotification, values }) => {
        const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, values, resource) : errorNotification;
        handleNotification(notificationConfig, {
          key: `createMany-${resource}-notification`,
          description: err.message,
          message: translate(
            "notifications.createError",
            {
              resource: translate(
                `${resource}.${resource}`,
                resource
              ),
              statusCode: err.statusCode
            },
            `There was an error creating ${resource} (status code: ${err.statusCode}`
          ),
          type: "error"
        });
      }
    }
  );
  return mutation;
};

// src/hooks/data/useUpdateMany.ts
var import_react_query15 = require("react-query");
var import_pluralize6 = __toESM(require("pluralize"));
var useUpdateMany = () => {
  const queryClient = (0, import_react_query15.useQueryClient)();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext
  } = useMutationMode();
  const { mutate: checkError } = useCheckError();
  const { notificationDispatch } = useCancelNotification();
  const publish = usePublish();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const mutation = (0, import_react_query15.useMutation)(
    ({
      ids,
      values,
      resource,
      onCancel,
      mutationMode,
      undoableTimeout,
      metaData,
      dataProviderName
    }) => {
      const mutationModePropOrContext = mutationMode != null ? mutationMode : mutationModeContext;
      const undoableTimeoutPropOrContext = undoableTimeout != null ? undoableTimeout : undoableTimeoutContext;
      if (!(mutationModePropOrContext === "undoable")) {
        return dataProvider(dataProviderName).updateMany({
          resource,
          ids,
          variables: values,
          metaData
        });
      }
      const updatePromise = new Promise(
        (resolve, reject) => {
          const doMutation = () => {
            dataProvider(dataProviderName).updateMany({
              resource,
              ids,
              variables: values,
              metaData
            }).then((result) => resolve(result)).catch((err) => reject(err));
          };
          const cancelMutation = () => {
            reject({ message: "mutationCancelled" });
          };
          if (onCancel) {
            onCancel(cancelMutation);
          }
          notificationDispatch({
            type: "ADD" /* ADD */,
            payload: {
              id: ids,
              resource,
              cancelMutation,
              doMutation,
              seconds: undoableTimeoutPropOrContext,
              isSilent: !!onCancel
            }
          });
        }
      );
      return updatePromise;
    },
    {
      onMutate: async ({
        resource,
        ids,
        values,
        mutationMode,
        dataProviderName,
        metaData
      }) => {
        const queryKey = queryKeys(
          resource,
          dataProviderName,
          metaData
        );
        const mutationModePropOrContext = mutationMode != null ? mutationMode : mutationModeContext;
        await queryClient.cancelQueries(
          queryKey.resourceAll,
          void 0,
          {
            silent: true
          }
        );
        const previousQueries = queryClient.getQueriesData(queryKey.resourceAll);
        if (!(mutationModePropOrContext === "pessimistic")) {
          queryClient.setQueriesData(
            queryKey.list(),
            (previous) => {
              if (!previous) {
                return null;
              }
              const data = previous.data.map((record) => {
                if (record.id !== void 0 && ids.filter((id) => id !== void 0).map(String).includes(record.id.toString())) {
                  return {
                    ...record,
                    ...values
                  };
                }
                return record;
              });
              return {
                ...previous,
                data
              };
            }
          );
          queryClient.setQueriesData(
            queryKey.many(),
            (previous) => {
              if (!previous) {
                return null;
              }
              const data = previous.data.map((record) => {
                if (record.id !== void 0 && ids.filter((id) => id !== void 0).map(String).includes(record.id.toString())) {
                  return {
                    ...record,
                    ...values
                  };
                }
                return record;
              });
              return {
                ...previous,
                data
              };
            }
          );
          for (const id of ids) {
            queryClient.setQueriesData(
              queryKey.detail(id),
              (previous) => {
                if (!previous) {
                  return null;
                }
                const data = {
                  ...previous.data,
                  ...values
                };
                return {
                  ...previous,
                  data
                };
              }
            );
          }
        }
        return {
          previousQueries,
          queryKey
        };
      },
      onSettled: (_data, _error, { ids, resource, dataProviderName }) => {
        invalidateStore({
          resource,
          invalidates: ["list", "many"],
          dataProviderName
        });
        ids.forEach(
          (id) => invalidateStore({
            resource,
            invalidates: ["detail"],
            dataProviderName,
            id
          })
        );
        notificationDispatch({
          type: "REMOVE" /* REMOVE */,
          payload: { id: ids, resource }
        });
      },
      onSuccess: (data, { ids, resource, successNotification, values }) => {
        const resourceSingular = import_pluralize6.default.singular(resource);
        const notificationConfig = typeof successNotification === "function" ? successNotification(data, { ids, values }, resource) : successNotification;
        handleNotification(notificationConfig, {
          key: `${ids}-${resource}-notification`,
          description: translate(
            "notifications.success",
            "Successful"
          ),
          message: translate(
            "notifications.editSuccess",
            {
              resource: translate(
                `${resource}.${resource}`,
                resource
              )
            },
            `Successfully updated ${resourceSingular}`
          ),
          type: "success"
        });
        publish == null ? void 0 : publish({
          channel: `resources/${resource}`,
          type: "updated",
          payload: {
            ids: ids.map(String)
          },
          date: new Date()
        });
      },
      onError: (err, { ids, resource, errorNotification, values }, context) => {
        if (context) {
          for (const query of context.previousQueries) {
            queryClient.setQueryData(query[0], query[1]);
          }
        }
        if (err.message !== "mutationCancelled") {
          checkError == null ? void 0 : checkError(err);
          const resourceSingular = import_pluralize6.default.singular(resource);
          const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, { ids, values }, resource) : errorNotification;
          handleNotification(notificationConfig, {
            key: `${ids}-${resource}-updateMany-error-notification`,
            message: translate(
              "notifications.editError",
              {
                resource: resourceSingular,
                statusCode: err.statusCode
              },
              `Error when updating ${resourceSingular} (status code: ${err.statusCode})`
            ),
            description: err.message,
            type: "error"
          });
        }
      }
    }
  );
  return mutation;
};

// src/hooks/data/useDeleteMany.ts
var import_react_query16 = require("react-query");
var import_pluralize7 = __toESM(require("pluralize"));
var useDeleteMany = () => {
  const { mutate: checkError } = useCheckError();
  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext
  } = useMutationMode();
  const dataProvider = useDataProvider();
  const { notificationDispatch } = useCancelNotification();
  const translate = useTranslate();
  const publish = usePublish();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const queryClient = (0, import_react_query16.useQueryClient)();
  const mutation = (0, import_react_query16.useMutation)(
    ({
      resource,
      ids,
      mutationMode,
      undoableTimeout,
      onCancel,
      metaData,
      dataProviderName,
      values
    }) => {
      const mutationModePropOrContext = mutationMode != null ? mutationMode : mutationModeContext;
      const undoableTimeoutPropOrContext = undoableTimeout != null ? undoableTimeout : undoableTimeoutContext;
      if (!(mutationModePropOrContext === "undoable")) {
        return dataProvider(dataProviderName).deleteMany({
          resource,
          ids,
          metaData,
          variables: values
        });
      }
      const updatePromise = new Promise(
        (resolve, reject) => {
          const doMutation = () => {
            dataProvider(dataProviderName).deleteMany({
              resource,
              ids,
              metaData,
              variables: values
            }).then((result) => resolve(result)).catch((err) => reject(err));
          };
          const cancelMutation = () => {
            reject({ message: "mutationCancelled" });
          };
          if (onCancel) {
            onCancel(cancelMutation);
          }
          notificationDispatch({
            type: "ADD" /* ADD */,
            payload: {
              id: ids,
              resource,
              cancelMutation,
              doMutation,
              seconds: undoableTimeoutPropOrContext,
              isSilent: !!onCancel
            }
          });
        }
      );
      return updatePromise;
    },
    {
      onMutate: async ({
        ids,
        resource,
        mutationMode,
        dataProviderName
      }) => {
        const queryKey = queryKeys(resource, dataProviderName);
        const mutationModePropOrContext = mutationMode != null ? mutationMode : mutationModeContext;
        await queryClient.cancelQueries(
          queryKey.resourceAll,
          void 0,
          {
            silent: true
          }
        );
        const previousQueries = queryClient.getQueriesData(queryKey.resourceAll);
        if (!(mutationModePropOrContext === "pessimistic")) {
          queryClient.setQueriesData(
            queryKey.list(),
            (previous) => {
              if (!previous) {
                return null;
              }
              const data = previous.data.filter(
                (item) => item.id && !ids.map(String).includes(item.id.toString())
              );
              return {
                data,
                total: previous.total - 1
              };
            }
          );
          queryClient.setQueriesData(
            queryKey.many(),
            (previous) => {
              if (!previous) {
                return null;
              }
              const data = previous.data.filter(
                (record) => {
                  if (record.id) {
                    return !ids.map(String).includes(record.id.toString());
                  }
                  return false;
                }
              );
              return {
                ...previous,
                data
              };
            }
          );
          for (const id of ids) {
            queryClient.setQueriesData(
              queryKey.detail(id),
              (previous) => {
                if (!previous || previous.data.id == id) {
                  return null;
                }
                return {
                  ...previous
                };
              }
            );
          }
        }
        return {
          previousQueries,
          queryKey
        };
      },
      onSettled: (_data, _error, {
        resource,
        ids,
        dataProviderName,
        invalidates = ["list", "many"]
      }) => {
        invalidateStore({
          resource,
          dataProviderName,
          invalidates
        });
        notificationDispatch({
          type: "REMOVE" /* REMOVE */,
          payload: { id: ids, resource }
        });
      },
      onSuccess: (_data, { ids, resource, successNotification }, context) => {
        ids.forEach(
          (id) => queryClient.removeQueries(context == null ? void 0 : context.queryKey.detail(id))
        );
        const notificationConfig = typeof successNotification === "function" ? successNotification(_data, ids, resource) : successNotification;
        handleNotification(notificationConfig, {
          key: `${ids}-${resource}-notification`,
          description: translate("notifications.success", "Success"),
          message: translate(
            "notifications.deleteSuccess",
            {
              resource: translate(
                `${resource}.${resource}`,
                resource
              )
            },
            `Successfully deleted ${resource}`
          ),
          type: "success"
        });
        publish == null ? void 0 : publish({
          channel: `resources/${resource}`,
          type: "deleted",
          payload: { ids },
          date: new Date()
        });
        ids.forEach(
          (id) => queryClient.removeQueries(context == null ? void 0 : context.queryKey.detail(id))
        );
      },
      onError: (err, { ids, resource, errorNotification }, context) => {
        if (context) {
          for (const query of context.previousQueries) {
            queryClient.setQueryData(query[0], query[1]);
          }
        }
        if (err.message !== "mutationCancelled") {
          checkError(err);
          const resourceSingular = import_pluralize7.default.singular(resource);
          const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, ids, resource) : errorNotification;
          handleNotification(notificationConfig, {
            key: `${ids}-${resource}-notification`,
            message: translate(
              "notifications.deleteError",
              {
                resource: resourceSingular,
                statusCode: err.statusCode
              },
              `Error (status code: ${err.statusCode})`
            ),
            description: err.message,
            type: "error"
          });
        }
      }
    }
  );
  return mutation;
};

// src/hooks/data/useApiUrl.ts
var useApiUrl = (dataProviderName) => {
  const dataProvider = useDataProvider();
  const { getApiUrl } = dataProvider(dataProviderName);
  return getApiUrl();
};

// src/hooks/data/useCustom.ts
var import_react_query17 = require("react-query");
var useCustom = ({
  url,
  method,
  config,
  queryOptions,
  successNotification,
  errorNotification,
  metaData,
  dataProviderName
}) => {
  const dataProvider = useDataProvider();
  const { custom } = dataProvider(dataProviderName);
  const { mutate: checkError } = useCheckError();
  const translate = useTranslate();
  const handleNotification = useHandleNotification();
  if (custom) {
    const queryResponse = (0, import_react_query17.useQuery)(
      [
        dataProviderName,
        "custom",
        method,
        url,
        { ...config, ...metaData }
      ],
      () => custom({ url, method, ...config, metaData }),
      {
        ...queryOptions,
        onSuccess: (data) => {
          var _a;
          (_a = queryOptions == null ? void 0 : queryOptions.onSuccess) == null ? void 0 : _a.call(queryOptions, data);
          const notificationConfig = typeof successNotification === "function" ? successNotification(data, {
            ...config,
            ...metaData
          }) : successNotification;
          handleNotification(notificationConfig);
        },
        onError: (err) => {
          var _a;
          checkError(err);
          (_a = queryOptions == null ? void 0 : queryOptions.onError) == null ? void 0 : _a.call(queryOptions, err);
          const notificationConfig = typeof errorNotification === "function" ? errorNotification(err, { ...config, ...metaData }) : errorNotification;
          handleNotification(notificationConfig, {
            key: `${method}-notification`,
            message: translate(
              "common:notifications.error",
              { statusCode: err.statusCode },
              `Error (status code: ${err.statusCode})`
            ),
            description: err.message,
            type: "error"
          });
        }
      }
    );
    return queryResponse;
  } else {
    throw Error("Not implemented custom on data provider.");
  }
};

// src/hooks/data/useCustomMutation.ts
var import_react_query18 = require("react-query");
var useCustomMutation = () => {
  const handleNotification = useHandleNotification();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const mutation = (0, import_react_query18.useMutation)(
    ({
      url,
      method,
      values,
      metaData,
      dataProviderName,
      config
    }) => {
      const { custom } = dataProvider(dataProviderName);
      if (custom) {
        return custom({
          url,
          method,
          payload: values,
          metaData,
          headers: { ...config == null ? void 0 : config.headers }
        });
      }
      throw Error("Not implemented custom on data provider.");
    },
    {
      onSuccess: (data, {
        successNotification: successNotificationFromProp,
        config,
        metaData
      }) => {
        const notificationConfig = typeof successNotificationFromProp === "function" ? successNotificationFromProp(data, {
          ...config,
          ...metaData
        }) : successNotificationFromProp;
        handleNotification(notificationConfig);
      },
      onError: (err, {
        errorNotification: errorNotificationFromProp,
        method,
        config,
        metaData
      }) => {
        const notificationConfig = typeof errorNotificationFromProp === "function" ? errorNotificationFromProp(err, {
          ...config,
          ...metaData
        }) : errorNotificationFromProp;
        handleNotification(notificationConfig, {
          key: `${method}-notification`,
          message: translate(
            "common:notifications.error",
            { statusCode: err.statusCode },
            `Error (status code: ${err.statusCode})`
          ),
          description: err.message,
          type: "error"
        });
      }
    }
  );
  return mutation;
};

// src/hooks/data/useDataProvider.tsx
var import_react11 = require("react");

// src/contexts/data/index.tsx
var import_react10 = __toESM(require("react"));
var defaultDataProvider = () => {
  return {
    default: {
      create: () => Promise.resolve({ data: { id: 1 } }),
      createMany: () => Promise.resolve({ data: [] }),
      deleteOne: () => Promise.resolve({ data: { id: 1 } }),
      deleteMany: () => Promise.resolve({ data: [] }),
      getList: () => Promise.resolve({ data: [], total: 0 }),
      getMany: () => Promise.resolve({ data: [] }),
      getOne: () => Promise.resolve({ data: { id: 1 } }),
      update: () => Promise.resolve({ data: { id: 1 } }),
      updateMany: () => Promise.resolve({ data: [] }),
      custom: () => Promise.resolve({ data: {} }),
      getApiUrl: () => ""
    }
  };
};
var DataContext = import_react10.default.createContext(
  defaultDataProvider()
);
var DataContextProvider = ({ children, ...rest }) => {
  let dataProviders;
  if (!rest.hasOwnProperty("updateMany") || !rest.hasOwnProperty("createMany")) {
    dataProviders = rest;
  } else {
    dataProviders = {
      default: rest
    };
  }
  return /* @__PURE__ */ import_react10.default.createElement(DataContext.Provider, {
    value: dataProviders
  }, children);
};

// src/hooks/data/useDataProvider.tsx
var useDataProvider = () => {
  const context = (0, import_react11.useContext)(DataContext);
  const handleDataProvider = (0, import_react11.useCallback)(
    (dataProviderName) => {
      if (dataProviderName) {
        const dataProvider = context[dataProviderName];
        if (!dataProvider) {
          throw new Error(
            `"${dataProviderName}" Data provider not found`
          );
        }
        return context[dataProviderName];
      }
      if (context.default) {
        return context.default;
      } else
        throw new Error(
          `There is no "default" data provider. Please pass dataProviderName.`
        );
    },
    [context]
  );
  return handleDataProvider;
};

// src/hooks/live/useResourceSubscription/index.ts
var import_react15 = require("react");
var import_react_query19 = require("react-query");

// src/contexts/live/index.tsx
var import_react12 = __toESM(require("react"));
var LiveContext = import_react12.default.createContext(void 0);
var LiveContextProvider = ({
  liveProvider,
  children
}) => {
  return /* @__PURE__ */ import_react12.default.createElement(LiveContext.Provider, {
    value: liveProvider
  }, children);
};

// src/contexts/refine/index.tsx
var import_react14 = __toESM(require("react"));

// src/components/layoutWrapper/defaultLayout/index.tsx
var import_react13 = __toESM(require("react"));
var DefaultLayout = ({ children }) => {
  return /* @__PURE__ */ import_react13.default.createElement("div", null, children);
};

// src/contexts/refine/index.tsx
var RefineContext = import_react14.default.createContext({
  hasDashboard: false,
  mutationMode: "pessimistic",
  warnWhenUnsavedChanges: false,
  syncWithLocation: false,
  undoableTimeout: 5e3,
  Title: void 0,
  Sider: void 0,
  Header: void 0,
  Footer: void 0,
  Layout: DefaultLayout,
  OffLayoutArea: void 0,
  liveMode: "off",
  onLiveEvent: void 0
});
var RefineContextProvider = ({
  hasDashboard,
  mutationMode,
  warnWhenUnsavedChanges,
  syncWithLocation,
  undoableTimeout,
  children,
  DashboardPage,
  Title,
  Layout = DefaultLayout,
  Header,
  Sider,
  Footer,
  OffLayoutArea,
  LoginPage: LoginPage2 = LoginPage,
  catchAll,
  liveMode = "off",
  onLiveEvent
}) => {
  return /* @__PURE__ */ import_react14.default.createElement(RefineContext.Provider, {
    value: {
      hasDashboard,
      mutationMode,
      warnWhenUnsavedChanges,
      syncWithLocation,
      Title,
      undoableTimeout,
      Layout,
      Header,
      Sider,
      Footer,
      OffLayoutArea,
      DashboardPage,
      LoginPage: LoginPage2,
      catchAll,
      liveMode,
      onLiveEvent
    }
  }, children);
};

// src/hooks/live/useResourceSubscription/index.ts
var useResourceSubscription = ({
  resource,
  params,
  channel,
  types,
  enabled = true,
  liveMode: liveModeFromProp,
  onLiveEvent
}) => {
  const queryClient = (0, import_react_query19.useQueryClient)();
  const queryKey = queryKeys(resource);
  const liveDataContext = (0, import_react15.useContext)(LiveContext);
  const {
    liveMode: liveModeFromContext,
    onLiveEvent: onLiveEventContextCallback
  } = (0, import_react15.useContext)(RefineContext);
  const liveMode = liveModeFromProp != null ? liveModeFromProp : liveModeFromContext;
  (0, import_react15.useEffect)(() => {
    let subscription;
    if (liveMode && liveMode !== "off" && enabled) {
      subscription = liveDataContext == null ? void 0 : liveDataContext.subscribe({
        channel,
        params: {
          resource,
          ...params
        },
        types,
        callback: (event) => {
          if (liveMode === "auto") {
            queryClient.invalidateQueries(queryKey.resourceAll);
          }
          onLiveEvent == null ? void 0 : onLiveEvent(event);
          onLiveEventContextCallback == null ? void 0 : onLiveEventContextCallback(event);
        }
      });
    }
    return () => {
      if (subscription) {
        liveDataContext == null ? void 0 : liveDataContext.unsubscribe(subscription);
      }
    };
  }, [enabled]);
};

// src/hooks/live/useLiveMode/index.ts
var import_react16 = require("react");
var useLiveMode = (liveMode) => {
  const { liveMode: liveModeFromContext } = (0, import_react16.useContext)(RefineContext);
  return liveMode != null ? liveMode : liveModeFromContext;
};

// src/hooks/live/useSubscription/index.ts
var import_react17 = require("react");
var useSubscription = ({
  params,
  channel,
  types = ["*"],
  enabled = true,
  onLiveEvent
}) => {
  const liveDataContext = (0, import_react17.useContext)(LiveContext);
  (0, import_react17.useEffect)(() => {
    let subscription;
    if (enabled) {
      subscription = liveDataContext == null ? void 0 : liveDataContext.subscribe({
        channel,
        params,
        types,
        callback: onLiveEvent
      });
    }
    return () => {
      if (subscription) {
        liveDataContext == null ? void 0 : liveDataContext.unsubscribe(subscription);
      }
    };
  }, [enabled]);
};

// src/hooks/live/usePublish/index.ts
var import_react18 = require("react");
var usePublish = () => {
  const liveContext = (0, import_react18.useContext)(LiveContext);
  return liveContext == null ? void 0 : liveContext.publish;
};

// src/hooks/resource/useResource/index.ts
var import_react20 = require("react");

// src/contexts/resource/index.tsx
var import_react19 = __toESM(require("react"));
var ResourceContext = import_react19.default.createContext({
  resources: []
});
var ResourceContextProvider = ({ resources, children }) => {
  return /* @__PURE__ */ import_react19.default.createElement(ResourceContext.Provider, {
    value: { resources }
  }, children);
};

// src/hooks/resource/useResource/index.ts
var useResource = ({
  resourceName: propResourceName,
  resourceNameOrRouteName,
  recordItemId
} = {}) => {
  const { resources } = (0, import_react20.useContext)(ResourceContext);
  const resourceWithRoute = useResourceWithRoute();
  const { useParams } = useRouterContext();
  const params = useParams();
  const resource = resourceWithRoute(
    resourceNameOrRouteName != null ? resourceNameOrRouteName : params.resource
  );
  const resourceName = propResourceName != null ? propResourceName : resource.name;
  const id = recordItemId != null ? recordItemId : params.id;
  return { resources, resource, resourceName, id };
};

// src/hooks/resource/useResourceWithRoute/index.ts
var import_react21 = require("react");
var useResourceWithRoute = () => {
  const { resources } = (0, import_react21.useContext)(ResourceContext);
  const resourceWithRoute = (0, import_react21.useCallback)(
    (route) => {
      const resource = resources.find((p) => p.route === route);
      if (!resource) {
        const resourceWithName = resources.find(
          (p) => p.name === route
        );
        return resourceWithName != null ? resourceWithName : { name: route, route };
      }
      return resource;
    },
    [resources]
  );
  return resourceWithRoute;
};

// src/hooks/notification/useCancelNotification/index.tsx
var import_react22 = require("react");
var useCancelNotification = () => {
  const { notifications, notificationDispatch } = (0, import_react22.useContext)(UndoableQueueContext);
  return { notifications, notificationDispatch };
};

// src/hooks/notification/useNotification/index.ts
var import_react24 = require("react");

// src/contexts/notification/index.tsx
var import_react23 = __toESM(require("react"));
var NotificationContext = (0, import_react23.createContext)({});
var NotificationContextProvider = ({ open, close, children }) => {
  return /* @__PURE__ */ import_react23.default.createElement(NotificationContext.Provider, {
    value: { open, close }
  }, children);
};

// src/hooks/notification/useNotification/index.ts
var useNotification = () => {
  const { open, close } = (0, import_react24.useContext)(NotificationContext);
  return { open, close };
};

// src/hooks/notification/useHandleNotification/index.ts
var import_react25 = require("react");
var useHandleNotification = () => {
  const { open } = useNotification();
  const handleNotification = (0, import_react25.useCallback)(
    (notification, fallbackNotification) => {
      if (notification !== false) {
        if (notification) {
          open == null ? void 0 : open(notification);
        } else if (fallbackNotification) {
          open == null ? void 0 : open(fallbackNotification);
        }
      }
    },
    []
  );
  return handleNotification;
};

// src/hooks/translate/useSetLocale.ts
var import_react27 = require("react");

// src/contexts/translation/index.tsx
var import_react26 = __toESM(require("react"));
var TranslationContext = import_react26.default.createContext({});
var TranslationContextProvider = ({ children, i18nProvider }) => {
  return /* @__PURE__ */ import_react26.default.createElement(TranslationContext.Provider, {
    value: {
      i18nProvider
    }
  }, children);
};

// src/hooks/translate/useSetLocale.ts
var useSetLocale = () => {
  const { i18nProvider } = (0, import_react27.useContext)(TranslationContext);
  return (0, import_react27.useCallback)((lang) => i18nProvider == null ? void 0 : i18nProvider.changeLocale(lang), []);
};

// src/hooks/translate/useTranslate.ts
var import_react28 = require("react");
var useTranslate = () => {
  const { i18nProvider } = (0, import_react28.useContext)(TranslationContext);
  const fn = (0, import_react28.useMemo)(() => {
    function translate(key, options, defaultMessage) {
      var _a, _b;
      return (_b = (_a = i18nProvider == null ? void 0 : i18nProvider.translate(key, options, defaultMessage)) != null ? _a : defaultMessage) != null ? _b : typeof options === "string" && typeof defaultMessage === "undefined" ? options : key;
    }
    return translate;
  }, [i18nProvider]);
  return fn;
};

// src/hooks/translate/useGetLocale.ts
var import_react29 = require("react");
var useGetLocale = () => {
  const { i18nProvider } = (0, import_react29.useContext)(TranslationContext);
  return (0, import_react29.useCallback)(() => i18nProvider == null ? void 0 : i18nProvider.getLocale(), []);
};

// src/hooks/refine/useMutationMode.ts
var import_react30 = require("react");
var useMutationMode = () => {
  const { mutationMode, undoableTimeout } = (0, import_react30.useContext)(RefineContext);
  return { mutationMode, undoableTimeout };
};

// src/hooks/refine/useWarnAboutChange/index.ts
var import_react32 = require("react");

// src/contexts/unsavedWarn/index.tsx
var import_react31 = __toESM(require("react"));
var UnsavedWarnContext = import_react31.default.createContext({});
var UnsavedWarnContextProvider = ({
  children
}) => {
  const [warnWhen, setWarnWhen] = (0, import_react31.useState)(false);
  return /* @__PURE__ */ import_react31.default.createElement(UnsavedWarnContext.Provider, {
    value: { warnWhen, setWarnWhen }
  }, children);
};

// src/hooks/refine/useWarnAboutChange/index.ts
var useWarnAboutChange = () => {
  const { warnWhenUnsavedChanges } = (0, import_react32.useContext)(RefineContext);
  const { warnWhen, setWarnWhen } = (0, import_react32.useContext)(UnsavedWarnContext);
  return {
    warnWhenUnsavedChanges,
    warnWhen: Boolean(warnWhen),
    setWarnWhen: setWarnWhen != null ? setWarnWhen : () => void 0
  };
};

// src/hooks/refine/useSyncWithLocation.ts
var import_react33 = require("react");
var useSyncWithLocation = () => {
  const { syncWithLocation } = (0, import_react33.useContext)(RefineContext);
  return { syncWithLocation };
};

// src/hooks/refine/useTitle.tsx
var import_react34 = require("react");
var useTitle = () => {
  const { Title } = (0, import_react34.useContext)(RefineContext);
  return Title;
};

// src/hooks/refine/useRefineContex.ts
var import_react35 = require("react");
var useRefineContext = () => {
  const {
    Footer,
    Header,
    Layout,
    OffLayoutArea,
    Sider,
    Title,
    hasDashboard,
    mutationMode,
    syncWithLocation,
    undoableTimeout,
    warnWhenUnsavedChanges,
    DashboardPage,
    LoginPage: LoginPage2,
    catchAll
  } = (0, import_react35.useContext)(RefineContext);
  return {
    Footer,
    Header,
    Layout,
    OffLayoutArea,
    Sider,
    Title,
    hasDashboard,
    mutationMode,
    syncWithLocation,
    undoableTimeout,
    warnWhenUnsavedChanges,
    DashboardPage,
    LoginPage: LoginPage2,
    catchAll
  };
};

// src/hooks/export/index.ts
var import_react36 = require("react");
var import_export_to_csv_fix_source_map = require("export-to-csv-fix-source-map");
var useExport = ({
  resourceName,
  sorter,
  filters,
  maxItemCount,
  pageSize = 20,
  mapData = (item) => item,
  exportOptions,
  metaData,
  dataProviderName,
  onError
} = {}) => {
  const [isLoading, setIsLoading] = (0, import_react36.useState)(false);
  const resourceWithRoute = useResourceWithRoute();
  const dataProvider = useDataProvider();
  const { useParams } = useRouterContext();
  const { resource: routeResourceName } = useParams();
  let { name: resource } = resourceWithRoute(routeResourceName);
  if (resourceName) {
    resource = resourceName;
  }
  const filename = `${userFriendlyResourceName(
    resource,
    "plural"
  )}-${new Date().toLocaleString()}`;
  const { getList } = dataProvider(dataProviderName);
  const triggerExport = async () => {
    setIsLoading(true);
    let rawData = [];
    let current = 1;
    let preparingData = true;
    while (preparingData) {
      try {
        const { data, total } = await getList({
          resource,
          filters,
          sort: sorter,
          pagination: {
            current,
            pageSize
          },
          metaData
        });
        current++;
        rawData.push(...data);
        if (maxItemCount && rawData.length >= maxItemCount) {
          rawData = rawData.slice(0, maxItemCount);
          preparingData = false;
        }
        if (total === rawData.length) {
          preparingData = false;
        }
      } catch (error) {
        setIsLoading(false);
        preparingData = false;
        onError == null ? void 0 : onError(error);
        return;
      }
    }
    const csvExporter = new import_export_to_csv_fix_source_map.ExportToCsv({
      filename,
      useKeysAsHeaders: true,
      ...exportOptions
    });
    csvExporter.generateCsv(rawData.map(mapData));
    setIsLoading(false);
  };
  return {
    isLoading,
    triggerExport
  };
};

// src/hooks/form/useForm.ts
var import_react37 = __toESM(require("react"));
var useForm = ({
  action: actionFromProps,
  resource: resourceFromProps,
  id: idFromProps,
  onMutationSuccess,
  onMutationError,
  redirect: redirectFromProps,
  successNotification,
  errorNotification,
  metaData,
  mutationMode: mutationModeProp,
  liveMode,
  onLiveEvent,
  liveParams,
  undoableTimeout,
  dataProviderName,
  invalidates,
  queryOptions
} = {}) => {
  var _a;
  const { useParams } = useRouterContext();
  const {
    resource: resourceFromRoute,
    action: actionFromRoute,
    id: idFromParams
  } = useParams();
  const defaultId = !resourceFromProps || resourceFromProps === resourceFromRoute ? idFromProps != null ? idFromProps : idFromParams : idFromProps;
  const [id, setId] = import_react37.default.useState(defaultId);
  const resourceName = resourceFromProps != null ? resourceFromProps : resourceFromRoute;
  const action = (_a = actionFromProps != null ? actionFromProps : actionFromRoute) != null ? _a : "create";
  const resourceWithRoute = useResourceWithRoute();
  const resource = resourceWithRoute(resourceName);
  const { mutationMode: mutationModeContext } = useMutationMode();
  const mutationMode = mutationModeProp != null ? mutationModeProp : mutationModeContext;
  const isCreate = action === "create";
  const isEdit = action === "edit";
  const isClone = action === "clone";
  const redirect = redirectFromProps != null ? redirectFromProps : "list";
  const enableQuery = id !== void 0 && (isEdit || isClone);
  const queryResult = useOne({
    resource: resource.name,
    id: id != null ? id : "",
    queryOptions: {
      enabled: enableQuery,
      ...queryOptions
    },
    liveMode,
    onLiveEvent,
    liveParams,
    metaData,
    dataProviderName
  });
  const { isFetching: isFetchingQuery } = queryResult;
  const mutationResultCreate = useCreate();
  const { mutate: mutateCreate, isLoading: isLoadingCreate } = mutationResultCreate;
  const mutationResultUpdate = useUpdate();
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = mutationResultUpdate;
  const { setWarnWhen } = useWarnAboutChange();
  const handleSubmitWithRedirect = useRedirectionAfterSubmission();
  const onFinishCreate = async (values) => {
    setWarnWhen(false);
    const onSuccess = (id2) => {
      handleSubmitWithRedirect({
        redirect,
        resource,
        id: id2
      });
    };
    if (mutationMode !== "pessimistic") {
      setTimeout(() => {
        onSuccess();
      });
    }
    return new Promise((resolve, reject) => {
      if (mutationMode !== "pessimistic") {
        resolve();
      }
      return mutateCreate(
        {
          values,
          resource: resource.name,
          successNotification,
          errorNotification,
          metaData,
          dataProviderName,
          invalidates
        },
        {
          onSuccess: (data, _, context) => {
            var _a2;
            if (onMutationSuccess) {
              onMutationSuccess(data, values, context);
            }
            const responseId = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.id;
            onSuccess(responseId);
            resolve(data);
          },
          onError: (error, _, context) => {
            if (onMutationError) {
              return onMutationError(error, values, context);
            }
            reject();
          }
        }
      );
    });
  };
  const onFinishUpdate = async (values) => {
    setWarnWhen(false);
    const variables = {
      id: id != null ? id : "",
      values,
      resource: resource.name,
      mutationMode,
      undoableTimeout,
      successNotification,
      errorNotification,
      metaData,
      dataProviderName,
      invalidates
    };
    const onSuccess = () => {
      setId(defaultId);
      handleSubmitWithRedirect({
        redirect,
        resource,
        id
      });
    };
    if (mutationMode !== "pessimistic") {
      setTimeout(() => {
        onSuccess();
      });
    }
    return new Promise((resolve, reject) => {
      if (mutationMode !== "pessimistic") {
        resolve();
      }
      return setTimeout(() => {
        mutateUpdate(variables, {
          onSuccess: (data, _, context) => {
            if (onMutationSuccess) {
              onMutationSuccess(data, values, context);
            }
            if (mutationMode === "pessimistic") {
              onSuccess();
            }
            resolve(data);
          },
          onError: (error, _, context) => {
            if (onMutationError) {
              return onMutationError(error, values, context);
            }
            reject();
          }
        });
      });
    });
  };
  const createResult = {
    formLoading: isFetchingQuery || isLoadingCreate,
    mutationResult: mutationResultCreate,
    onFinish: onFinishCreate
  };
  const editResult = {
    formLoading: isFetchingQuery || isLoadingUpdate,
    mutationResult: mutationResultUpdate,
    onFinish: onFinishUpdate
  };
  const result = isCreate || isClone ? createResult : editResult;
  return {
    ...result,
    queryResult,
    id,
    setId,
    redirect: (redirect2, idFromFunction) => {
      handleSubmitWithRedirect({
        redirect: redirect2 !== void 0 ? redirect2 : isEdit ? "list" : "edit",
        resource,
        id: idFromFunction != null ? idFromFunction : id
      });
    }
  };
};

// src/hooks/redirection/index.ts
var import_react38 = require("react");
var useRedirectionAfterSubmission = () => {
  const { show, edit, list, create } = useNavigation();
  const handleSubmitWithRedirect = (0, import_react38.useCallback)(
    ({
      redirect,
      resource,
      id
    }) => {
      if (redirect && resource.route) {
        if (resource.canShow && redirect === "show" && id) {
          return show(resource.route, id);
        }
        if (resource.canEdit && redirect === "edit" && id) {
          return edit(resource.route, id);
        }
        if (resource.canCreate && redirect === "create") {
          return create(resource.route);
        }
        return list(resource.route, "push");
      } else {
        return;
      }
    },
    []
  );
  return handleSubmitWithRedirect;
};

// src/hooks/navigation/index.ts
var useNavigation = () => {
  const { useHistory } = useRouterContext();
  const history = useHistory();
  const resourceWithRoute = useResourceWithRoute();
  const handleUrl = (url, type = "push") => {
    type === "push" ? history.push(url) : history.replace(url);
  };
  const createUrl = (resource) => {
    const resourceName = resourceWithRoute(resource);
    return `/${resourceName.route}/create`;
  };
  const editUrl = (resource, id) => {
    const resourceName = resourceWithRoute(resource);
    const encodedId = encodeURIComponent(id);
    return `/${resourceName.route}/edit/${encodedId}`;
  };
  const cloneUrl = (resource, id) => {
    const resourceName = resourceWithRoute(resource);
    const encodedId = encodeURIComponent(id);
    return `/${resourceName.route}/clone/${encodedId}`;
  };
  const showUrl = (resource, id) => {
    const resourceName = resourceWithRoute(resource);
    const encodedId = encodeURIComponent(id);
    return `/${resourceName.route}/show/${encodedId}`;
  };
  const listUrl = (resource) => {
    const resourceName = resourceWithRoute(resource);
    return `/${resourceName.route}`;
  };
  const create = (resource, type = "push") => {
    handleUrl(createUrl(resource), type);
  };
  const edit = (resource, id, type = "push") => {
    handleUrl(editUrl(resource, id), type);
  };
  const clone = (resource, id, type = "push") => {
    handleUrl(cloneUrl(resource, id), type);
  };
  const show = (resource, id, type = "push") => {
    handleUrl(showUrl(resource, id), type);
  };
  const list = (resource, type = "push") => {
    handleUrl(listUrl(resource), type);
  };
  const push = (path, state) => {
    history.push(path, state);
  };
  const replace = (path, state) => {
    history.replace(path, state);
  };
  const goBack = () => {
    history.goBack();
  };
  return {
    create,
    createUrl,
    edit,
    editUrl,
    clone,
    cloneUrl,
    show,
    showUrl,
    list,
    listUrl,
    push,
    replace,
    goBack
  };
};

// src/hooks/show/useShow.ts
var import_react39 = require("react");
var useShow = ({
  resource: resourceFromProp,
  id,
  successNotification,
  errorNotification,
  metaData,
  liveMode,
  onLiveEvent,
  dataProviderName
} = {}) => {
  const { useParams } = useRouterContext();
  const { resource: routeResourceName, id: idFromRoute } = useParams();
  const defaultId = !resourceFromProp || resourceFromProp === routeResourceName ? id != null ? id : idFromRoute : id;
  const [showId, setShowId] = (0, import_react39.useState)(defaultId);
  const resourceWithRoute = useResourceWithRoute();
  const resource = resourceWithRoute(resourceFromProp != null ? resourceFromProp : routeResourceName);
  const queryResult = useOne({
    resource: resource.name,
    id: showId != null ? showId : "",
    queryOptions: {
      enabled: showId !== void 0
    },
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    dataProviderName
  });
  return {
    queryResult,
    showId,
    setShowId
  };
};

// src/hooks/import/index.tsx
var import_react40 = require("react");
var import_papaparse = require("papaparse");
var import_chunk = __toESM(require("lodash/chunk"));
var useImport = ({
  resourceName,
  mapData = (item) => item,
  paparseOptions,
  batchSize = Number.MAX_SAFE_INTEGER,
  onFinish,
  metaData,
  onProgress
} = {}) => {
  const [processedAmount, setProcessedAmount] = (0, import_react40.useState)(0);
  const [totalAmount, setTotalAmount] = (0, import_react40.useState)(0);
  const [isLoading, setIsLoading] = (0, import_react40.useState)(false);
  const resourceWithRoute = useResourceWithRoute();
  const { useParams } = useRouterContext();
  const { resource: routeResourceName } = useParams();
  const { name: resource } = resourceWithRoute(
    resourceName != null ? resourceName : routeResourceName
  );
  const createMany = useCreateMany();
  const create = useCreate();
  let mutationResult;
  if (batchSize === 1) {
    mutationResult = create;
  } else {
    mutationResult = createMany;
  }
  const handleCleanup = () => {
    setTotalAmount(0);
    setProcessedAmount(0);
    setIsLoading(false);
  };
  const handleFinish = (createdValues) => {
    const result = {
      succeeded: createdValues.filter(
        (item) => item.type === "success"
      ),
      errored: createdValues.filter(
        (item) => item.type === "error"
      )
    };
    onFinish == null ? void 0 : onFinish(result);
    setIsLoading(false);
  };
  (0, import_react40.useEffect)(() => {
    onProgress == null ? void 0 : onProgress({ totalAmount, processedAmount });
  }, [totalAmount, processedAmount]);
  const handleChange = ({ file }) => {
    handleCleanup();
    return new Promise(
      (resolve) => {
        setIsLoading(true);
        (0, import_papaparse.parse)(file, {
          complete: async ({ data }) => {
            const values = importCSVMapper(data, mapData);
            setTotalAmount(values.length);
            if (batchSize === 1) {
              const createdValues = await Promise.all(
                values.map((value) => {
                  const response = create.mutateAsync({
                    resource,
                    values: value,
                    successNotification: false,
                    errorNotification: false,
                    metaData
                  });
                  return { response, value };
                }).map(
                  ({ response, value }) => response.then(({ data: data2 }) => {
                    setProcessedAmount(
                      (currentAmount) => {
                        return currentAmount + 1;
                      }
                    );
                    return {
                      response: [data2],
                      type: "success",
                      request: [value]
                    };
                  }).catch(
                    (error) => ({
                      response: [error],
                      type: "error",
                      request: [value]
                    })
                  )
                )
              );
              resolve(createdValues);
            } else {
              const createdValues = await Promise.all(
                (0, import_chunk.default)(values, batchSize).map((batch) => {
                  return {
                    response: createMany.mutateAsync({
                      resource,
                      values: batch,
                      successNotification: false,
                      errorNotification: false,
                      metaData
                    }),
                    currentBatchLength: batch.length,
                    value: batch
                  };
                }).map(
                  ({
                    response,
                    value,
                    currentBatchLength
                  }) => response.then((response2) => {
                    setProcessedAmount(
                      (currentAmount) => {
                        return currentAmount + currentBatchLength;
                      }
                    );
                    return {
                      response: response2.data,
                      type: "success",
                      request: value
                    };
                  }).catch(
                    (error) => ({
                      response: [error],
                      type: "error",
                      request: value
                    })
                  )
                )
              );
              resolve(createdValues);
            }
          },
          ...paparseOptions
        });
      }
    ).then((createdValues) => {
      handleFinish(createdValues);
      return createdValues;
    });
  };
  return {
    inputProps: {
      type: "file",
      accept: ".csv",
      onChange: (event) => {
        if (event.target.files && event.target.files.length > 0) {
          handleChange({ file: event.target.files[0] });
        }
      }
    },
    mutationResult,
    isLoading,
    handleChange
  };
};

// src/hooks/modal/useModal/index.tsx
var import_react41 = require("react");
var useModal = ({
  defaultVisible = false
} = {}) => {
  const [visible, setVisible] = (0, import_react41.useState)(defaultVisible);
  const show = (0, import_react41.useCallback)(() => setVisible(true), [visible]);
  const close = (0, import_react41.useCallback)(() => setVisible(false), [visible]);
  return {
    visible,
    show,
    close
  };
};

// src/hooks/router/useRouterContext.ts
var import_react43 = require("react");

// src/contexts/router/index.tsx
var import_react42 = __toESM(require("react"));
var defaultProvider = {
  useHistory: () => false,
  useLocation: () => false,
  useParams: () => ({}),
  Prompt: () => null,
  Link: () => null
};
var RouterContext = import_react42.default.createContext(defaultProvider);
var RouterContextProvider = ({
  children,
  useHistory,
  useLocation,
  useParams,
  Prompt,
  Link,
  routes
}) => {
  return /* @__PURE__ */ import_react42.default.createElement(RouterContext.Provider, {
    value: {
      useHistory,
      useLocation,
      useParams,
      Prompt,
      Link,
      routes
    }
  }, children);
};

// src/hooks/router/useRouterContext.ts
var useRouterContext = () => {
  const { useHistory, useLocation, useParams, Prompt, Link, routes } = (0, import_react43.useContext)(RouterContext);
  return {
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
    routes
  };
};

// src/hooks/accessControl/useCan/index.ts
var import_react45 = require("react");
var import_react_query20 = require("react-query");

// src/contexts/accessControl/index.tsx
var import_react44 = __toESM(require("react"));
var AccessControlContext = import_react44.default.createContext(
  {}
);
var AccessControlContextProvider = ({ can, children }) => {
  return /* @__PURE__ */ import_react44.default.createElement(AccessControlContext.Provider, {
    value: { can }
  }, children);
};

// src/hooks/accessControl/useCan/index.ts
var useCan = ({
  action,
  resource,
  params,
  queryOptions
}) => {
  const { can } = (0, import_react45.useContext)(AccessControlContext);
  const queryResponse = (0, import_react_query20.useQuery)(
    ["useCan", { action, resource, params }],
    () => {
      var _a;
      return (_a = can == null ? void 0 : can({ action, resource, params })) != null ? _a : { can: true };
    },
    {
      enabled: typeof can !== "undefined",
      ...queryOptions,
      retry: false
    }
  );
  return typeof can === "undefined" ? { data: { can: true } } : queryResponse;
};

// src/hooks/accessControl/useCanWithoutCache.ts
var import_react46 = require("react");
var useCanWithoutCache = () => {
  const { can } = (0, import_react46.useContext)(AccessControlContext);
  return { can };
};

// src/hooks/useSelect/index.ts
var import_react47 = require("react");
var import_uniqBy = __toESM(require("lodash/uniqBy"));
var import_debounce = __toESM(require("lodash/debounce"));
var useSelect = (props) => {
  const [search, setSearch] = (0, import_react47.useState)([]);
  const [options, setOptions] = (0, import_react47.useState)([]);
  const [selectedOptions, setSelectedOptions] = (0, import_react47.useState)([]);
  const {
    resource,
    sort,
    filters = [],
    optionLabel = "title",
    optionValue = "id",
    debounce: debounceValue = 300,
    successNotification,
    errorNotification,
    defaultValueQueryOptions: defaultValueQueryOptionsFromProps,
    queryOptions,
    fetchSize,
    liveMode,
    defaultValue = [],
    onLiveEvent,
    onSearch: onSearchFromProp,
    liveParams,
    metaData,
    dataProviderName
  } = props;
  const defaultValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  const defaultValueQueryOnSuccess = (data) => {
    setSelectedOptions(
      data.data.map((item) => ({
        label: item[optionLabel],
        value: item[optionValue]
      }))
    );
  };
  const defaultValueQueryOptions = defaultValueQueryOptionsFromProps != null ? defaultValueQueryOptionsFromProps : queryOptions;
  const defaultValueQueryResult = useMany({
    resource,
    ids: defaultValues,
    queryOptions: {
      enabled: defaultValues.length > 0,
      ...defaultValueQueryOptions,
      onSuccess: (data) => {
        var _a;
        defaultValueQueryOnSuccess(data);
        (_a = defaultValueQueryOptions == null ? void 0 : defaultValueQueryOptions.onSuccess) == null ? void 0 : _a.call(defaultValueQueryOptions, data);
      }
    },
    metaData,
    liveMode: "off",
    dataProviderName
  });
  const defaultQueryOnSuccess = (data) => {
    setOptions(
      data.data.map((item) => ({
        label: item[optionLabel],
        value: item[optionValue]
      }))
    );
  };
  const queryResult = useList({
    resource,
    config: {
      sort,
      filters: filters.concat(search),
      pagination: fetchSize ? {
        pageSize: fetchSize
      } : void 0
    },
    queryOptions: {
      ...queryOptions,
      onSuccess: (data) => {
        var _a;
        defaultQueryOnSuccess(data);
        (_a = queryOptions == null ? void 0 : queryOptions.onSuccess) == null ? void 0 : _a.call(queryOptions, data);
      }
    },
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    liveParams,
    onLiveEvent,
    dataProviderName
  });
  const onSearch = (value) => {
    if (!value) {
      setSearch([]);
      return;
    }
    if (onSearchFromProp) {
      setSearch(onSearchFromProp(value));
    } else {
      setSearch([
        {
          field: optionLabel,
          operator: "contains",
          value
        }
      ]);
    }
  };
  return {
    queryResult,
    defaultValueQueryResult,
    options: (0, import_react47.useMemo)(
      () => (0, import_uniqBy.default)([...options, ...selectedOptions], "value"),
      [options, selectedOptions]
    ),
    onSearch: (0, import_debounce.default)(onSearch, debounceValue)
  };
};

// src/hooks/useTable/index.ts
var import_react48 = require("react");
var import_differenceWith2 = __toESM(require("lodash/differenceWith"));
var import_isEqual = __toESM(require("lodash/isEqual"));
var defaultPermanentFilter = [];
var defaultPermanentSorter = [];
function useTable({
  initialCurrent = 1,
  initialPageSize = 10,
  hasPagination = true,
  initialSorter,
  permanentSorter = defaultPermanentSorter,
  defaultSetFilterBehavior = "merge",
  initialFilter,
  permanentFilter = defaultPermanentFilter,
  syncWithLocation: syncWithLocationProp,
  resource: resourceFromProp,
  successNotification,
  errorNotification,
  queryOptions,
  liveMode: liveModeFromProp,
  onLiveEvent,
  liveParams,
  metaData,
  dataProviderName
} = {}) {
  var _a;
  const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();
  const syncWithLocation = syncWithLocationProp != null ? syncWithLocationProp : syncWithLocationContext;
  const { useLocation, useParams } = useRouterContext();
  const { search, pathname } = useLocation();
  const liveMode = useLiveMode(liveModeFromProp);
  const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } = parseTableParams(search);
  const defaultCurrent = parsedCurrent || initialCurrent;
  const defaultPageSize = parsedPageSize || initialPageSize;
  const defaultSorter = parsedSorter.length ? parsedSorter : initialSorter;
  const defaultFilter = parsedFilters.length ? parsedFilters : initialFilter;
  const { resource: routeResourceName } = useParams();
  const { push } = useNavigation();
  const resourceWithRoute = useResourceWithRoute();
  const resource = resourceWithRoute(resourceFromProp != null ? resourceFromProp : routeResourceName);
  const [sorter, setSorter] = (0, import_react48.useState)(
    setInitialSorters(permanentSorter, defaultSorter != null ? defaultSorter : [])
  );
  const [filters, setFilters] = (0, import_react48.useState)(
    setInitialFilters(permanentFilter, defaultFilter != null ? defaultFilter : [])
  );
  const [current, setCurrent] = (0, import_react48.useState)(defaultCurrent);
  const [pageSize, setPageSize] = (0, import_react48.useState)(defaultPageSize);
  const createLinkForSyncWithLocation = ({
    pagination: { current: current2, pageSize: pageSize2 },
    sorter: sorter2,
    filters: filters2
  }) => {
    const stringifyParams = stringifyTableParams({
      pagination: {
        pageSize: pageSize2,
        current: current2
      },
      sorter: sorter2,
      filters: filters2
    });
    return `${pathname}?${stringifyParams}`;
  };
  (0, import_react48.useEffect)(() => {
    if (search === "") {
      setCurrent(defaultCurrent);
      setPageSize(defaultPageSize);
      setSorter(setInitialSorters(permanentSorter, defaultSorter != null ? defaultSorter : []));
      setFilters(setInitialFilters(permanentFilter, defaultFilter != null ? defaultFilter : []));
    }
  }, [search]);
  (0, import_react48.useEffect)(() => {
    if (syncWithLocation) {
      const stringifyParams = stringifyTableParams({
        ...hasPagination ? {
          pagination: {
            pageSize,
            current
          }
        } : {},
        sorter: (0, import_differenceWith2.default)(sorter, permanentSorter, import_isEqual.default),
        filters: (0, import_differenceWith2.default)(filters, permanentFilter, import_isEqual.default)
      });
      return push(`${pathname}?${stringifyParams}`);
    }
  }, [syncWithLocation, current, pageSize, sorter, filters]);
  const queryResult = useList({
    resource: resource.name,
    config: {
      hasPagination,
      pagination: { current, pageSize },
      filters: unionFilters(permanentFilter, filters),
      sort: unionSorters(permanentSorter, sorter)
    },
    queryOptions,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    liveParams,
    onLiveEvent,
    dataProviderName
  });
  const setFiltersAsMerge = (newFilters) => {
    setFilters(
      (prevFilters) => unionFilters(permanentFilter, newFilters, prevFilters)
    );
  };
  const setFiltersAsReplace = (newFilters) => {
    setFilters(unionFilters(permanentFilter, newFilters));
  };
  const setFiltersWithSetter = (setter) => {
    setFilters((prev) => unionFilters(permanentFilter, setter(prev)));
  };
  const setFiltersFn = (setterOrFilters, behavior = defaultSetFilterBehavior) => {
    if (typeof setterOrFilters === "function") {
      setFiltersWithSetter(setterOrFilters);
    } else {
      if (behavior === "replace") {
        setFiltersAsReplace(setterOrFilters);
      } else {
        setFiltersAsMerge(setterOrFilters);
      }
    }
  };
  const setSortWithUnion = (newSorter) => {
    setSorter(() => unionSorters(permanentSorter, newSorter));
  };
  const paginationValues = (0, import_react48.useMemo)(() => {
    var _a2, _b;
    if (hasPagination) {
      return {
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount: pageSize ? Math.ceil(((_b = (_a2 = queryResult.data) == null ? void 0 : _a2.total) != null ? _b : 0) / pageSize) : 1
      };
    }
    return {
      current: void 0,
      setCurrent: void 0,
      pageSize: void 0,
      setPageSize: void 0,
      pageCount: void 0
    };
  }, [hasPagination, current, pageSize, (_a = queryResult.data) == null ? void 0 : _a.total]);
  return {
    tableQueryResult: queryResult,
    sorter,
    setSorter: setSortWithUnion,
    filters,
    setFilters: setFiltersFn,
    ...paginationValues,
    createLinkForSyncWithLocation
  };
}

// src/hooks/auditLog/useLog/index.ts
var import_react50 = require("react");
var import_react_query21 = require("react-query");

// src/contexts/auditLog/index.tsx
var import_react49 = __toESM(require("react"));
var AuditLogContext = import_react49.default.createContext({});
var AuditLogContextProvider = ({ create, get, update, children }) => {
  return /* @__PURE__ */ import_react49.default.createElement(AuditLogContext.Provider, {
    value: { create, get, update }
  }, children);
};

// src/hooks/auditLog/useLog/index.ts
var useLog = () => {
  const queryClient = (0, import_react_query21.useQueryClient)();
  const auditLogContext = (0, import_react50.useContext)(AuditLogContext);
  const { resources } = (0, import_react50.useContext)(ResourceContext);
  const {
    data: identityData,
    refetch,
    isLoading
  } = useGetIdentity({
    queryOptions: {
      enabled: !!auditLogContext
    }
  });
  const log = (0, import_react_query21.useMutation)(
    async (params) => {
      var _a, _b, _c;
      const resource = resources.find((p) => p.name === params.resource);
      const logPermissions = (_b = (_a = resource == null ? void 0 : resource.options) == null ? void 0 : _a.auditLog) == null ? void 0 : _b.permissions;
      if (logPermissions) {
        if (!hasPermission(logPermissions, params.action)) {
          return;
        }
      }
      let authorData;
      if (isLoading) {
        authorData = await refetch();
      }
      return await ((_c = auditLogContext.create) == null ? void 0 : _c.call(auditLogContext, {
        ...params,
        author: identityData != null ? identityData : authorData == null ? void 0 : authorData.data
      }));
    }
  );
  const rename = (0, import_react_query21.useMutation)(
    async (params) => {
      var _a;
      return await ((_a = auditLogContext.update) == null ? void 0 : _a.call(auditLogContext, params));
    },
    {
      onSuccess: (data) => {
        if (data == null ? void 0 : data.resource) {
          const queryKey = queryKeys(data == null ? void 0 : data.resource);
          queryClient.invalidateQueries(queryKey.logList());
        }
      }
    }
  );
  return { log, rename };
};

// src/hooks/auditLog/useLogList/index.ts
var import_react51 = require("react");
var import_react_query22 = require("react-query");
var useLogList = ({
  resource,
  action,
  meta,
  author,
  metaData,
  queryOptions
}) => {
  const { get } = (0, import_react51.useContext)(AuditLogContext);
  const queryKey = queryKeys(resource, void 0, metaData);
  const queryResponse = (0, import_react_query22.useQuery)(
    queryKey.logList(meta),
    () => {
      var _a;
      return (_a = get == null ? void 0 : get({
        resource,
        action,
        author,
        meta,
        metaData
      })) != null ? _a : Promise.resolve([]);
    },
    {
      enabled: typeof get !== "undefined",
      ...queryOptions,
      retry: false
    }
  );
  return queryResponse;
};

// src/hooks/invalidate/index.tsx
var import_react52 = require("react");
var import_react_query23 = require("react-query");
var useInvalidate = () => {
  const queryClient = (0, import_react_query23.useQueryClient)();
  const invalidate = (0, import_react52.useCallback)(
    ({
      resource,
      dataProviderName,
      invalidates,
      id
    }) => {
      if (invalidates === false) {
        return;
      }
      const queryKey = queryKeys(resource, dataProviderName);
      invalidates.forEach((key) => {
        switch (key) {
          case "all":
            queryClient.invalidateQueries(queryKey.all);
            break;
          case "list":
            queryClient.invalidateQueries(queryKey.list());
            break;
          case "many":
            queryClient.invalidateQueries(queryKey.many());
            break;
          case "resourceAll":
            queryClient.invalidateQueries(queryKey.resourceAll);
            break;
          case "detail":
            queryClient.invalidateQueries(
              queryKey.detail(id || "")
            );
            break;
          default:
            break;
        }
      });
    },
    []
  );
  return invalidate;
};

// src/hooks/breadcrumb/index.ts
var import_react53 = require("react");
var import_humanize_string2 = __toESM(require("humanize-string"));
var import_warn_once = __toESM(require("warn-once"));
var useBreadcrumb = () => {
  var _a;
  const { useParams } = useRouterContext();
  const { i18nProvider } = (0, import_react53.useContext)(TranslationContext);
  const translate = useTranslate();
  const { resources, resource } = useResource();
  const { action } = useParams();
  const breadcrumbs = [];
  if (!(resource == null ? void 0 : resource.name)) {
    return { breadcrumbs };
  }
  const addBreadcrumb = (parentName) => {
    var _a2;
    const parentResource = resources.find(
      (resource2) => resource2.name === parentName
    );
    if (parentResource) {
      if (parentResource.parentName) {
        addBreadcrumb(parentResource.parentName);
      }
      breadcrumbs.push({
        label: (_a2 = parentResource.label) != null ? _a2 : translate(
          `${parentResource.name}.${parentResource.name}`,
          (0, import_humanize_string2.default)(parentResource.name)
        ),
        href: !!parentResource.list ? `/${parentResource.route}` : void 0,
        icon: parentResource.icon
      });
    }
  };
  if (resource.parentName) {
    addBreadcrumb(resource.parentName);
  }
  breadcrumbs.push({
    label: (_a = resource.label) != null ? _a : translate(
      `${resource.name}.${resource.name}`,
      (0, import_humanize_string2.default)(resource.name)
    ),
    href: !!resource.list ? `/${resource.route}` : void 0,
    icon: resource.icon
  });
  if (action) {
    const key = `actions.${action}`;
    const actionLabel = translate(key);
    if (typeof i18nProvider !== "undefined" && actionLabel === key) {
      (0, import_warn_once.default)(
        true,
        `[useBreadcrumb]: Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file.
For more information, see https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support`
      );
      breadcrumbs.push({
        label: translate(`buttons.${action}`, (0, import_humanize_string2.default)(action))
      });
    } else {
      breadcrumbs.push({
        label: translate(key, (0, import_humanize_string2.default)(action))
      });
    }
  }
  return {
    breadcrumbs
  };
};

// src/hooks/menu/useMenu.tsx
var import_react54 = __toESM(require("react"));
var useMenu = () => {
  const { resources } = useResource();
  const translate = useTranslate();
  const { useLocation, useParams } = useRouterContext();
  const location = useLocation();
  const params = useParams();
  const { hasDashboard } = useRefineContext();
  const selectedKey = import_react54.default.useMemo(() => {
    let selectedResource = resources.find(
      (el) => (location == null ? void 0 : location.pathname) === `/${el.route}`
    );
    if (!selectedResource) {
      selectedResource = resources.find(
        (el) => (params == null ? void 0 : params.resource) === el.route
      );
    }
    let _selectedKey;
    if (selectedResource == null ? void 0 : selectedResource.route) {
      _selectedKey = `/${selectedResource == null ? void 0 : selectedResource.route}`;
    } else if (location.pathname === "/") {
      _selectedKey = "/";
    } else {
      _selectedKey = location == null ? void 0 : location.pathname;
    }
    return _selectedKey;
  }, [resources, location, params]);
  const treeMenuItems = import_react54.default.useMemo(
    () => resources.map((resource) => {
      var _a, _b;
      const route = `/${resource.route}`;
      return {
        ...resource,
        icon: resource.icon,
        route,
        key: (_a = resource.key) != null ? _a : route,
        label: (_b = resource.label) != null ? _b : translate(
          `${resource.name}.${resource.name}`,
          userFriendlyResourceName(resource.name, "plural")
        )
      };
    }),
    [resources, hasDashboard]
  );
  const menuItems = import_react54.default.useMemo(
    () => createTreeView(treeMenuItems),
    [treeMenuItems]
  );
  const crawlNestedKeys = import_react54.default.useCallback(
    (currentKey, currentResources, isParent = false) => {
      const currentElement = currentResources.find(
        (el) => isParent ? el.name === currentKey : el.route === currentKey
      );
      if (currentElement) {
        const keysArray = [];
        if (isParent && currentElement.route) {
          keysArray.unshift(...[currentElement.route]);
        }
        if (currentElement.parentName) {
          keysArray.unshift(
            ...crawlNestedKeys(
              currentElement.parentName,
              currentResources,
              true
            )
          );
        }
        return keysArray;
      }
      return [];
    },
    []
  );
  const defaultOpenKeys = import_react54.default.useMemo(
    () => crawlNestedKeys(selectedKey, treeMenuItems),
    [selectedKey, treeMenuItems]
  );
  const values = import_react54.default.useMemo(() => {
    const filterMenuItemsByListView = (menus) => {
      return menus.reduce((menuItem, obj) => {
        if (obj.children.length > 0)
          return [
            ...menuItem,
            {
              ...obj,
              children: filterMenuItemsByListView(obj.children)
            }
          ];
        else if (typeof obj.list !== "undefined")
          return [...menuItem, obj];
        return menuItem;
      }, []);
    };
    return {
      defaultOpenKeys,
      selectedKey,
      menuItems: filterMenuItemsByListView(menuItems)
    };
  }, [defaultOpenKeys, selectedKey, menuItems]);
  return values;
};

// src/components/pages/error/index.tsx
var ErrorComponent = () => {
  const [errorMessage, setErrorMessage] = (0, import_react55.useState)();
  const { push } = useNavigation();
  const translate = useTranslate();
  const actionTypes = ["edit", "create", "show"];
  const { useParams } = useRouterContext();
  const params = useParams();
  const resource = useResourceWithRoute();
  (0, import_react55.useEffect)(() => {
    if (params.resource) {
      const resourceFromRoute = resource(params.resource);
      if (params.action && actionTypes.includes(params.action) && !resourceFromRoute[params.action]) {
        setErrorMessage(
          translate(
            "pages.error.info",
            {
              action: params.action,
              resource: params.resource
            },
            `You may have forgotten to add the "${params.action}" component to "${params.resource}" resource.`
          )
        );
      }
    }
  }, [params]);
  return /* @__PURE__ */ import_react55.default.createElement(import_react55.default.Fragment, null, /* @__PURE__ */ import_react55.default.createElement("h1", null, translate(
    "pages.error.404",
    void 0,
    "Sorry, the page you visited does not exist."
  )), errorMessage && /* @__PURE__ */ import_react55.default.createElement("p", null, errorMessage), /* @__PURE__ */ import_react55.default.createElement("button", {
    onClick: () => push("/")
  }, translate("pages.error.backHome", void 0, "Back Home")));
};

// src/components/pages/login/index.tsx
var import_react56 = __toESM(require("react"));
var LoginPage = () => {
  const [username, setUsername] = (0, import_react56.useState)("");
  const [password, setPassword] = (0, import_react56.useState)("");
  const translate = useTranslate();
  const { mutate: login } = useLogin();
  return /* @__PURE__ */ import_react56.default.createElement(import_react56.default.Fragment, null, /* @__PURE__ */ import_react56.default.createElement("h1", null, translate("pages.login.title", "Sign in your account")), /* @__PURE__ */ import_react56.default.createElement("form", {
    onSubmit: (e) => {
      e.preventDefault();
      login({ username, password });
    }
  }, /* @__PURE__ */ import_react56.default.createElement("table", null, /* @__PURE__ */ import_react56.default.createElement("tbody", null, /* @__PURE__ */ import_react56.default.createElement("tr", null, /* @__PURE__ */ import_react56.default.createElement("td", null, translate(
    "pages.login.username",
    void 0,
    "username"
  ), ":"), /* @__PURE__ */ import_react56.default.createElement("td", null, /* @__PURE__ */ import_react56.default.createElement("input", {
    type: "text",
    size: 20,
    autoCorrect: "off",
    spellCheck: false,
    autoCapitalize: "off",
    autoFocus: true,
    required: true,
    value: username,
    onChange: (e) => setUsername(e.target.value)
  }))), /* @__PURE__ */ import_react56.default.createElement("tr", null, /* @__PURE__ */ import_react56.default.createElement("td", null, translate(
    "pages.login.password",
    void 0,
    "password"
  ), ":"), /* @__PURE__ */ import_react56.default.createElement("td", null, /* @__PURE__ */ import_react56.default.createElement("input", {
    type: "password",
    required: true,
    size: 20,
    value: password,
    onChange: (e) => setPassword(e.target.value)
  }))))), /* @__PURE__ */ import_react56.default.createElement("br", null), /* @__PURE__ */ import_react56.default.createElement("input", {
    type: "submit",
    value: "login"
  })));
};

// src/components/pages/ready/index.tsx
var import_react57 = __toESM(require("react"));
var ReadyPage = () => {
  return /* @__PURE__ */ import_react57.default.createElement(import_react57.default.Fragment, null, /* @__PURE__ */ import_react57.default.createElement("h1", null, "Welcome on board"), /* @__PURE__ */ import_react57.default.createElement("p", null, "Your configuration is completed."), /* @__PURE__ */ import_react57.default.createElement("p", null, "Now you can get started by adding your resources to the", " ", /* @__PURE__ */ import_react57.default.createElement("code", null, "`resources`"), " property of ", /* @__PURE__ */ import_react57.default.createElement("code", null, "`<Refine>`")), /* @__PURE__ */ import_react57.default.createElement("div", {
    style: { display: "flex", gap: 8 }
  }, /* @__PURE__ */ import_react57.default.createElement("a", {
    href: "https://refine.dev",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ import_react57.default.createElement("button", null, "Documentation")), /* @__PURE__ */ import_react57.default.createElement("a", {
    href: "https://refine.dev/docs/examples/tutorial",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ import_react57.default.createElement("button", null, "Examples")), /* @__PURE__ */ import_react57.default.createElement("a", {
    href: "https://discord.gg/refine",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ import_react57.default.createElement("button", null, "Community"))));
};

// src/components/containers/refine/index.tsx
var import_react60 = __toESM(require("react"));
var import_react_query24 = require("react-query");

// src/components/telemetry/index.tsx
var import_react59 = require("react");
var import_jose = require("jose");

// src/hooks/useTelemetryData/index.ts
var import_react58 = require("react");
var REFINE_VERSION = "3.54.1";
var useTelemetryData = () => {
  const authContext = (0, import_react58.useContext)(AuthContext);
  const auditLogContext = (0, import_react58.useContext)(AuditLogContext);
  const liveContext = (0, import_react58.useContext)(LiveContext);
  const routerContext = (0, import_react58.useContext)(RouterContext);
  const dataContext = (0, import_react58.useContext)(DataContext);
  const { i18nProvider } = (0, import_react58.useContext)(TranslationContext);
  const notificationContext = (0, import_react58.useContext)(NotificationContext);
  const accessControlContext = (0, import_react58.useContext)(AccessControlContext);
  const { resources } = useResource();
  const auth = authContext.isProvided;
  const auditLog = !!auditLogContext.create || !!auditLogContext.get || !!auditLogContext.update;
  const live = !!(liveContext == null ? void 0 : liveContext.publish) || !!(liveContext == null ? void 0 : liveContext.subscribe) || !!(liveContext == null ? void 0 : liveContext.unsubscribe);
  const router = !!routerContext.useHistory || !!routerContext.Link || !!routerContext.Prompt || !!routerContext.useLocation || !!routerContext.useParams;
  const data = !!dataContext;
  const i18n = !!(i18nProvider == null ? void 0 : i18nProvider.changeLocale) || !!(i18nProvider == null ? void 0 : i18nProvider.getLocale) || !!(i18nProvider == null ? void 0 : i18nProvider.translate);
  const notification = !!notificationContext.close || !!notificationContext.open;
  const accessControl = !!accessControlContext.can;
  return {
    providers: {
      auth,
      auditLog,
      live,
      router,
      data,
      i18n,
      notification,
      accessControl
    },
    version: REFINE_VERSION,
    resourceCount: resources.length
  };
};

// src/components/telemetry/index.tsx
var PUBLIC_KEY = {
  kty: "RSA",
  e: "AQAB",
  use: "enc",
  alg: "RSA-OAEP-256",
  n: "glC_mSwk1VqaofnOPXK3HEC5njb4uHZM5_shFdQLRn_898dxVUMK7HkyOgoVOtEsNxDBjwK_KPbSEYX_lyfrJ6ONjnxPJ2_d0W_1ZwdwT_gr5ofFLz5Bm7WbVHcKDK1j5iMYsqUJbFVQ-KXzAswae2iiqzCBKLD4y-fLsIvOUGZliERMMi54hRPqVj6p0xhJEvH22jZ5rk48KJBNvjBBuLes1qk5cehirDHnh07A8Alr3Pe6Qk7xpyC_mUvMqX99JvYThyvjQMMPEXHLJY9m1g-sgHJPlMkxMoLUd5JI1v6QMLezhq2F-bNXiRgXJgT0ew3g-H_PKpWmMQmSRtgiEw"
};
var Telemetry = () => {
  const payload = useTelemetryData();
  (0, import_react59.useEffect)(() => {
    if (typeof window === "undefined") {
      return;
    }
    (async () => {
      const jwk = await (0, import_jose.importJWK)(PUBLIC_KEY);
      const encryptedPayload = await new import_jose.CompactEncrypt(
        new TextEncoder().encode(JSON.stringify(payload))
      ).setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" }).encrypt(jwk);
      fetch("https://telemetry.refine.dev/send", {
        headers: {
          Accept: "application/text",
          "Content-Type": "application/text"
        },
        method: "POST",
        body: encryptedPayload
      });
    })();
  }, []);
  return null;
};

// src/components/containers/refine/index.tsx
var Refine = ({
  authProvider,
  dataProvider,
  routerProvider,
  notificationProvider,
  accessControlProvider,
  auditLogProvider,
  resources: resourcesFromProps,
  DashboardPage,
  ReadyPage: ReadyPage2,
  LoginPage: LoginPage2,
  catchAll,
  children,
  liveProvider,
  i18nProvider,
  mutationMode = "pessimistic",
  syncWithLocation = false,
  warnWhenUnsavedChanges = false,
  undoableTimeout = 5e3,
  Title,
  Layout,
  Sider,
  Header,
  Footer,
  OffLayoutArea,
  reactQueryClientConfig,
  reactQueryDevtoolConfig,
  liveMode,
  onLiveEvent,
  disableTelemetry = false
}) => {
  var _a;
  const queryClient = new import_react_query24.QueryClient({
    ...reactQueryClientConfig,
    defaultOptions: {
      ...reactQueryClientConfig == null ? void 0 : reactQueryClientConfig.defaultOptions,
      queries: {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        ...(_a = reactQueryClientConfig == null ? void 0 : reactQueryClientConfig.defaultOptions) == null ? void 0 : _a.queries
      }
    }
  });
  const notificationProviderContextValues = typeof notificationProvider === "function" ? notificationProvider() : notificationProvider != null ? notificationProvider : {};
  const resources = [];
  resourcesFromProps == null ? void 0 : resourcesFromProps.map((resource) => {
    var _a2, _b, _c;
    resources.push({
      key: resource.key,
      name: resource.name,
      label: (_a2 = resource.options) == null ? void 0 : _a2.label,
      icon: resource.icon,
      route: (_c = (_b = resource.options) == null ? void 0 : _b.route) != null ? _c : routeGenerator(resource, resourcesFromProps),
      canCreate: !!resource.create,
      canEdit: !!resource.edit,
      canShow: !!resource.show,
      canDelete: resource.canDelete,
      create: resource.create,
      show: resource.show,
      list: resource.list,
      edit: resource.edit,
      options: resource.options,
      parentName: resource.parentName
    });
  });
  if (resources.length === 0) {
    return ReadyPage2 ? /* @__PURE__ */ import_react60.default.createElement(ReadyPage2, null) : /* @__PURE__ */ import_react60.default.createElement(ReadyPage, null);
  }
  const { RouterComponent = import_react60.default.Fragment } = routerProvider;
  return /* @__PURE__ */ import_react60.default.createElement(import_react_query24.QueryClientProvider, {
    client: queryClient
  }, /* @__PURE__ */ import_react60.default.createElement(NotificationContextProvider, {
    ...notificationProviderContextValues
  }, /* @__PURE__ */ import_react60.default.createElement(AuthContextProvider, {
    ...authProvider != null ? authProvider : {},
    isProvided: Boolean(authProvider)
  }, /* @__PURE__ */ import_react60.default.createElement(DataContextProvider, {
    ...dataProvider
  }, /* @__PURE__ */ import_react60.default.createElement(LiveContextProvider, {
    liveProvider
  }, /* @__PURE__ */ import_react60.default.createElement(RouterContextProvider, {
    ...routerProvider
  }, /* @__PURE__ */ import_react60.default.createElement(ResourceContextProvider, {
    resources
  }, /* @__PURE__ */ import_react60.default.createElement(TranslationContextProvider, {
    i18nProvider
  }, /* @__PURE__ */ import_react60.default.createElement(AccessControlContextProvider, {
    ...accessControlProvider != null ? accessControlProvider : {}
  }, /* @__PURE__ */ import_react60.default.createElement(AuditLogContextProvider, {
    ...auditLogProvider != null ? auditLogProvider : {}
  }, /* @__PURE__ */ import_react60.default.createElement(UndoableQueueContextProvider, null, /* @__PURE__ */ import_react60.default.createElement(RefineContextProvider, {
    mutationMode,
    warnWhenUnsavedChanges,
    syncWithLocation,
    Title,
    undoableTimeout,
    catchAll,
    DashboardPage,
    LoginPage: LoginPage2,
    Layout,
    Sider,
    Footer,
    Header,
    OffLayoutArea,
    hasDashboard: !!DashboardPage,
    liveMode,
    onLiveEvent
  }, /* @__PURE__ */ import_react60.default.createElement(UnsavedWarnContextProvider, null, /* @__PURE__ */ import_react60.default.createElement(RouterComponent, null, children, !disableTelemetry && /* @__PURE__ */ import_react60.default.createElement(Telemetry, null), /* @__PURE__ */ import_react60.default.createElement(RouteChangeHandler, null)))))))))))))));
};

// src/components/undoableQueue/index.tsx
var import_react61 = require("react");
var UndoableQueue = ({ notifications }) => {
  const translate = useTranslate();
  const { notificationDispatch } = useCancelNotification();
  const { open } = useNotification();
  const cancelNotification = () => {
    notifications.forEach((notificationItem) => {
      if (notificationItem.isRunning === true) {
        if (notificationItem.seconds === 0) {
          notificationItem.doMutation();
        }
        if (!notificationItem.isSilent) {
          open == null ? void 0 : open({
            key: `${notificationItem.id}-${notificationItem.resource}-notification`,
            type: "progress",
            message: translate(
              "notifications.undoable",
              {
                seconds: userFriendlySecond(
                  notificationItem.seconds
                )
              },
              `You have ${userFriendlySecond(
                notificationItem.seconds
              )} seconds to undo`
            ),
            cancelMutation: notificationItem.cancelMutation,
            undoableTimeout: userFriendlySecond(
              notificationItem.seconds
            )
          });
        }
        if (notificationItem.seconds > 0) {
          setTimeout(() => {
            notificationDispatch({
              type: "DECREASE_NOTIFICATION_SECOND" /* DECREASE_NOTIFICATION_SECOND */,
              payload: {
                id: notificationItem.id,
                seconds: notificationItem.seconds,
                resource: notificationItem.resource
              }
            });
          }, 1e3);
        }
      }
    });
  };
  (0, import_react61.useEffect)(() => {
    cancelNotification();
  }, [notifications]);
  return null;
};

// src/components/layoutWrapper/index.tsx
var import_react62 = __toESM(require("react"));
var LayoutWrapper = ({
  children,
  Layout: LayoutFromProps,
  Sider: SiderFromProps,
  Header: HeaderFromProps,
  Title: TitleFromProps,
  Footer: FooterFromProps,
  OffLayoutArea: OffLayoutAreaFromProps
}) => {
  const { Layout, Footer, Header, Sider, Title, OffLayoutArea } = useRefineContext();
  const LayoutToRender = LayoutFromProps != null ? LayoutFromProps : Layout;
  return /* @__PURE__ */ import_react62.default.createElement(LayoutToRender, {
    Sider: SiderFromProps != null ? SiderFromProps : Sider,
    Header: HeaderFromProps != null ? HeaderFromProps : Header,
    Footer: FooterFromProps != null ? FooterFromProps : Footer,
    Title: TitleFromProps != null ? TitleFromProps : Title,
    OffLayoutArea: OffLayoutAreaFromProps != null ? OffLayoutAreaFromProps : OffLayoutArea
  }, children, /* @__PURE__ */ import_react62.default.createElement(UnsavedPrompt, null));
};
var UnsavedPrompt = () => {
  const { Prompt } = useRouterContext();
  const translate = useTranslate();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const warnWhenListener = (e) => {
    e.preventDefault();
    e.returnValue = translate(
      "warnWhenUnsavedChanges",
      "Are you sure you want to leave? You have unsaved changes."
    );
    return e.returnValue;
  };
  (0, import_react62.useEffect)(() => {
    if (warnWhen) {
      window.addEventListener("beforeunload", warnWhenListener);
    }
    return window.removeEventListener("beforeunload", warnWhenListener);
  }, [warnWhen]);
  return /* @__PURE__ */ import_react62.default.createElement(Prompt, {
    when: warnWhen,
    message: translate(
      "warnWhenUnsavedChanges",
      "Are you sure you want to leave? You have unsaved changes."
    ),
    setWarnWhen
  });
};

// src/components/authenticated/index.tsx
var import_react63 = __toESM(require("react"));
var Authenticated = ({
  children,
  fallback,
  loading
}) => {
  const { isSuccess, isLoading, isError } = useAuthenticated();
  const { replace } = useNavigation();
  const { useLocation } = useRouterContext();
  const { pathname, search } = useLocation();
  if (isLoading) {
    return /* @__PURE__ */ import_react63.default.createElement(import_react63.default.Fragment, null, loading) || null;
  }
  if (isError) {
    if (!fallback) {
      const toURL = `${pathname}${search}`;
      if (!pathname.includes("/login")) {
        replace(`/login?to=${encodeURIComponent(toURL)}`);
      }
      return null;
    }
    return /* @__PURE__ */ import_react63.default.createElement(import_react63.default.Fragment, null, fallback);
  }
  if (isSuccess) {
    return /* @__PURE__ */ import_react63.default.createElement(import_react63.default.Fragment, null, children);
  }
  return null;
};

// src/components/routeChangeHandler/index.tsx
var import_react64 = require("react");
var RouteChangeHandler = () => {
  const { useLocation } = useRouterContext();
  const { checkAuth } = (0, import_react64.useContext)(AuthContext);
  const location = useLocation();
  (0, import_react64.useEffect)(() => {
    checkAuth == null ? void 0 : checkAuth().catch(() => false);
  }, [location == null ? void 0 : location.pathname]);
  return null;
};

// src/components/canAccess/index.tsx
var import_react65 = __toESM(require("react"));
var CanAccess = ({
  resource,
  action,
  params,
  fallback,
  children,
  ...rest
}) => {
  const { data } = useCan({
    resource,
    action,
    params
  });
  if (data == null ? void 0 : data.can) {
    if (import_react65.default.isValidElement(children)) {
      const Children = import_react65.default.cloneElement(children, rest);
      return Children;
    }
    return /* @__PURE__ */ import_react65.default.createElement(import_react65.default.Fragment, null, children);
  }
  if ((data == null ? void 0 : data.can) === false) {
    return /* @__PURE__ */ import_react65.default.createElement(import_react65.default.Fragment, null, fallback != null ? fallback : null);
  }
  return null;
};
//# sourceMappingURL=index.js.map