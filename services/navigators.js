import {
    NavigationActions,
    StackActions,
    CommonActions,
    NavigationParams,
    NavigationRoute
} from '@react-navigation/native';

let _container;
let _updateCB;
let isForceDoubleBack = false;
let doubleBackHandler = () => { };

function setContainer(container, updateCB) {
    _container = container;
    _updateCB = updateCB;
}

function reset(routeName, params) {
    _container.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
            routeName,
            params
        })],
    }));
    _updateCB();
}

function navigate(name, params) {
    _container.dispatch(
        CommonActions.navigate({
            name,
            params
        }),
    );
    _updateCB();
}

function pop(number) {
    _container.dispatch(
        StackActions.pop({
            n: number ? number : 1,
        }),
    );
    _updateCB();
}

function checkForceDoubleBack() {
    return isForceDoubleBack;
}

function forceDoubleBack(trigger) {
    isForceDoubleBack = trigger;
    doubleBackHandler(trigger);
}

function addEventListenerDoubleBack(handler) {
    doubleBackHandler = handler;
}

function removeEventListenerDoubleBack(key) {
    doubleBackHandler = () => { };
}

function navigateDeep(actions) {
    _container.dispatch(
        actions.reduceRight(
            (prevAction, action) =>
                NavigationActions.navigate({
                    type: 'Navigation/NAVIGATE',
                    routeName: action.routeName,
                    params: action.params,
                    action: prevAction,
                }),
            undefined,
        ),
    );
}

function getCurrentRoute() {
    if (!_container || !_container.state.nav) {
        return null;
    }

    return _container.state.nav.routes[_container.state.nav.index] || null;
}


export default {
    setContainer,
    navigateDeep,
    navigate,
    pop,
    reset,
    getCurrentRoute,
    isForceDoubleBack: checkForceDoubleBack,
    forceDoubleBack,
    addEventListenerDoubleBack,
    removeEventListenerDoubleBack
};