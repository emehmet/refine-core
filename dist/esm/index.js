// src/components/pages/error/index.tsx
import React22, { useEffect as useEffect6, useState as useState9 } from "react";

// src/hooks/auth/usePermissions/index.ts
import { useContext } from "react";

// src/contexts/auth/index.tsx
import React from "react";
import { useQueryClient } from "react-query";
var AuthContext = React.createContext({});
var AuthContextProvider = ({ children, isProvided, ...authOperations }) => {
  const { replace } = useNavigation();
  const queryClient = useQueryClient();
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
  return /* @__PURE__ */ React.createElement(AuthContext.Provider, {
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
import { useQuery } from "react-query";
var usePermissions = (options) => {
  const { getPermissions } = useContext(AuthContext);
  const queryResponse = useQuery(
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
import React2 from "react";
import { useQuery as useQuery2 } from "react-query";
var useGetIdentity = ({
  queryOptions
} = {}) => {
  const { getUserIdentity } = React2.useContext(AuthContext);
  const queryResponse = useQuery2(
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
import React3 from "react";
import { useMutation } from "react-query";
var useLogout = () => {
  const { push } = useNavigation();
  const { logout: logoutFromContext } = React3.useContext(AuthContext);
  const { open } = useNotification();
  const queryResponse = useMutation(
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
import React4 from "react";
import { useMutation as useMutation2 } from "react-query";
import qs from "qs";
var useLogin = () => {
  const { replace } = useNavigation();
  const { login: loginFromContext } = React4.useContext(AuthContext);
  const { useLocation } = useRouterContext();
  const { search } = useLocation();
  const { close, open } = useNotification();
  const { to } = qs.parse(search == null ? void 0 : search.substring(1));
  const queryResponse = useMutation2(
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
import { useContext as useContext2 } from "react";
import { useQuery as useQuery3 } from "react-query";
var useAuthenticated = (params) => {
  const { checkAuth } = useContext2(AuthContext);
  const queryResponse = useQuery3(
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
import React5 from "react";
import { useMutation as useMutation3 } from "react-query";
var useCheckError = () => {
  const { checkError: checkErrorFromContext } = React5.useContext(AuthContext);
  const { mutate: logout } = useLogout();
  const queryResponse = useMutation3("useCheckError", checkErrorFromContext, {
    onError: (redirectPath) => {
      logout({ redirectPath });
    }
  });
  return queryResponse;
};

// src/hooks/auth/useIsExistAuthentication.ts
import { useContext as useContext3 } from "react";
var useIsExistAuthentication = () => {
  const { isProvided } = useContext3(AuthContext);
  return isProvided || false;
};

// src/hooks/data/useList.ts
import { useQuery as useQuery4 } from "react-query";

// src/definitions/helpers/userFriendlySeconds/index.ts
var userFriendlySecond = (miliseconds) => {
  return miliseconds / 1e3;
};

// src/definitions/helpers/importCSVMapper/index.ts
import zip from "lodash/zip";
import fromPairs from "lodash/fromPairs";
var importCSVMapper = (data, mapData = (item) => item) => {
  const [headers, ...body] = data;
  return body.map((entry) => fromPairs(zip(headers, entry))).map(
    (item, index, array) => mapData.call(void 0, item, index, array)
  );
};

// src/definitions/helpers/userFriendlyResourceName/index.ts
import humanizeString from "humanize-string";
import pluralize from "pluralize";
var userFriendlyResourceName = (resource = "", type) => {
  const humanizeResource = humanizeString(resource);
  if (type === "singular") {
    return pluralize.singular(humanizeResource);
  }
  return pluralize.plural(humanizeResource);
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
  const queryResponse = useQuery4(
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
import { useQuery as useQuery5 } from "react-query";

// src/definitions/table/index.ts
import qs2 from "qs";
import unionWith from "lodash/unionWith";
import differenceWith from "lodash/differenceWith";
var parseTableParams = (url) => {
  const { current, pageSize, sorter, filters } = qs2.parse(
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
  const url = qs2.stringify(params);
  return parseTableParams(`/${url}`);
};
var stringifyTableParams = (params) => {
  const options = {
    skipNulls: true,
    arrayFormat: "indices",
    encode: false
  };
  const { pagination, sorter, filters } = params;
  const queryString = qs2.stringify(
    { ...pagination ? pagination : {}, sorter, filters },
    options
  );
  return queryString;
};
var compareFilters = (left, right) => {
  return ("field" in left ? left.field : void 0) == ("field" in right ? right.field : void 0) && left.operator == right.operator;
};
var compareSorters = (left, right) => left.field == right.field;
var unionFilters = (permanentFilter, newFilters, prevFilters = []) => unionWith(permanentFilter, newFilters, prevFilters, compareFilters).filter(
  (crudFilter) => crudFilter.value !== void 0 && crudFilter.value !== null && (crudFilter.operator !== "or" || crudFilter.operator === "or" && crudFilter.value.length !== 0)
);
var unionSorters = (permanentSorter, newSorters) => unionWith(permanentSorter, newSorters, compareSorters).filter(
  (crudSorter) => crudSorter.order !== void 0 && crudSorter.order !== null
);
var setInitialFilters = (permanentFilter, defaultFilter) => [
  ...differenceWith(defaultFilter, permanentFilter, compareFilters),
  ...permanentFilter
];
var setInitialSorters = (permanentSorter, defaultSorter) => [
  ...differenceWith(defaultSorter, permanentSorter, compareSorters),
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
  const queryResponse = useQuery5(
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
import { useQuery as useQuery6 } from "react-query";
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
  const queryResponse = useQuery6(
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
import { useMutation as useMutation4, useQueryClient as useQueryClient2 } from "react-query";

// src/contexts/undoableQueue/undoableQueueContext.tsx
import React6, { useReducer } from "react";
import { createPortal } from "react-dom";
var UndoableQueueContext = React6.createContext({
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
  const [notifications, notificationDispatch] = useReducer(
    undoableQueueReducer,
    initialState
  );
  const notificationData = { notifications, notificationDispatch };
  return /* @__PURE__ */ React6.createElement(UndoableQueueContext.Provider, {
    value: notificationData
  }, children, typeof window !== "undefined" && createPortal(
    /* @__PURE__ */ React6.createElement(UndoableQueue, {
      notifications
    }),
    document.body
  ));
};

// src/hooks/data/useUpdate.ts
import pluralize2 from "pluralize";
var useUpdate = () => {
  const queryClient = useQueryClient2();
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
  const mutation = useMutation4(
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
        const resourceSingular = pluralize2.singular(resource);
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
          const resourceSingular = pluralize2.singular(resource);
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
import { useMutation as useMutation5 } from "react-query";
import pluralize3 from "pluralize";
var useCreate = () => {
  const { mutate: checkError } = useCheckError();
  const dataProvider = useDataProvider();
  const invalidateStore = useInvalidate();
  const translate = useTranslate();
  const publish = usePublish();
  const { log } = useLog();
  const handleNotification = useHandleNotification();
  const mutation = useMutation5(
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
        const resourceSingular = pluralize3.singular(resource);
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
        const resourceSingular = pluralize3.singular(resource);
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
import { useQueryClient as useQueryClient3, useMutation as useMutation6 } from "react-query";
import pluralize4 from "pluralize";
var useDelete = () => {
  const { mutate: checkError } = useCheckError();
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient3();
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
  const mutation = useMutation6(
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
        const resourceSingular = pluralize4.singular(resource != null ? resource : "");
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
          const resourceSingular = pluralize4.singular(resource != null ? resource : "");
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
import { useMutation as useMutation7 } from "react-query";
import pluralize5 from "pluralize";
var useCreateMany = () => {
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const publish = usePublish();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const mutation = useMutation7(
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
        const resourcePlural = pluralize5.plural(resource);
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
import { useMutation as useMutation8, useQueryClient as useQueryClient4 } from "react-query";
import pluralize6 from "pluralize";
var useUpdateMany = () => {
  const queryClient = useQueryClient4();
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
  const mutation = useMutation8(
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
        const resourceSingular = pluralize6.singular(resource);
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
          const resourceSingular = pluralize6.singular(resource);
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
import { useQueryClient as useQueryClient5, useMutation as useMutation9 } from "react-query";
import pluralize7 from "pluralize";
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
  const queryClient = useQueryClient5();
  const mutation = useMutation9(
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
          const resourceSingular = pluralize7.singular(resource);
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
import { useQuery as useQuery7 } from "react-query";
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
    const queryResponse = useQuery7(
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
import { useMutation as useMutation10 } from "react-query";
var useCustomMutation = () => {
  const handleNotification = useHandleNotification();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const mutation = useMutation10(
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
import { useCallback, useContext as useContext4 } from "react";

// src/contexts/data/index.tsx
import React7 from "react";
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
var DataContext = React7.createContext(
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
  return /* @__PURE__ */ React7.createElement(DataContext.Provider, {
    value: dataProviders
  }, children);
};

// src/hooks/data/useDataProvider.tsx
var useDataProvider = () => {
  const context = useContext4(DataContext);
  const handleDataProvider = useCallback(
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
import { useContext as useContext5, useEffect as useEffect2 } from "react";
import { useQueryClient as useQueryClient6 } from "react-query";

// src/contexts/live/index.tsx
import React8 from "react";
var LiveContext = React8.createContext(void 0);
var LiveContextProvider = ({
  liveProvider,
  children
}) => {
  return /* @__PURE__ */ React8.createElement(LiveContext.Provider, {
    value: liveProvider
  }, children);
};

// src/contexts/refine/index.tsx
import React10 from "react";

// src/components/layoutWrapper/defaultLayout/index.tsx
import React9 from "react";
var DefaultLayout = ({ children }) => {
  return /* @__PURE__ */ React9.createElement("div", null, children);
};

// src/contexts/refine/index.tsx
var RefineContext = React10.createContext({
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
  return /* @__PURE__ */ React10.createElement(RefineContext.Provider, {
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
  const queryClient = useQueryClient6();
  const queryKey = queryKeys(resource);
  const liveDataContext = useContext5(LiveContext);
  const {
    liveMode: liveModeFromContext,
    onLiveEvent: onLiveEventContextCallback
  } = useContext5(RefineContext);
  const liveMode = liveModeFromProp != null ? liveModeFromProp : liveModeFromContext;
  useEffect2(() => {
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
import { useContext as useContext6 } from "react";
var useLiveMode = (liveMode) => {
  const { liveMode: liveModeFromContext } = useContext6(RefineContext);
  return liveMode != null ? liveMode : liveModeFromContext;
};

// src/hooks/live/useSubscription/index.ts
import { useContext as useContext7, useEffect as useEffect3 } from "react";
var useSubscription = ({
  params,
  channel,
  types = ["*"],
  enabled = true,
  onLiveEvent
}) => {
  const liveDataContext = useContext7(LiveContext);
  useEffect3(() => {
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
import { useContext as useContext8 } from "react";
var usePublish = () => {
  const liveContext = useContext8(LiveContext);
  return liveContext == null ? void 0 : liveContext.publish;
};

// src/hooks/resource/useResource/index.ts
import { useContext as useContext9 } from "react";

// src/contexts/resource/index.tsx
import React11 from "react";
var ResourceContext = React11.createContext({
  resources: []
});
var ResourceContextProvider = ({ resources, children }) => {
  return /* @__PURE__ */ React11.createElement(ResourceContext.Provider, {
    value: { resources }
  }, children);
};

// src/hooks/resource/useResource/index.ts
var useResource = ({
  resourceName: propResourceName,
  resourceNameOrRouteName,
  recordItemId
} = {}) => {
  const { resources } = useContext9(ResourceContext);
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
import { useContext as useContext10, useCallback as useCallback2 } from "react";
var useResourceWithRoute = () => {
  const { resources } = useContext10(ResourceContext);
  const resourceWithRoute = useCallback2(
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
import { useContext as useContext11 } from "react";
var useCancelNotification = () => {
  const { notifications, notificationDispatch } = useContext11(UndoableQueueContext);
  return { notifications, notificationDispatch };
};

// src/hooks/notification/useNotification/index.ts
import { useContext as useContext12 } from "react";

// src/contexts/notification/index.tsx
import React12, { createContext } from "react";
var NotificationContext = createContext({});
var NotificationContextProvider = ({ open, close, children }) => {
  return /* @__PURE__ */ React12.createElement(NotificationContext.Provider, {
    value: { open, close }
  }, children);
};

// src/hooks/notification/useNotification/index.ts
var useNotification = () => {
  const { open, close } = useContext12(NotificationContext);
  return { open, close };
};

// src/hooks/notification/useHandleNotification/index.ts
import { useCallback as useCallback3 } from "react";
var useHandleNotification = () => {
  const { open } = useNotification();
  const handleNotification = useCallback3(
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
import { useCallback as useCallback4, useContext as useContext13 } from "react";

// src/contexts/translation/index.tsx
import React13 from "react";
var TranslationContext = React13.createContext({});
var TranslationContextProvider = ({ children, i18nProvider }) => {
  return /* @__PURE__ */ React13.createElement(TranslationContext.Provider, {
    value: {
      i18nProvider
    }
  }, children);
};

// src/hooks/translate/useSetLocale.ts
var useSetLocale = () => {
  const { i18nProvider } = useContext13(TranslationContext);
  return useCallback4((lang) => i18nProvider == null ? void 0 : i18nProvider.changeLocale(lang), []);
};

// src/hooks/translate/useTranslate.ts
import { useContext as useContext14, useMemo } from "react";
var useTranslate = () => {
  const { i18nProvider } = useContext14(TranslationContext);
  const fn = useMemo(() => {
    function translate(key, options, defaultMessage) {
      var _a, _b;
      return (_b = (_a = i18nProvider == null ? void 0 : i18nProvider.translate(key, options, defaultMessage)) != null ? _a : defaultMessage) != null ? _b : typeof options === "string" && typeof defaultMessage === "undefined" ? options : key;
    }
    return translate;
  }, [i18nProvider]);
  return fn;
};

// src/hooks/translate/useGetLocale.ts
import { useContext as useContext15, useCallback as useCallback5 } from "react";
var useGetLocale = () => {
  const { i18nProvider } = useContext15(TranslationContext);
  return useCallback5(() => i18nProvider == null ? void 0 : i18nProvider.getLocale(), []);
};

// src/hooks/refine/useMutationMode.ts
import { useContext as useContext16 } from "react";
var useMutationMode = () => {
  const { mutationMode, undoableTimeout } = useContext16(RefineContext);
  return { mutationMode, undoableTimeout };
};

// src/hooks/refine/useWarnAboutChange/index.ts
import { useContext as useContext17 } from "react";

// src/contexts/unsavedWarn/index.tsx
import React14, { useState as useState2 } from "react";
var UnsavedWarnContext = React14.createContext({});
var UnsavedWarnContextProvider = ({
  children
}) => {
  const [warnWhen, setWarnWhen] = useState2(false);
  return /* @__PURE__ */ React14.createElement(UnsavedWarnContext.Provider, {
    value: { warnWhen, setWarnWhen }
  }, children);
};

// src/hooks/refine/useWarnAboutChange/index.ts
var useWarnAboutChange = () => {
  const { warnWhenUnsavedChanges } = useContext17(RefineContext);
  const { warnWhen, setWarnWhen } = useContext17(UnsavedWarnContext);
  return {
    warnWhenUnsavedChanges,
    warnWhen: Boolean(warnWhen),
    setWarnWhen: setWarnWhen != null ? setWarnWhen : () => void 0
  };
};

// src/hooks/refine/useSyncWithLocation.ts
import { useContext as useContext18 } from "react";
var useSyncWithLocation = () => {
  const { syncWithLocation } = useContext18(RefineContext);
  return { syncWithLocation };
};

// src/hooks/refine/useTitle.tsx
import { useContext as useContext19 } from "react";
var useTitle = () => {
  const { Title } = useContext19(RefineContext);
  return Title;
};

// src/hooks/refine/useRefineContex.ts
import { useContext as useContext20 } from "react";
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
  } = useContext20(RefineContext);
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
import { useState as useState3 } from "react";
import { ExportToCsv } from "export-to-csv-fix-source-map";
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
  const [isLoading, setIsLoading] = useState3(false);
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
    const csvExporter = new ExportToCsv({
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
import React15 from "react";
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
  const [id, setId] = React15.useState(defaultId);
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
import { useCallback as useCallback6 } from "react";
var useRedirectionAfterSubmission = () => {
  const { show, edit, list, create } = useNavigation();
  const handleSubmitWithRedirect = useCallback6(
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
import { useState as useState4 } from "react";
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
  const [showId, setShowId] = useState4(defaultId);
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
import { useEffect as useEffect4, useState as useState5 } from "react";
import { parse } from "papaparse";
import chunk from "lodash/chunk";
var useImport = ({
  resourceName,
  mapData = (item) => item,
  paparseOptions,
  batchSize = Number.MAX_SAFE_INTEGER,
  onFinish,
  metaData,
  onProgress
} = {}) => {
  const [processedAmount, setProcessedAmount] = useState5(0);
  const [totalAmount, setTotalAmount] = useState5(0);
  const [isLoading, setIsLoading] = useState5(false);
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
  useEffect4(() => {
    onProgress == null ? void 0 : onProgress({ totalAmount, processedAmount });
  }, [totalAmount, processedAmount]);
  const handleChange = ({ file }) => {
    handleCleanup();
    return new Promise(
      (resolve) => {
        setIsLoading(true);
        parse(file, {
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
                chunk(values, batchSize).map((batch) => {
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
import { useCallback as useCallback7, useState as useState6 } from "react";
var useModal = ({
  defaultVisible = false
} = {}) => {
  const [visible, setVisible] = useState6(defaultVisible);
  const show = useCallback7(() => setVisible(true), [visible]);
  const close = useCallback7(() => setVisible(false), [visible]);
  return {
    visible,
    show,
    close
  };
};

// src/hooks/router/useRouterContext.ts
import { useContext as useContext21 } from "react";

// src/contexts/router/index.tsx
import React17 from "react";
var defaultProvider = {
  useHistory: () => false,
  useLocation: () => false,
  useParams: () => ({}),
  Prompt: () => null,
  Link: () => null
};
var RouterContext = React17.createContext(defaultProvider);
var RouterContextProvider = ({
  children,
  useHistory,
  useLocation,
  useParams,
  Prompt,
  Link,
  routes
}) => {
  return /* @__PURE__ */ React17.createElement(RouterContext.Provider, {
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
  const { useHistory, useLocation, useParams, Prompt, Link, routes } = useContext21(RouterContext);
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
import { useContext as useContext22 } from "react";
import { useQuery as useQuery8 } from "react-query";

// src/contexts/accessControl/index.tsx
import React18 from "react";
var AccessControlContext = React18.createContext(
  {}
);
var AccessControlContextProvider = ({ can, children }) => {
  return /* @__PURE__ */ React18.createElement(AccessControlContext.Provider, {
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
  const { can } = useContext22(AccessControlContext);
  const queryResponse = useQuery8(
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
import { useContext as useContext23 } from "react";
var useCanWithoutCache = () => {
  const { can } = useContext23(AccessControlContext);
  return { can };
};

// src/hooks/useSelect/index.ts
import { useMemo as useMemo2, useState as useState7 } from "react";
import uniqBy from "lodash/uniqBy";
import debounce from "lodash/debounce";
var useSelect = (props) => {
  const [search, setSearch] = useState7([]);
  const [options, setOptions] = useState7([]);
  const [selectedOptions, setSelectedOptions] = useState7([]);
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
    options: useMemo2(
      () => uniqBy([...options, ...selectedOptions], "value"),
      [options, selectedOptions]
    ),
    onSearch: debounce(onSearch, debounceValue)
  };
};

// src/hooks/useTable/index.ts
import { useMemo as useMemo3, useState as useState8, useEffect as useEffect5 } from "react";
import differenceWith2 from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
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
  const [sorter, setSorter] = useState8(
    setInitialSorters(permanentSorter, defaultSorter != null ? defaultSorter : [])
  );
  const [filters, setFilters] = useState8(
    setInitialFilters(permanentFilter, defaultFilter != null ? defaultFilter : [])
  );
  const [current, setCurrent] = useState8(defaultCurrent);
  const [pageSize, setPageSize] = useState8(defaultPageSize);
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
  useEffect5(() => {
    if (search === "") {
      setCurrent(defaultCurrent);
      setPageSize(defaultPageSize);
      setSorter(setInitialSorters(permanentSorter, defaultSorter != null ? defaultSorter : []));
      setFilters(setInitialFilters(permanentFilter, defaultFilter != null ? defaultFilter : []));
    }
  }, [search]);
  useEffect5(() => {
    if (syncWithLocation) {
      const stringifyParams = stringifyTableParams({
        ...hasPagination ? {
          pagination: {
            pageSize,
            current
          }
        } : {},
        sorter: differenceWith2(sorter, permanentSorter, isEqual),
        filters: differenceWith2(filters, permanentFilter, isEqual)
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
  const paginationValues = useMemo3(() => {
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
import { useContext as useContext24 } from "react";
import { useMutation as useMutation11, useQueryClient as useQueryClient7 } from "react-query";

// src/contexts/auditLog/index.tsx
import React19 from "react";
var AuditLogContext = React19.createContext({});
var AuditLogContextProvider = ({ create, get, update, children }) => {
  return /* @__PURE__ */ React19.createElement(AuditLogContext.Provider, {
    value: { create, get, update }
  }, children);
};

// src/hooks/auditLog/useLog/index.ts
var useLog = () => {
  const queryClient = useQueryClient7();
  const auditLogContext = useContext24(AuditLogContext);
  const { resources } = useContext24(ResourceContext);
  const {
    data: identityData,
    refetch,
    isLoading
  } = useGetIdentity({
    queryOptions: {
      enabled: !!auditLogContext
    }
  });
  const log = useMutation11(
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
  const rename = useMutation11(
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
import { useContext as useContext25 } from "react";
import { useQuery as useQuery9 } from "react-query";
var useLogList = ({
  resource,
  action,
  meta,
  author,
  metaData,
  queryOptions
}) => {
  const { get } = useContext25(AuditLogContext);
  const queryKey = queryKeys(resource, void 0, metaData);
  const queryResponse = useQuery9(
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
import { useCallback as useCallback8 } from "react";
import { useQueryClient as useQueryClient8 } from "react-query";
var useInvalidate = () => {
  const queryClient = useQueryClient8();
  const invalidate = useCallback8(
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
import { useContext as useContext26 } from "react";
import humanizeString2 from "humanize-string";
import warnOnce from "warn-once";
var useBreadcrumb = () => {
  var _a;
  const { useParams } = useRouterContext();
  const { i18nProvider } = useContext26(TranslationContext);
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
          humanizeString2(parentResource.name)
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
      humanizeString2(resource.name)
    ),
    href: !!resource.list ? `/${resource.route}` : void 0,
    icon: resource.icon
  });
  if (action) {
    const key = `actions.${action}`;
    const actionLabel = translate(key);
    if (typeof i18nProvider !== "undefined" && actionLabel === key) {
      warnOnce(
        true,
        `[useBreadcrumb]: Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file.
For more information, see https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support`
      );
      breadcrumbs.push({
        label: translate(`buttons.${action}`, humanizeString2(action))
      });
    } else {
      breadcrumbs.push({
        label: translate(key, humanizeString2(action))
      });
    }
  }
  return {
    breadcrumbs
  };
};

// src/hooks/menu/useMenu.tsx
import React21 from "react";
var useMenu = () => {
  const { resources } = useResource();
  const translate = useTranslate();
  const { useLocation, useParams } = useRouterContext();
  const location = useLocation();
  const params = useParams();
  const { hasDashboard } = useRefineContext();
  const selectedKey = React21.useMemo(() => {
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
  const treeMenuItems = React21.useMemo(
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
  const menuItems = React21.useMemo(
    () => createTreeView(treeMenuItems),
    [treeMenuItems]
  );
  const crawlNestedKeys = React21.useCallback(
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
  const defaultOpenKeys = React21.useMemo(
    () => crawlNestedKeys(selectedKey, treeMenuItems),
    [selectedKey, treeMenuItems]
  );
  const values = React21.useMemo(() => {
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
  const [errorMessage, setErrorMessage] = useState9();
  const { push } = useNavigation();
  const translate = useTranslate();
  const actionTypes = ["edit", "create", "show"];
  const { useParams } = useRouterContext();
  const params = useParams();
  const resource = useResourceWithRoute();
  useEffect6(() => {
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
  return /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement("h1", null, translate(
    "pages.error.404",
    void 0,
    "Sorry, the page you visited does not exist."
  )), errorMessage && /* @__PURE__ */ React22.createElement("p", null, errorMessage), /* @__PURE__ */ React22.createElement("button", {
    onClick: () => push("/")
  }, translate("pages.error.backHome", void 0, "Back Home")));
};

// src/components/pages/login/index.tsx
import React23, { useState as useState10 } from "react";
var LoginPage = () => {
  const [username, setUsername] = useState10("");
  const [password, setPassword] = useState10("");
  const translate = useTranslate();
  const { mutate: login } = useLogin();
  return /* @__PURE__ */ React23.createElement(React23.Fragment, null, /* @__PURE__ */ React23.createElement("h1", null, translate("pages.login.title", "Sign in your account")), /* @__PURE__ */ React23.createElement("form", {
    onSubmit: (e) => {
      e.preventDefault();
      login({ username, password });
    }
  }, /* @__PURE__ */ React23.createElement("table", null, /* @__PURE__ */ React23.createElement("tbody", null, /* @__PURE__ */ React23.createElement("tr", null, /* @__PURE__ */ React23.createElement("td", null, translate(
    "pages.login.username",
    void 0,
    "username"
  ), ":"), /* @__PURE__ */ React23.createElement("td", null, /* @__PURE__ */ React23.createElement("input", {
    type: "text",
    size: 20,
    autoCorrect: "off",
    spellCheck: false,
    autoCapitalize: "off",
    autoFocus: true,
    required: true,
    value: username,
    onChange: (e) => setUsername(e.target.value)
  }))), /* @__PURE__ */ React23.createElement("tr", null, /* @__PURE__ */ React23.createElement("td", null, translate(
    "pages.login.password",
    void 0,
    "password"
  ), ":"), /* @__PURE__ */ React23.createElement("td", null, /* @__PURE__ */ React23.createElement("input", {
    type: "password",
    required: true,
    size: 20,
    value: password,
    onChange: (e) => setPassword(e.target.value)
  }))))), /* @__PURE__ */ React23.createElement("br", null), /* @__PURE__ */ React23.createElement("input", {
    type: "submit",
    value: "login"
  })));
};

// src/components/pages/ready/index.tsx
import React24 from "react";
var ReadyPage = () => {
  return /* @__PURE__ */ React24.createElement(React24.Fragment, null, /* @__PURE__ */ React24.createElement("h1", null, "Welcome on board"), /* @__PURE__ */ React24.createElement("p", null, "Your configuration is completed."), /* @__PURE__ */ React24.createElement("p", null, "Now you can get started by adding your resources to the", " ", /* @__PURE__ */ React24.createElement("code", null, "`resources`"), " property of ", /* @__PURE__ */ React24.createElement("code", null, "`<Refine>`")), /* @__PURE__ */ React24.createElement("div", {
    style: { display: "flex", gap: 8 }
  }, /* @__PURE__ */ React24.createElement("a", {
    href: "https://refine.dev",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React24.createElement("button", null, "Documentation")), /* @__PURE__ */ React24.createElement("a", {
    href: "https://refine.dev/docs/examples/tutorial",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React24.createElement("button", null, "Examples")), /* @__PURE__ */ React24.createElement("a", {
    href: "https://discord.gg/refine",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React24.createElement("button", null, "Community"))));
};

// src/components/containers/refine/index.tsx
import React25 from "react";
import {
  QueryClientProvider,
  QueryClient,
  ReactQueryDevtools
} from "react-query";

// src/components/telemetry/index.tsx
import { useEffect as useEffect7 } from "react";
import { CompactEncrypt, importJWK } from "jose";

// src/hooks/useTelemetryData/index.ts
import { useContext as useContext27 } from "react";
var REFINE_VERSION = "3.54.0";
var useTelemetryData = () => {
  const authContext = useContext27(AuthContext);
  const auditLogContext = useContext27(AuditLogContext);
  const liveContext = useContext27(LiveContext);
  const routerContext = useContext27(RouterContext);
  const dataContext = useContext27(DataContext);
  const { i18nProvider } = useContext27(TranslationContext);
  const notificationContext = useContext27(NotificationContext);
  const accessControlContext = useContext27(AccessControlContext);
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
  useEffect7(() => {
    if (typeof window === "undefined") {
      return;
    }
    (async () => {
      const jwk = await importJWK(PUBLIC_KEY);
      const encryptedPayload = await new CompactEncrypt(
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
  const queryClient = new QueryClient({
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
    return ReadyPage2 ? /* @__PURE__ */ React25.createElement(ReadyPage2, null) : /* @__PURE__ */ React25.createElement(ReadyPage, null);
  }
  const { RouterComponent = React25.Fragment } = routerProvider;
  return /* @__PURE__ */ React25.createElement(QueryClientProvider, {
    client: queryClient
  }, /* @__PURE__ */ React25.createElement(NotificationContextProvider, {
    ...notificationProviderContextValues
  }, /* @__PURE__ */ React25.createElement(AuthContextProvider, {
    ...authProvider != null ? authProvider : {},
    isProvided: Boolean(authProvider)
  }, /* @__PURE__ */ React25.createElement(DataContextProvider, {
    ...dataProvider
  }, /* @__PURE__ */ React25.createElement(LiveContextProvider, {
    liveProvider
  }, /* @__PURE__ */ React25.createElement(RouterContextProvider, {
    ...routerProvider
  }, /* @__PURE__ */ React25.createElement(ResourceContextProvider, {
    resources
  }, /* @__PURE__ */ React25.createElement(TranslationContextProvider, {
    i18nProvider
  }, /* @__PURE__ */ React25.createElement(AccessControlContextProvider, {
    ...accessControlProvider != null ? accessControlProvider : {}
  }, /* @__PURE__ */ React25.createElement(AuditLogContextProvider, {
    ...auditLogProvider != null ? auditLogProvider : {}
  }, /* @__PURE__ */ React25.createElement(UndoableQueueContextProvider, null, /* @__PURE__ */ React25.createElement(RefineContextProvider, {
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
  }, /* @__PURE__ */ React25.createElement(UnsavedWarnContextProvider, null, /* @__PURE__ */ React25.createElement(RouterComponent, null, children, !disableTelemetry && /* @__PURE__ */ React25.createElement(Telemetry, null), /* @__PURE__ */ React25.createElement(RouteChangeHandler, null)))))))))))))), /* @__PURE__ */ React25.createElement(ReactQueryDevtools, {
    initialIsOpen: false,
    position: "bottom-right",
    ...reactQueryDevtoolConfig
  }));
};

// src/components/undoableQueue/index.tsx
import { useEffect as useEffect8 } from "react";
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
  useEffect8(() => {
    cancelNotification();
  }, [notifications]);
  return null;
};

// src/components/layoutWrapper/index.tsx
import React27, { useEffect as useEffect9 } from "react";
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
  return /* @__PURE__ */ React27.createElement(LayoutToRender, {
    Sider: SiderFromProps != null ? SiderFromProps : Sider,
    Header: HeaderFromProps != null ? HeaderFromProps : Header,
    Footer: FooterFromProps != null ? FooterFromProps : Footer,
    Title: TitleFromProps != null ? TitleFromProps : Title,
    OffLayoutArea: OffLayoutAreaFromProps != null ? OffLayoutAreaFromProps : OffLayoutArea
  }, children, /* @__PURE__ */ React27.createElement(UnsavedPrompt, null));
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
  useEffect9(() => {
    if (warnWhen) {
      window.addEventListener("beforeunload", warnWhenListener);
    }
    return window.removeEventListener("beforeunload", warnWhenListener);
  }, [warnWhen]);
  return /* @__PURE__ */ React27.createElement(Prompt, {
    when: warnWhen,
    message: translate(
      "warnWhenUnsavedChanges",
      "Are you sure you want to leave? You have unsaved changes."
    ),
    setWarnWhen
  });
};

// src/components/authenticated/index.tsx
import React28 from "react";
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
    return /* @__PURE__ */ React28.createElement(React28.Fragment, null, loading) || null;
  }
  if (isError) {
    if (!fallback) {
      const toURL = `${pathname}${search}`;
      if (!pathname.includes("/login")) {
        replace(`/login?to=${encodeURIComponent(toURL)}`);
      }
      return null;
    }
    return /* @__PURE__ */ React28.createElement(React28.Fragment, null, fallback);
  }
  if (isSuccess) {
    return /* @__PURE__ */ React28.createElement(React28.Fragment, null, children);
  }
  return null;
};

// src/components/routeChangeHandler/index.tsx
import { useContext as useContext28, useEffect as useEffect10 } from "react";
var RouteChangeHandler = () => {
  const { useLocation } = useRouterContext();
  const { checkAuth } = useContext28(AuthContext);
  const location = useLocation();
  useEffect10(() => {
    checkAuth == null ? void 0 : checkAuth().catch(() => false);
  }, [location == null ? void 0 : location.pathname]);
  return null;
};

// src/components/canAccess/index.tsx
import React29 from "react";
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
    if (React29.isValidElement(children)) {
      const Children = React29.cloneElement(children, rest);
      return Children;
    }
    return /* @__PURE__ */ React29.createElement(React29.Fragment, null, children);
  }
  if ((data == null ? void 0 : data.can) === false) {
    return /* @__PURE__ */ React29.createElement(React29.Fragment, null, fallback != null ? fallback : null);
  }
  return null;
};
export {
  Authenticated,
  CanAccess,
  ErrorComponent,
  LayoutWrapper,
  LoginPage,
  ReadyPage,
  Refine,
  RouteChangeHandler,
  UndoableQueue,
  createTreeView,
  file2Base64,
  getDefaultFilter,
  getDefaultSortOrder,
  handleUseParams,
  importCSVMapper,
  parseTableParams,
  parseTableParamsFromQuery,
  routeGenerator,
  setInitialFilters,
  setInitialSorters,
  stringifyTableParams,
  unionFilters,
  unionSorters,
  useApiUrl,
  useAuthenticated,
  useBreadcrumb,
  useCan,
  useCanWithoutCache,
  useCancelNotification,
  useCheckError,
  useCreate,
  useCreateMany,
  useCustom,
  useCustomMutation,
  useDataProvider,
  useDelete,
  useDeleteMany,
  useExport,
  useForm,
  useGetIdentity,
  useGetLocale,
  useHandleNotification,
  useImport,
  useInvalidate,
  useIsExistAuthentication,
  useList,
  useLiveMode,
  useLog,
  useLogList,
  useLogin,
  useLogout,
  useMany,
  useMenu,
  useModal,
  useMutationMode,
  useNavigation,
  useNotification,
  useOne,
  usePermissions,
  usePublish,
  useRedirectionAfterSubmission,
  useRefineContext,
  useResource,
  useResourceSubscription,
  useResourceWithRoute,
  useRouterContext,
  useSelect,
  useSetLocale,
  useShow,
  useSubscription,
  useSyncWithLocation,
  useTable,
  useTitle,
  useTranslate,
  useUpdate,
  useUpdateMany,
  useWarnAboutChange,
  userFriendlyResourceName
};
//# sourceMappingURL=index.js.map