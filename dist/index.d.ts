import * as React$1 from 'react';
import React__default, { ReactNode, Dispatch, SetStateAction } from 'react';
import * as react_query from 'react-query';
import { UseQueryResult, QueryKey, QueryObserverResult, UseQueryOptions, QueryCache, MutationCache, DefaultOptions, UseMutationResult } from 'react-query';
import { Options } from 'export-to-csv-fix-source-map';
import { ParseConfig } from 'papaparse';

/**
 * When the app is navigated to a non-existent route, refine shows a default error page.
 * A custom error component can be used for this error page.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#catchall} for more details.
 */
declare const ErrorComponent: React__default.FC;

interface ILoginForm {
    username: string;
    password: string;
}
/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#loginpage} for more details.
 */
declare const LoginPage: React__default.FC;

/**
 * **refine** shows a default ready page on root route when no `resources` is passed to the `<Refine>` component as a property.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#readypage} for more details.
 */
declare const ReadyPage: React__default.FC;

interface Pagination {
    current?: number;
    pageSize?: number;
}
declare type CrudOperators = "eq" | "ne" | "lt" | "gt" | "lte" | "gte" | "in" | "nin" | "contains" | "ncontains" | "containss" | "ncontainss" | "between" | "nbetween" | "null" | "nnull" | "or";
declare type SortOrder = "desc" | "asc" | null;
declare type LogicalFilter = {
    field: string;
    operator: Exclude<CrudOperators, "or">;
    value: any;
};
declare type ConditionalFilter = {
    operator: "or";
    value: LogicalFilter[];
};
declare type CrudFilter = LogicalFilter | ConditionalFilter;
declare type CrudSort = {
    field: string;
    order: "asc" | "desc";
};
declare type CrudFilters = CrudFilter[];
declare type CrudSorting = CrudSort[];
interface CustomResponse<TData = BaseRecord> {
    data: TData;
}
interface GetListResponse<TData = BaseRecord> {
    data: TData[];
    total: number;
}
interface CreateResponse<TData = BaseRecord> {
    data: TData;
}
interface CreateManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface UpdateResponse<TData = BaseRecord> {
    data: TData;
}
interface UpdateManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface GetOneResponse<TData = BaseRecord> {
    data: TData;
}
interface GetManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface DeleteOneResponse<TData = BaseRecord> {
    data: TData;
}
interface DeleteManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface IDataContextProvider {
    getList: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        pagination?: Pagination;
        hasPagination?: boolean;
        sort?: CrudSorting;
        filters?: CrudFilters;
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetListResponse<TData>>;
    getMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetManyResponse<TData>>;
    getOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<GetOneResponse<TData>>;
    create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<CreateResponse<TData>>;
    createMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        variables: TVariables[];
        metaData?: MetaDataQuery;
    }) => Promise<CreateManyResponse<TData>>;
    update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        id: BaseKey;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateResponse<TData>>;
    updateMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        ids: BaseKey[];
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateManyResponse<TData>>;
    deleteOne: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        id: BaseKey;
        variables?: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<DeleteOneResponse<TData>>;
    deleteMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        ids: BaseKey[];
        variables?: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<DeleteManyResponse<TData>>;
    getApiUrl: () => string;
    custom?: <TData extends BaseRecord = BaseRecord>(params: {
        url: string;
        method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
        sort?: CrudSorting;
        filters?: CrudFilter[];
        payload?: {};
        query?: {};
        headers?: {};
        metaData?: MetaDataQuery;
    }) => Promise<CustomResponse<TData>>;
}
interface IDataMultipleContextProvider {
    default?: IDataContextProvider;
    [key: string]: IDataContextProvider | any;
}

declare type ILiveContext = {
    publish?: (event: LiveEvent) => void;
    subscribe: (options: {
        channel: string;
        params?: {
            ids?: BaseKey[];
            id?: BaseKey;
            metaData?: MetaDataQuery;
            pagination?: Pagination;
            hasPagination?: boolean;
            sort?: CrudSorting;
            filters?: CrudFilters;
            subscriptionType?: "useList" | "useOne" | "useMany";
            resource?: string;
            [key: string]: any;
        };
        types: LiveEvent["type"][];
        callback: (event: LiveEvent) => void;
    }) => any;
    unsubscribe: (subscription: any) => void;
} | undefined;

declare type TLogoutData = void | false | string;
declare type TLoginData = void | false | string;
interface AuthProvider {
    login: (params: any) => Promise<TLoginData>;
    logout: (params: any) => Promise<TLogoutData>;
    checkAuth: (params?: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params?: any) => Promise<any>;
    getUserIdentity?: () => Promise<any>;
}
interface IAuthContext extends Partial<AuthProvider> {
    isProvided?: boolean;
}

interface IRefineContext {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    catchAll?: React__default.ReactNode;
    DashboardPage?: React__default.FC;
    LoginPage?: React__default.FC | false;
    Title?: React__default.FC<TitleProps>;
    Layout: React__default.FC<LayoutProps>;
    Sider?: React__default.FC;
    Header?: React__default.FC;
    Footer?: React__default.FC;
    OffLayoutArea?: React__default.FC;
    liveMode?: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
}

declare type Translate = (key: string, options?: any, defaultMessage?: string) => string;
interface I18nProvider {
    translate: Translate;
    changeLocale: (locale: string, options?: any) => Promise<any>;
    getLocale: () => string;
}
interface ITranslationContext {
    i18nProvider?: I18nProvider;
}
declare type TranslationProvider = Required<ITranslationContext>;

declare const auditLogPermissions: readonly ["create", "update", "delete"];
declare type AuditLogPermissions = typeof auditLogPermissions;
interface IResourceContext {
    resources: IResourceItem[];
}
declare type OptionsProps<TExtends = {
    [key: string]: any;
}> = TExtends & {
    label?: string;
    route?: string;
    auditLog?: {
        permissions?: AuditLogPermissions[number][] | string[];
    };
    [key: string]: any;
};
interface ResourceProps extends IResourceComponents {
    name: string;
    canDelete?: boolean;
    icon?: ReactNode;
    options?: OptionsProps;
    parentName?: string;
    key?: string;
}
interface IResourceComponentsProps<TCrudData = any, TOptionsPropsExtends = {
    [key: string]: any;
}, TLogQueryResult = ILogData> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
    options?: OptionsProps<TOptionsPropsExtends>;
    logQueryResult?: UseQueryResult<TLogQueryResult>;
}
interface IResourceComponents {
    list?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    create?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    edit?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    show?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
}
interface IResourceItem extends IResourceComponents {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
    options?: OptionsProps;
    parentName?: string;
    key?: string;
}

interface IUnsavedWarnContext {
    warnWhen?: boolean;
    setWarnWhen?: (value: boolean) => void;
}

interface IRouterProvider {
    useHistory: () => {
        push: (...args: any) => any;
        replace: (...args: any) => any;
        goBack: (...args: any) => any;
    };
    useLocation: () => {
        search: string;
        pathname: string;
    };
    useParams: <Params extends {
        [K in keyof Params]?: string;
    } = {}>() => Params;
    Prompt: React__default.FC<PromptProps>;
    Link: React__default.FC<any>;
    RouterComponent?: React__default.FC<any>;
    routes?: any;
}
declare type PromptProps = {
    message: string;
    when?: boolean;
    setWarnWhen?: (warnWhen: boolean) => void;
};

declare type CanParams = {
    resource: string;
    action: string;
    params?: {
        resource?: IResourceItem;
        id?: BaseKey;
        [key: string]: any;
    };
};
declare type CanReturnType = {
    can: boolean;
    reason?: string;
};
interface IAccessControlContext {
    can?: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
}
declare type AccessControlProvider = Required<IAccessControlContext>;

interface OpenNotificationParams {
    key?: string;
    message: string;
    type: "success" | "error" | "progress";
    description?: string;
    cancelMutation?: () => void;
    undoableTimeout?: number;
}
interface INotificationContext {
    open?: (params: OpenNotificationParams) => void;
    close?: (key: string) => void;
}
declare type NotificationProvider = Required<INotificationContext>;

declare type LogParams = {
    resource: string;
    action: string;
    data?: any;
    author?: {
        name?: string;
        [key: string]: any;
    };
    previousData?: any;
    meta: Record<number | string, any>;
};
declare type IAuditLogContext = {
    create?: (params: LogParams) => Promise<any>;
    get?: (params: {
        resource: string;
        action?: string;
        meta?: Record<number | string, any>;
        author?: Record<number | string, any>;
        metaData?: MetaDataQuery;
    }) => Promise<any>;
    update?: (params: {
        id: BaseKey;
        name: string;
        [key: string]: any;
    }) => Promise<any>;
};
declare type AuditLogProvider = Required<IAuditLogContext>;

interface IUndoableQueue {
    id: BaseKey;
    resource: string;
    cancelMutation: () => void;
    doMutation: () => void;
    seconds: number;
    isRunning: boolean;
    isSilent: boolean;
}

declare type MutationMode = "pessimistic" | "optimistic" | "undoable";
declare type PreviousQuery<TData> = [QueryKey, TData | unknown];
declare type PrevContext<TData> = {
    previousQueries: PreviousQuery<TData>[];
    queryKey: IQueryKeys;
};

interface HttpError extends Record<string, any> {
    message: string;
    statusCode: number;
}

declare type TitleProps = {
    collapsed: boolean;
};
declare type LayoutProps = {
    Sider?: React__default.FC;
    Header?: React__default.FC;
    Title?: React__default.FC<TitleProps>;
    Footer?: React__default.FC;
    OffLayoutArea?: React__default.FC;
    dashboard?: boolean;
    children?: ReactNode;
};

declare type ResourceRouterParams = {
    resource: string;
    id?: string;
    action: "show" | "edit" | "create" | "clone" | undefined;
};

declare type ResourceErrorRouterParams = {
    resource: string;
    action: "show" | "edit" | "create" | undefined;
};

declare type RedirectionTypes = "show" | "list" | "edit" | false;

interface MapDataFn<TItem, TVariables> {
    (item: TItem, index?: number, items?: TItem[]): TVariables;
}

declare type SuccessErrorNotification<TData = unknown, TError = unknown, TVariables = unknown> = {
    successNotification?: OpenNotificationParams | false | ((data?: TData, values?: TVariables, resource?: string) => OpenNotificationParams);
    errorNotification?: OpenNotificationParams | false | ((error?: TError, values?: TVariables, resource?: string) => OpenNotificationParams);
};

declare type VariableOptions = {
    type?: string;
    name?: string;
    value: any;
    list?: boolean;
    required?: boolean;
} | {
    [k: string]: any;
};

declare type NestedField = {
    operation: string;
    variables: QueryBuilderOptions[];
    fields: Fields;
};

declare type Fields = Array<string | object | NestedField>;

interface QueryBuilderOptions {
    operation?: string;
    fields?: Fields;
    variables?: VariableOptions;
}

declare type MetaDataQuery = {
    [k: string]: any;
} & QueryBuilderOptions;

interface UseListConfig {
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    filters?: CrudFilters;
}
declare type UseListProps<TData, TError> = {
    resource: string;
    config?: UseListConfig;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification & LiveModeProps;
/**
 * `useList` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving items from a `resource` with pagination, sort, and filter configurations.
 *
 * It uses the `getList` method as the query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useList} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 *
 */
declare const useList: <TData = BaseRecord, TError extends HttpError = HttpError>({ resource, config, queryOptions, successNotification, errorNotification, metaData, liveMode, onLiveEvent, liveParams, dataProviderName, }: UseListProps<TData, TError>) => QueryObserverResult<GetListResponse<TData>, TError>;

interface IQueryKeys {
    all: QueryKey[];
    resourceAll: QueryKey[];
    list: (config?: UseListConfig | undefined) => QueryKey[];
    many: (ids?: BaseKey[]) => QueryKey[];
    detail: (id: BaseKey) => QueryKey[];
    logList: (meta?: Record<number | string, any>) => QueryKey[];
}

declare type ITreeMenu = IResourceItem & {
    children: ITreeMenu[];
};
declare type IMenuItem = IResourceItem & {
    key: string;
    route: string;
};

declare type LiveEvent = {
    channel: string;
    type: "deleted" | "updated" | "created" | "*" | string;
    payload: {
        ids?: BaseKey[];
        [x: string]: any;
    };
    date: Date;
};

declare type LiveModeProps = {
    liveMode?: "auto" | "manual" | "off";
    onLiveEvent?: (event: LiveEvent) => void;
    liveParams?: {
        ids?: BaseKey[];
        [key: string]: any;
    };
};

interface ILog<TData = any> {
    id: BaseKey;
    createdAt: string;
    author?: Record<number | string, any>;
    name?: string;
    data: TData;
    previousData: TData;
    resource: string;
    action: string;
    meta?: Record<number | string, any>;
}
declare type ILogData<TData = any> = ILog<TData>[];

declare type BaseKey = string | number;
declare type BaseRecord = {
    id?: BaseKey;
    [key: string]: any;
};
interface Option {
    label: string;
    value: string;
}

interface QueryClientConfig {
    queryCache?: QueryCache;
    mutationCache?: MutationCache;
    defaultOptions?: DefaultOptions;
}
interface RefineProps {
    authProvider?: AuthProvider;
    dataProvider: IDataContextProvider | IDataMultipleContextProvider;
    liveProvider?: ILiveContext;
    routerProvider: IRouterProvider;
    notificationProvider?: NotificationProvider | (() => NotificationProvider);
    accessControlProvider?: AccessControlProvider;
    auditLogProvider?: AuditLogProvider;
    resources?: ResourceProps[];
    i18nProvider?: I18nProvider;
    catchAll?: React__default.ReactNode;
    LoginPage?: React__default.FC;
    DashboardPage?: React__default.FC;
    ReadyPage?: React__default.FC;
    mutationMode?: MutationMode;
    syncWithLocation?: boolean;
    warnWhenUnsavedChanges?: boolean;
    undoableTimeout?: number;
    Layout?: React__default.FC<LayoutProps>;
    Sider?: React__default.FC;
    Header?: React__default.FC;
    Footer?: React__default.FC;
    OffLayoutArea?: React__default.FC;
    Title?: React__default.FC<TitleProps>;
    reactQueryClientConfig?: QueryClientConfig;
    reactQueryDevtoolConfig?: any;
    liveMode?: LiveModeProps['liveMode'];
    onLiveEvent?: LiveModeProps['onLiveEvent'];
    children?: React__default.ReactNode;
    disableTelemetry?: boolean;
}
/**
 * {@link https://refine.dev/docs/api-references/components/refine-config `<Refine> component`} is the entry point of a refine app.
 * It is where the highest level of configuration of the app occurs.
 * Only a dataProvider is required to bootstrap the app. After adding a dataProvider, resources can be added as property.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config} for more details.
 */
declare const Refine: React__default.FC<RefineProps>;

declare const UndoableQueue: React__default.FC<{
    notifications: IUndoableQueue[];
}>;

interface LayoutWrapperProps {
    Layout?: React__default.FC<LayoutProps>;
    Sider?: React__default.FC;
    Header?: React__default.FC;
    Title?: React__default.FC<TitleProps>;
    Footer?: React__default.FC;
    OffLayoutArea?: React__default.FC;
    children: React__default.ReactNode;
}
/**
 * `<LayoutWrapper>` wraps its contents in **refine's** layout with all customizations made in {@link https://refine.dev/docs/core/components/refine-config `<Refine>`} component.
 * It is the default layout used in resource pages.
 * It can be used in custom pages to use global layout.
 *
 * @see {@link https://refine.dev/docs/core/components/layout-wrapper} for more details.
 */
declare const LayoutWrapper: React__default.FC<LayoutWrapperProps>;

declare type AuthenticatedProps = {
    fallback?: React__default.ReactNode;
    loading?: React__default.ReactNode;
    children: React__default.ReactNode;
};
/**
 * `<Authenticated>` is the component form of {@link https://refine.dev/docs/core/hooks/auth/useAuthenticated `useAuthenticated`}. It internally uses `useAuthenticated` to provide it's functionality.
 *
 * @see {@link https://refine.dev/docs/core/components/auth/authenticated `<Authenticated>`} component for more details.
 */
declare const Authenticated: React__default.FC<AuthenticatedProps>;

declare const RouteChangeHandler: React.FC;

declare type CanAccessProps = CanParams & {
    fallback?: React__default.ReactNode;
    children: React__default.ReactNode;
};
declare const CanAccess: React__default.FC<CanAccessProps>;

/**
 * `usePermissions` calls the `getPermissions` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/usePermissions} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
declare const usePermissions: <TData = any>(options?: UseQueryOptions<TData, unknown, TData, react_query.QueryKey> | undefined) => UseQueryResult<TData, unknown>;

declare type UseGetIdentityProps<TData> = {
    queryOptions?: UseQueryOptions<TData>;
};
/**
 * `useGetIdentity` calls the `getUserIdentity` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useGetIdentity} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
declare const useGetIdentity: <TData = any>({ queryOptions, }?: UseGetIdentityProps<TData>) => UseQueryResult<TData, unknown>;

/**
 * `useLogout` calls the `logout` method from the {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useLogout} for more details.
 *
 */
declare const useLogout: <TVariables = void>() => UseMutationResult<TLogoutData, Error, TVariables, unknown>;

/**
 * `useLogin` calls `login` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useLogin} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
declare const useLogin: <TVariables = {}>() => UseMutationResult<TLoginData, Error, TVariables, unknown>;

/**
 *  `useAuthenticated` calls the `checkAuth` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useAuthenticated} for more details.
 *
 */
declare const useAuthenticated: (params?: any) => UseQueryResult<any, unknown>;

/**
 * `useCheckError` calls the `checkError` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useCheckError} for more details.
 *
 */
declare const useCheckError: () => UseMutationResult<void, string | undefined, any, unknown>;

/**
 * A hook that the UI uses
 * @internal
 */
declare const useIsExistAuthentication: () => boolean;

declare type UseOneProps<TData, TError> = {
    resource: string;
    id: BaseKey;
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification & LiveModeProps;
/**
 * `useOne` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving single items from a `resource`.
 *
 * It uses `getOne` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useOne} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 *
 */
declare const useOne: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError>({ resource, id, queryOptions, successNotification, errorNotification, metaData, liveMode, onLiveEvent, liveParams, dataProviderName, }: UseOneProps<TData, TError>) => QueryObserverResult<GetOneResponse<TData>, unknown>;

declare type UseManyProps<TData, TError> = {
    resource: string;
    ids: BaseKey[];
    queryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification & LiveModeProps;
/**
 * `useMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving multiple items from a `resource`.
 *
 * It uses `getMany` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 *
 */
declare const useMany: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError>({ resource, ids, queryOptions, successNotification, errorNotification, metaData, liveMode, onLiveEvent, liveParams, dataProviderName, }: UseManyProps<TData, TError>) => QueryObserverResult<GetManyResponse<TData>, unknown>;

declare type UpdateParams<TVariables> = {
    id: BaseKey;
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification;
declare type UseUpdateReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = UseMutationResult<UpdateResponse<TData>, TError, UpdateParams<TVariables>, PrevContext<TData>>;
/**
 * `useUpdate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for update mutations.
 *
 * It uses `update` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useUpdate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
declare const useUpdate: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseUpdateReturnType<TData, TError, TVariables>;

declare type useCreateParams<TVariables> = {
    resource: string;
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification;
declare type UseCreateReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = UseMutationResult<CreateResponse<TData>, TError, useCreateParams<TVariables>, unknown>;
/**
 * `useCreate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses `create` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useCreate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
declare const useCreate: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseCreateReturnType<TData, TError, TVariables>;

declare type DeleteParams<TVariables> = {
    id: BaseKey;
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
    values?: TVariables;
} & SuccessErrorNotification;
declare type UseDeleteReturnType<TData extends BaseRecord = BaseRecord, TError = HttpError, TVariables = {}> = UseMutationResult<DeleteOneResponse<TData>, TError, DeleteParams<TVariables>, PrevContext<TData>>;
/**
 * `useDelete` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for delete mutations.
 *
 * It uses `deleteOne` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useDelete} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 */
declare const useDelete: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseDeleteReturnType<TData, TError, TVariables>;

declare type useCreateManyParams<TVariables> = {
    resource: string;
    values: TVariables[];
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification;
declare type UseCreateManyReturnType<TData extends BaseRecord = BaseRecord, TError = HttpError, TVariables = {}> = UseMutationResult<CreateManyResponse<TData>, TError, useCreateManyParams<TVariables>, unknown>;
/**
 * `useCreateMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple create mutations.
 *
 * It uses `createMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useCreateMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
declare const useCreateMany: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseCreateManyReturnType<TData, TError, TVariables>;

declare type UpdateManyParams<TVariables> = {
    ids: BaseKey[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification;
declare type UseUpdateManyReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = UseMutationResult<UpdateManyResponse<TData>, TError, UpdateManyParams<TVariables>, PrevContext<TData>>;
/**
 * `useUpdateMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple update mutations.
 *
 * It uses `updateMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useUpdateMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
declare const useUpdateMany: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseUpdateManyReturnType<TData, TError, TVariables>;

declare type DeleteManyParams<TVariables> = {
    ids: BaseKey[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
    values?: TVariables;
} & SuccessErrorNotification;
declare type UseDeleteManyReturnType<TData extends BaseRecord = BaseRecord, TError = HttpError, TVariables = {}> = UseMutationResult<DeleteManyResponse<TData>, TError, DeleteManyParams<TVariables>, unknown>;
/**
 * `useDeleteMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple delete mutations.
 *
 * It uses `deleteMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useDeleteMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 */
declare const useDeleteMany: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseDeleteManyReturnType<TData, TError, TVariables>;

declare const useApiUrl: (dataProviderName?: string) => string;

interface UseCustomConfig<TQuery, TPayload> {
    sort?: CrudSorting;
    filters?: CrudFilters;
    query?: TQuery;
    payload?: TPayload;
    headers?: {};
}
declare type UseCustomProps<TData, TError, TQuery, TPayload> = {
    url: string;
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
    config?: UseCustomConfig<TQuery, TPayload>;
    queryOptions?: UseQueryOptions<CustomResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification;
/**
 * `useCustom` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for custom requests.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useCustom} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TQuery - Values for query params
 * @typeParam TPayload - Values for params
 *
 */
declare const useCustom: <TData = BaseRecord, TError extends HttpError = HttpError, TQuery = unknown, TPayload = unknown>({ url, method, config, queryOptions, successNotification, errorNotification, metaData, dataProviderName, }: UseCustomProps<TData, TError, TQuery, TPayload>) => QueryObserverResult<CustomResponse<TData>, TError>;

interface UseCustomMutationConfig {
    headers?: {};
}
declare type useCustomMutationParams<TVariables> = {
    url: string;
    method: "post" | "put" | "patch" | "delete";
    values: TVariables;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    config?: UseCustomMutationConfig;
} & SuccessErrorNotification;
declare type UseCustomMutationReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = UseMutationResult<CreateResponse<TData>, TError, useCustomMutationParams<TVariables>, unknown>;
/**
 * `useCustomMutation` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useCustomMutation} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
declare const useCustomMutation: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>() => UseCustomMutationReturnType<TData, TError, TVariables>;

declare const useDataProvider: () => (dataProviderName?: string) => IDataContextProvider;

declare type UseResourceSubscriptionProps = {
    channel: string;
    params?: {
        ids?: BaseKey[];
        id?: BaseKey;
        metaData?: MetaDataQuery;
        pagination?: Pagination;
        hasPagination?: boolean;
        sort?: CrudSorting;
        filters?: CrudFilters;
        subscriptionType: "useList" | "useOne" | "useMany";
        [key: string]: any;
    };
    types: LiveEvent["type"][];
    resource: string;
    enabled?: boolean;
} & LiveModeProps;
declare type PublishType = {
    (event: LiveEvent): void;
};
declare const useResourceSubscription: ({ resource, params, channel, types, enabled, liveMode: liveModeFromProp, onLiveEvent, }: UseResourceSubscriptionProps) => void;

declare const useLiveMode: (liveMode: LiveModeProps["liveMode"]) => LiveModeProps["liveMode"];

declare type UseSubscriptionProps = {
    channel: string;
    onLiveEvent: (event: LiveEvent) => void;
    params?: {
        ids?: BaseKey[];
        id?: BaseKey;
        metaData?: MetaDataQuery;
        pagination?: Pagination;
        hasPagination?: boolean;
        sort?: CrudSorting;
        filters?: CrudFilters;
        subscriptionType?: "useList" | "useOne" | "useMany";
        resource?: string;
        [key: string]: any;
    };
    types?: LiveEvent["type"][];
    enabled?: boolean;
};
declare const useSubscription: ({ params, channel, types, enabled, onLiveEvent, }: UseSubscriptionProps) => void;

declare const usePublish: () => NonNullable<ILiveContext>["publish"];

declare type UseResourcePropsType = {
    /**
     * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/pankod/refine/issues/1618
     */
    resourceName?: string;
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
};
declare type UseResourceReturnType = {
    resources: IResourceContext["resources"];
    resource: IResourceItem;
    resourceName: string;
    id?: BaseKey;
};
/**
 * `useResource` is used to get `resources` that are defined as property of the `<Refine>` component.
 *
 * @see {@link https://refine.dev/docs/core/hooks/resource/useResource} for more details.
 */
declare const useResource: ({ resourceName: propResourceName, resourceNameOrRouteName, recordItemId, }?: UseResourcePropsType) => UseResourceReturnType;

declare type UseResourceWithRouteReturnType = (route: string) => IResourceItem;
declare const useResourceWithRoute: () => UseResourceWithRouteReturnType;

declare type UseCancelNotificationType = () => {
    notifications: IUndoableQueue[];
    notificationDispatch: React.Dispatch<any>;
};
declare const useCancelNotification: UseCancelNotificationType;

declare const useNotification: () => INotificationContext;

declare const useHandleNotification: () => (notification: OpenNotificationParams | false | undefined, fallbackNotification?: OpenNotificationParams) => void;

/**
 * If you need to change the locale at runtime, refine provides the `useSetLocale` hook.
 * It returns the changeLocale method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/translate/useSetLocale} for more details.
 */
declare const useSetLocale: () => (lang: string) => Promise<any> | undefined;

/**
 * If you need to translate the texts in your own components, refine provides the `useTranslate` hook.
 * It returns the translate method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/translate/useTranslate} for more details.
 */
declare const useTranslate: () => {
    (key: string, options?: any, defaultMessage?: string): string;
    (key: string, defaultMessage?: string): string;
};

declare type UseGetLocaleType = () => () => string | undefined;
/**
 * If you need to know the current locale, refine provides the `useGetLocale` hook.
 * It returns the `getLocale` method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/translate/useGetLocale} for more details.
 */
declare const useGetLocale: UseGetLocaleType;

declare type UseMutationModeType = () => {
    mutationMode: IRefineContext["mutationMode"];
    undoableTimeout: IRefineContext["undoableTimeout"];
};
/**
 * Mutation mode determines which mode the mutation runs with.
 * Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`.
 * Each mode corresponds to a different type of user experience.
 *
 * @see {@link https://refine.dev/docs/guides-and-concepts/mutation-mode} for more details.
 */
declare const useMutationMode: UseMutationModeType;

declare type UseWarnAboutChangeType = () => {
    warnWhenUnsavedChanges: IRefineContext["warnWhenUnsavedChanges"];
    warnWhen: NonNullable<IUnsavedWarnContext["warnWhen"]>;
    setWarnWhen: NonNullable<IUnsavedWarnContext["setWarnWhen"]>;
};
/**
 * When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
 * To activate this feature, set the `warnWhenUnsavedChanges` to `true`.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#warnwhenunsavedchanges} for more details.
 */
declare const useWarnAboutChange: UseWarnAboutChangeType;

declare type UseSyncWithLocationType = () => {
    syncWithLocation: IRefineContext["syncWithLocation"];
};
/**
 * List query parameter values can be edited manually by typing directly in the URL.
 * To activate this feature `syncWithLocation` needs to be set to `true`.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#syncwithlocation} for more details.
 */
declare const useSyncWithLocation: UseSyncWithLocationType;

/**
 * `useTitle` returns a component that calls the `<Title>` passed to the `<Refine>`.
 * In this way, it becomes easier for us to access this component in various parts of the application.
 *
 * @see {@link https://refine.dev/docs/core/hooks/refine/useTitle} for more details.
 */
declare const useTitle: () => React.FC<TitleProps> | undefined;

declare const useRefineContext: () => {
    Footer: React$1.FC<{}> | undefined;
    Header: React$1.FC<{}> | undefined;
    Layout: React$1.FC<LayoutProps>;
    OffLayoutArea: React$1.FC<{}> | undefined;
    Sider: React$1.FC<{}> | undefined;
    Title: React$1.FC<TitleProps> | undefined;
    hasDashboard: boolean;
    mutationMode: MutationMode;
    syncWithLocation: boolean;
    undoableTimeout: number;
    warnWhenUnsavedChanges: boolean;
    DashboardPage: React$1.FC<{}> | undefined;
    LoginPage: false | React$1.FC<{}> | undefined;
    catchAll: React$1.ReactNode;
};

declare type UseExportOptionsType<TData extends BaseRecord = BaseRecord, TVariables = any> = {
    resourceName?: string;
    mapData?: MapDataFn<TData, TVariables>;
    sorter?: CrudSorting;
    filters?: CrudFilters;
    maxItemCount?: number;
    pageSize?: number;
    exportOptions?: Options;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    onError?: (error: any) => void;
};
declare type UseExportReturnType = {
    isLoading: boolean;
    triggerExport: () => Promise<void>;
};
/**
 * `useExport` hook allows you to make your resources exportable.
 *
 * @see {@link https://refine.dev/docs/core/hooks/import-export/useExport} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TVariables - Values for params.
 *
 */
declare const useExport: <TData extends BaseRecord = BaseRecord, TVariables = any>({ resourceName, sorter, filters, maxItemCount, pageSize, mapData, exportOptions, metaData, dataProviderName, onError, }?: UseExportOptionsType<TData, TVariables>) => UseExportReturnType;

declare type ActionParams = {
    action?: "edit" | "create" | "clone";
};
declare type ActionFormProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = {
    onMutationSuccess?: (data: CreateResponse<TData> | UpdateResponse<TData>, variables: TVariables, context: any) => void;
    onMutationError?: (error: TError, variables: TVariables, context: any) => void;
    redirect?: RedirectionTypes;
    resource?: string;
    id?: BaseKey;
    metaData?: MetaDataQuery;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, HttpError>;
} & SuccessErrorNotification & ActionParams & LiveModeProps;
declare type UseFormProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = ActionParams & ActionFormProps<TData, TError, TVariables> & LiveModeProps;
declare type UseFormReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}> = {
    id?: BaseKey;
    setId: Dispatch<SetStateAction<BaseKey | undefined>>;
    queryResult?: QueryObserverResult<GetOneResponse<TData>>;
    mutationResult: UseUpdateReturnType<TData, TError, TVariables> | UseCreateReturnType<TData, TError, TVariables>;
    formLoading: boolean;
    onFinish: (values: TVariables) => Promise<CreateResponse<TData> | UpdateResponse<TData> | void>;
    redirect: (redirect: "show" | "list" | "edit" | "create" | false, idFromFunction?: BaseKey | undefined) => void;
};
/**
 * `useForm` is used to manage forms. It uses Ant Design {@link https://ant.design/components/form/ Form} data scope management under the hood and returns the required props for managing the form actions.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/form/useForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */
declare const useForm: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = {}>({ action: actionFromProps, resource: resourceFromProps, id: idFromProps, onMutationSuccess, onMutationError, redirect: redirectFromProps, successNotification, errorNotification, metaData, mutationMode: mutationModeProp, liveMode, onLiveEvent, liveParams, undoableTimeout, dataProviderName, invalidates, queryOptions, }?: UseFormProps<TData, TError, TVariables>) => UseFormReturnType<TData, TError, TVariables>;

declare type UseRedirectionAfterSubmissionType = () => (options: {
    redirect: "show" | "list" | "edit" | "create" | false;
    resource: IResourceItem;
    id?: BaseKey;
}) => void;
declare const useRedirectionAfterSubmission: UseRedirectionAfterSubmissionType;

declare type HistoryType = "push" | "replace";
/**
 * `refine` uses {@link https://reactrouter.com/web/api/Hooks `React Router`} and comes with all redirects out of the box.
 * It allows you to manage your routing operations in refine.
 * Using this hook, you can manage all the routing operations of your application very easily.
 *
 * @see {@link https://refine.dev/docs/core/hooks/navigation/useNavigation} for more details.
 */
declare const useNavigation: () => {
    create: (resource: string, type?: HistoryType) => void;
    createUrl: (resource: string) => string;
    edit: (resource: string, id: BaseKey, type?: HistoryType) => void;
    editUrl: (resource: string, id: BaseKey) => string;
    clone: (resource: string, id: BaseKey, type?: HistoryType) => void;
    cloneUrl: (resource: string, id: BaseKey) => string;
    show: (resource: string, id: BaseKey, type?: HistoryType) => void;
    showUrl: (resource: string, id: BaseKey) => string;
    list: (resource: string, type?: HistoryType) => void;
    listUrl: (resource: string) => string;
    push: (path: string, state?: unknown) => void;
    replace: (path: string, state?: unknown) => void;
    goBack: () => void;
};

declare type useShowReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    showId?: BaseKey;
    setShowId: React__default.Dispatch<React__default.SetStateAction<BaseKey | undefined>>;
};
declare type useShowProps = {
    resource?: string;
    id?: BaseKey;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & LiveModeProps & SuccessErrorNotification;
/**
 * `useShow` hook allows you to fetch the desired record.
 * It uses `getOne` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/core/hooks/show/useShow} for more details.
 */
declare const useShow: <TData extends BaseRecord = BaseRecord>({ resource: resourceFromProp, id, successNotification, errorNotification, metaData, liveMode, onLiveEvent, dataProviderName, }?: useShowProps) => useShowReturnType<TData>;

declare type ImportSuccessResult<TVariables, TData> = {
    request: TVariables[];
    type: "success";
    response: TData[];
};
declare type ImportErrorResult<TVariables> = {
    request: TVariables[];
    type: "error";
    response: HttpError[];
};
declare type OnFinishParams<TVariables, TData> = {
    succeeded: ImportSuccessResult<TVariables, TData>[];
    errored: ImportErrorResult<TVariables>[];
};
declare type OnProgressParams = {
    totalAmount: number;
    processedAmount: number;
};
declare type ImportOptions<TItem, TVariables = any, TData extends BaseRecord = BaseRecord> = {
    resourceName?: string;
    mapData?: MapDataFn<TItem, TVariables>;
    paparseOptions?: ParseConfig;
    batchSize?: number;
    onFinish?: (results: OnFinishParams<TVariables, TData>) => void;
    metaData?: MetaDataQuery;
    onProgress?: (onProgressParams: OnProgressParams) => void;
    dataProviderName?: string;
};
declare type CreatedValuesType<TVariables, TData> = ImportSuccessResult<TVariables, TData> | ImportErrorResult<TVariables>;
declare type HandleChangeType<TVariables, TData> = (onChangeParams: {
    file: Partial<File>;
}) => Promise<CreatedValuesType<TVariables, TData>[]>;
declare type UseImportInputPropsType = {
    type: "file";
    accept: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
declare type UseImportReturnType<TData extends BaseRecord = BaseRecord, TVariables = {}, TError extends HttpError = HttpError> = {
    inputProps: UseImportInputPropsType;
    mutationResult: UseCreateReturnType<TData, TError, TVariables> | UseCreateManyReturnType<TData, TError, TVariables>;
    isLoading: boolean;
    handleChange: HandleChangeType<TVariables, TData>;
};
/**
 * `useImport` hook allows you to handle your csv import logic easily.
 *
 * @see {@link https://refine.dev/docs/core/hooks/import-export/useImport} for more details.
 *
 * @typeParam TItem - Interface of parsed csv data
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
declare const useImport: <TItem extends unknown = any, TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables = any>({ resourceName, mapData, paparseOptions, batchSize, onFinish, metaData, onProgress, }?: ImportOptions<TItem, TVariables, TData>) => UseImportReturnType<TData, TVariables, TError>;

declare type useModalReturnType = {
    visible: boolean;
    show: () => void;
    close: () => void;
};
declare type useModalProps = {
    defaultVisible?: boolean;
};
declare const useModal: ({ defaultVisible, }?: useModalProps) => useModalReturnType;

declare const useRouterContext: () => {
    useHistory: () => any;
    useLocation: () => any;
    useParams: <Params extends { [K in keyof Params]?: string | undefined; } = {}>() => Params;
    Prompt: React$1.FC<PromptProps>;
    Link: React$1.FC<any>;
    routes: any;
};

declare type UseCanProps = CanParams & {
    queryOptions?: UseQueryOptions<CanReturnType>;
};
/**
 * `useCan` uses the `can` as the query function for `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`}. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.
 * @see {@link https://refine.dev/docs/core/hooks/accessControl/useCan} for more details.
 *
 * @typeParam CanParams {@link https://refine.dev/docs/core/interfaceReferences#canparams}
 * @typeParam CanReturnType {@link https://refine.dev/docs/core/interfaceReferences#canreturntype}
 *
 */
declare const useCan: ({ action, resource, params, queryOptions, }: UseCanProps) => UseQueryResult<CanReturnType>;

declare const useCanWithoutCache: () => IAccessControlContext;

declare type UseSelectProps<TData, TError> = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
    defaultValue?: BaseKey | BaseKey[];
    debounce?: number;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    fetchSize?: number;
    defaultValueQueryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    onSearch?: (value: string) => CrudFilters;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification & LiveModeProps;
declare type UseSelectReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
    onSearch: (value: string | undefined) => void;
    options: Option[];
};
declare const useSelect: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError>(props: UseSelectProps<TData, TError>) => UseSelectReturnType<TData>;

declare type SetFilterBehavior = "merge" | "replace";
declare type useTableProps<TData, TError> = {
    resource?: string;
    initialCurrent?: number;
    initialPageSize?: number;
    hasPagination?: boolean;
    initialSorter?: CrudSorting;
    permanentSorter?: CrudSorting;
    defaultSetFilterBehavior?: SetFilterBehavior;
    initialFilter?: CrudFilters;
    permanentFilter?: CrudFilters;
    syncWithLocation?: boolean;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification & LiveModeProps;
declare type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
declare type SyncWithLocationParams = {
    pagination: {
        current?: number;
        pageSize?: number;
    };
    sorter: CrudSorting;
    filters: CrudFilters;
};
declare type useTablePaginationKeys = "current" | "setCurrent" | "pageSize" | "setPageSize" | "pageCount";
declare type useTableReturnType<TData extends BaseRecord = BaseRecord> = {
    tableQueryResult: QueryObserverResult<GetListResponse<TData>>;
    sorter: CrudSorting;
    setSorter: (sorter: CrudSorting) => void;
    filters: CrudFilters;
    setFilters: ((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void);
    createLinkForSyncWithLocation: (params: SyncWithLocationParams) => string;
    current: number;
    setCurrent: ReactSetState<useTableReturnType["current"]>;
    pageSize: number;
    setPageSize: ReactSetState<useTableReturnType["pageSize"]>;
    pageCount: number;
};
declare type useTableNoPaginationReturnType<TData extends BaseRecord = BaseRecord> = Omit<useTableReturnType<TData>, useTablePaginationKeys> & Record<useTablePaginationKeys, undefined>;
declare function useTable<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError>(props?: useTableProps<TData, TError> & {
    hasPagination?: true;
}): useTableReturnType<TData>;
declare function useTable<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError>(props?: useTableProps<TData, TError> & {
    hasPagination: false;
}): useTableNoPaginationReturnType<TData>;

declare type LogRenameData = {
    resource?: string;
} | undefined;
declare type UseLogReturnType<TLogData, TLogRenameData> = {
    log: UseMutationResult<TLogData, Error, LogParams>;
    rename: UseMutationResult<TLogRenameData, Error, {
        id: BaseKey;
        name: string;
    }>;
};
/**
 * useLog is used to `create` a new and `rename` the existing audit log.
 * @see {@link https://refine.dev/docs/core/hooks/audit-log/useLog} for more details.
 */
declare const useLog: <TLogData, TLogRenameData extends LogRenameData = LogRenameData>() => UseLogReturnType<TLogData, TLogRenameData>;

declare type UseLogProps<TData, TError> = {
    resource: string;
    action?: string;
    meta?: Record<number | string, any>;
    author?: Record<number | string, any>;
    queryOptions?: UseQueryOptions<TData, TError>;
    metaData?: MetaDataQuery;
};
/**
 * useLogList is used to get and filter audit logs.
 * @see {@link https://refine.dev/docs/core/hooks/audit-log/useLogList} for more details.
 */
declare const useLogList: <TData = any, TError extends HttpError = HttpError>({ resource, action, meta, author, metaData, queryOptions, }: UseLogProps<TData, TError>) => UseQueryResult<TData, unknown>;

declare type UseInvalidateProp = {
    resource?: string;
    id?: BaseKey;
    dataProviderName?: string;
    invalidates: Array<keyof IQueryKeys> | false;
};
declare const useInvalidate: () => (props: UseInvalidateProp) => void;

declare type BreadcrumbsType = {
    label: string;
    href?: string;
    icon?: React__default.ReactNode;
};
declare type UseBreadcrumbReturnType = {
    breadcrumbs: BreadcrumbsType[];
};
declare const useBreadcrumb: () => UseBreadcrumbReturnType;

declare type useMenuReturnType = {
    defaultOpenKeys: string[];
    selectedKey: string;
    menuItems: ITreeMenu[];
};
/**
 * `useMenu` is used to get menu items of the default sidebar.
 * These items include a link to dashboard page (if it exists) and links to the user defined resources
 * (passed as children to {@link https://refine.dev/docs/core/components/refine-config `<Refine>`}).
 * This hook can also be used to build custom menus, which is also used by default sidebar to show menu items.
 *
 * @see {@link https://refine.dev/docs/core/hooks/ui/useMenu} for more details.
 */
declare const useMenu: () => useMenuReturnType;

declare const parseTableParams: (url: string) => {
    parsedCurrent: number | "" | undefined;
    parsedPageSize: number | "" | undefined;
    parsedSorter: CrudSorting;
    parsedFilters: CrudFilters;
};
declare const parseTableParamsFromQuery: (params: any) => {
    parsedCurrent: number | "" | undefined;
    parsedPageSize: number | "" | undefined;
    parsedSorter: CrudSorting;
    parsedFilters: CrudFilters;
};
declare const stringifyTableParams: (params: {
    pagination?: {
        current?: number;
        pageSize?: number;
    };
    sorter: CrudSorting;
    filters: CrudFilters;
}) => string;
declare const unionFilters: (permanentFilter: CrudFilters, newFilters: CrudFilters, prevFilters?: CrudFilters) => CrudFilters;
declare const unionSorters: (permanentSorter: CrudSorting, newSorters: CrudSorting) => CrudSorting;
declare const setInitialFilters: (permanentFilter: CrudFilters, defaultFilter: CrudFilters) => CrudFilters;
declare const setInitialSorters: (permanentSorter: CrudSorting, defaultSorter: CrudSorting) => CrudSorting;
declare const getDefaultSortOrder: (columnName: string, sorter?: CrudSorting) => SortOrder | undefined;
declare const getDefaultFilter: (columnName: string, filters?: CrudFilters, operatorType?: CrudOperators) => CrudFilter["value"] | undefined;

declare const importCSVMapper: <TItem = any, TVariables = any>(data: any[][], mapData?: MapDataFn<TItem, TVariables>) => TVariables[];

/**
 * A method that the internal uses
 * @internal
 */
declare const userFriendlyResourceName: (resource: string | undefined, type: "singular" | "plural") => string;

declare const handleUseParams: (params?: any) => any;

declare const routeGenerator: (item: ResourceProps, resourcesFromProps: ResourceProps[]) => string | undefined;

declare const createTreeView: (resources: IResourceItem[] | IMenuItem[]) => ITreeMenu[] | ITreeMenu[];

declare const file2Base64: (file: any) => Promise<string>;

declare module "react-query/types/react/QueryClientProvider" {
    interface QueryClientProviderProps {
        children?: ReactNode;
    }
}

export { AccessControlProvider, ActionParams, AuditLogProvider, AuthProvider, Authenticated, BaseKey, BaseRecord, BreadcrumbsType, CanAccess, CanParams, CanReturnType, ConditionalFilter, CreateManyResponse, CreateResponse, CreatedValuesType, CrudFilter, CrudFilters, CrudOperators, CrudSort, CrudSorting, CustomResponse, IDataContextProvider as DataProvider, DeleteManyResponse, DeleteOneResponse, ErrorComponent, GetListResponse, GetManyResponse, GetOneResponse, HandleChangeType, HistoryType, HttpError, I18nProvider, IAccessControlContext, IAuthContext, ILog, ILogData, ILoginForm, INotificationContext, IQueryKeys, IResourceComponents, IResourceComponentsProps, IResourceItem, IRouterProvider, ITranslationContext, ITreeMenu, ImportErrorResult, ImportOptions, ImportSuccessResult, LayoutProps, LayoutWrapper, LiveEvent, LiveModeProps, ILiveContext as LiveProvider, LogParams, LogicalFilter, LoginPage, MapDataFn, MetaDataQuery, MutationMode, NotificationProvider, OnFinishParams, OnProgressParams, OpenNotificationParams, Option, Pagination, PromptProps, PublishType, ReadyPage, RedirectionTypes, Refine, RefineProps, ResourceErrorRouterParams, ResourceProps, IResourceContext as ResourceProvider, ResourceRouterParams, RouteChangeHandler, SortOrder, SuccessErrorNotification, TitleProps, TranslationProvider, UndoableQueue, UpdateManyResponse, UpdateResponse, UseCanProps, UseCancelNotificationType, UseCreateManyReturnType, UseCreateReturnType, UseFormProps, UseFormReturnType, UseImportInputPropsType, UseImportReturnType, UseInvalidateProp, UseLogProps, UseLogReturnType, UseRedirectionAfterSubmissionType, UseResourcePropsType, UseResourceSubscriptionProps, UseResourceWithRouteReturnType, UseSelectProps, UseSelectReturnType, UseSubscriptionProps, createTreeView, file2Base64, getDefaultFilter, getDefaultSortOrder, handleUseParams, importCSVMapper, parseTableParams, parseTableParamsFromQuery, routeGenerator, setInitialFilters, setInitialSorters, stringifyTableParams, unionFilters, unionSorters, useApiUrl, useAuthenticated, useBreadcrumb, useCan, useCanWithoutCache, useCancelNotification, useCheckError, useCreate, useCreateMany, useCustom, useCustomMutation, useDataProvider, useDelete, useDeleteMany, useExport, useForm, useGetIdentity, useGetLocale, useHandleNotification, useImport, useInvalidate, useIsExistAuthentication, useList, useLiveMode, useLog, useLogList, useLogin, useLogout, useMany, useMenu, useModal, useModalProps, useModalReturnType, useMutationMode, useNavigation, useNotification, useOne, usePermissions, usePublish, useRedirectionAfterSubmission, useRefineContext, useResource, useResourceSubscription, useResourceWithRoute, useRouterContext, useSelect, useSetLocale, useShow, useShowProps, useShowReturnType, useSubscription, useSyncWithLocation, useTable, useTableNoPaginationReturnType, useTablePaginationKeys, useTableProps, useTableReturnType, useTitle, useTranslate, useUpdate, useUpdateMany, useWarnAboutChange, userFriendlyResourceName };
