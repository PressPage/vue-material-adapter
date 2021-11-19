import { resolveDynamicComponent, h, openBlock, createBlock, createVNode, toDisplayString, withModifiers, createCommentVNode, reactive, watch, onMounted, onBeforeUnmount, toRefs, resolveComponent, ref, shallowReactive, defineComponent, computed, withCtx, renderSlot, toRef, createTextVNode, provide, mergeProps, toHandlers, inject, Fragment, renderList, nextTick, watchEffect } from 'vue';
import { MDCBannerFoundation } from '@material/banner/index.js';
import { applyPassive } from '@material/dom/events.js';
import { matches, closest } from '@material/dom/ponyfill.js';
import { MDCRippleFoundation } from '@material/ripple/index.js';
import { supportsCssVariables } from '@material/ripple/util.js';
import { getCorrectEventName } from '@material/animation/index.js';
import { MDCCheckboxFoundation } from '@material/checkbox/foundation.js';
import { MDCFormFieldFoundation } from '@material/form-field/foundation.js';
import { MDCChipSetFoundation } from '@material/chips/chip-set/foundation.js';
import { MDCChipFoundation } from '@material/chips/chip/foundation.js';
import { announce } from '@material/dom/announce.js';
import { MDCChipTrailingActionFoundation } from '@material/chips/trailingaction/foundation.js';
import { MDCCircularProgressFoundation } from '@material/circular-progress/foundation.js';
import { MDCCheckbox } from '@material/checkbox/index.js';
import { MDCDataTableFoundation } from '@material/data-table/foundation.js';
import * as test from '@material/data-table/index.js';
import { MDCDialogFoundation } from '@material/dialog/foundation.js';
import * as util from '@material/dialog/util.js';
import { FocusTrap } from '@material/dom/focus-trap.js';
import { MDCDismissibleDrawerFoundation } from '@material/drawer/dismissible/foundation.js';
import { MDCModalDrawerFoundation } from '@material/drawer/modal/foundation.js';
import * as util$1 from '@material/drawer/util.js';
import { MDCListFoundation } from '@material/list/foundation.js';
import { MDCFloatingLabelFoundation } from '@material/floating-label/foundation.js';
import { MDCIconButtonToggleFoundation } from '@material/icon-button/foundation.js';
import { MDCLineRippleFoundation } from '@material/line-ripple/foundation.js';
import { MDCLinearProgressFoundation } from '@material/linear-progress/foundation.js';
import { getCorrectPropertyName } from '@material/animation/util.js';
import { MDCMenuSurfaceFoundation } from '@material/menu-surface/foundation.js';
import { MDCMenuFoundation } from '@material/menu/foundation.js';
import { MDCNotchedOutlineFoundation } from '@material/notched-outline/foundation.js';
import { MDCRadioFoundation } from '@material/radio/foundation.js';
import { MDCSegmentedButtonSegmentFoundation } from '@material/segmented-button/segment/index.js';
import { MDCSegmentedButtonFoundation } from '@material/segmented-button/index.js';
import { MDCSelectFoundation } from '@material/select/foundation.js';
import { MDCSelectHelperTextFoundation } from '@material/select/helper-text/foundation.js';
import { MDCSelectIconFoundation } from '@material/select/icon/foundation.js';
import { MDCSliderFoundation, Thumb, cssClasses as cssClasses$8, events } from '@material/slider';
import { MDCSnackbarFoundation } from '@material/snackbar/foundation.js';
import { MDCSwitchFoundation } from '@material/switch/foundation.js';
import { MDCTabBarFoundation } from '@material/tab-bar/foundation.js';
import { MDCFadingTabIndicatorFoundation } from '@material/tab-indicator/fading-foundation.js';
import { MDCTabIndicatorFoundation } from '@material/tab-indicator/foundation.js';
import { MDCSlidingTabIndicatorFoundation } from '@material/tab-indicator/sliding-foundation.js';
import { MDCTabScrollerFoundation } from '@material/tab-scroller/foundation.js';
import * as util$2 from '@material/tab-scroller/util.js';
import MDCTabFoundation from '@material/tab/foundation.js';
import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield/character-counter/foundation.js';
import { MDCTextFieldHelperTextFoundation } from '@material/textfield/helper-text/foundation.js';
import { MDCTextFieldIconFoundation } from '@material/textfield/icon/foundation.js';
import { MDCTextFieldFoundation } from '@material/textfield/foundation.js';
import { MDCTooltipFoundation, events as events$1 } from '@material/tooltip';
import { MDCFixedTopAppBarFoundation } from '@material/top-app-bar/fixed/foundation.js';
import { MDCShortTopAppBarFoundation } from '@material/top-app-bar/short/foundation.js';
import { MDCTopAppBarFoundation } from '@material/top-app-bar/standard/foundation.js';

function BasePlugin(components) {
  return {
    version: "__VERSION__",
    install: (vm) => {
      for (const [key, component] of Object.entries(components)) {
        const name = key.replace(/([\da-z])([A-Z])/g, "$1-$2").toLowerCase();
        const [pfx, ...rest] = name.split("-");
        const mdcName = ["mdc", ...rest].join("-");
        const mcwName = ["mcw", ...rest].join("-");
        const haveComponent = vm._context.components[mcwName];
        if (!haveComponent) {
          vm.component(mcwName, component);
          vm.component(mdcName, component);
        }
      }
    },
    components
  };
}

function emitCustomEvent(element, eventType, eventData, shouldBubble = false) {
  if (element) {
    eventType = eventType.toLowerCase();
    const event_ = typeof CustomEvent === "function" ? new CustomEvent(eventType, {
      detail: eventData,
      bubbles: shouldBubble
    }) : createCustomEvent(eventType, shouldBubble, eventData);
    element.dispatchEvent(event_);
  }
}
const createCustomEvent = (eventType, shouldBubble, eventData) => {
  const event_ = document.createEvent("CustomEvent");
  return event_.initCustomEvent(eventType, shouldBubble, false, eventData);
};

const CustomLink = {
  name: "custom-link",
  props: {
    tag: String,
    to: [String, Object]
  },
  setup(props, { slots, attrs }) {
    return () => {
      var _a;
      const { to, href, tag } = props;
      const routerLink = resolveDynamicComponent("router-link");
      if (to && routerLink) {
        const rtag = tag != null ? tag : "a";
        return h(routerLink, {
          custom: true,
          ...attrs,
          to
        }, {
          default: (props2) => {
            var _a2;
            return h(rtag, {
              ...attrs,
              onClick: (event_) => {
                event_.__itemId = attrs.itemId;
                props2.navigate(event_);
              }
            }, (_a2 = slots.default) == null ? void 0 : _a2.call(slots));
          }
        });
      }
      const element = href ? "a" : tag != null ? tag : "a";
      const role = href ? "button" : element !== "button" ? "button" : void 0;
      const children = (_a = slots.default) == null ? void 0 : _a.call(slots);
      return h(element, { ...attrs, role }, { default: () => children });
    };
  }
};

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BasePlugin: BasePlugin,
  emitCustomEvent: emitCustomEvent,
  CustomLink: CustomLink
});

var script$J = {
  props: {
    text: String,
    primaryAction: String,
    secondaryAction: String,
    icon: String
  },
  setup(props, { emit }) {
    const onPrimary = () => emit("click", { target: 0 });
    const onSecondary = () => emit("click", { target: 1 });
    return { onPrimary, onSecondary };
  }
};

const _hoisted_1$p = {
  class: "mdc-banner__content",
  role: "status",
  "aria-live": "assertive"
};
const _hoisted_2$k = { class: "mdc-banner__graphic-text-wrapper" };
const _hoisted_3$f = /* @__PURE__ */ createVNode("div", {
  class: "mdc-banner__graphic",
  role: "img",
  alt: ""
}, [
  /* @__PURE__ */ createVNode("i", { class: "material-icons mdc-banner__icon" }, "error_outline")
], -1);
const _hoisted_4$c = { class: "mdc-banner__text" };
const _hoisted_5$8 = { class: "mdc-banner__actions" };
const _hoisted_6$5 = /* @__PURE__ */ createVNode("div", { class: "mdc-button__ripple" }, null, -1);
const _hoisted_7$4 = { class: "mdc-button__label" };
const _hoisted_8$3 = /* @__PURE__ */ createVNode("div", { class: "mdc-button__ripple" }, null, -1);
const _hoisted_9$2 = { class: "mdc-button__label" };
function render$J(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$p, [
    createVNode("div", _hoisted_2$k, [
      _hoisted_3$f,
      createVNode("div", _hoisted_4$c, toDisplayString($props.text), 1)
    ]),
    createVNode("div", _hoisted_5$8, [
      $props.secondaryAction ? (openBlock(), createBlock("button", {
        key: 0,
        type: "button",
        class: "mdc-button mdc-banner__secondary-action",
        onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $setup.onSecondary && $setup.onSecondary(...args), ["stop"]))
      }, [
        _hoisted_6$5,
        createVNode("div", _hoisted_7$4, toDisplayString($props.secondaryAction), 1)
      ])) : createCommentVNode("v-if", true),
      createVNode("button", {
        type: "button",
        class: "mdc-button mdc-banner__primary-action",
        onClick: _cache[2] || (_cache[2] = withModifiers((...args) => $setup.onPrimary && $setup.onPrimary(...args), ["stop"]))
      }, [
        _hoisted_8$3,
        createVNode("div", _hoisted_9$2, toDisplayString($props.primaryAction), 1)
      ])
    ])
  ]);
}

script$J.render = render$J;
script$J.__file = "src/banner/banner-content.vue";

var script$I = {
  name: "mcw-banner",
  props: {
    centered: Boolean,
    modelValue: Boolean,
    text: String,
    primaryAction: String,
    secondaryAction: String,
    mobile: Boolean,
    fixed: Boolean,
    icon: String
  },
  components: { bannerContent: script$J },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {
        "mdc-banner--centered": props.centered,
        "mdc-banner--mobile-stacked": props.mobile
      },
      styles: {},
      root: void 0,
      contentEl: void 0
    });
    let foundation;
    const onOpen = (nv) => {
      if (nv) {
        foundation.open();
      } else {
        foundation.close();
      }
    };
    const onContentClick = ({ target }) => {
      if (target == 1) {
        foundation.handleSecondaryActionClick();
      } else {
        foundation.handlePrimaryActionClick();
      }
    };
    const adapter = {
      addClass: (className) => {
        uiState.classes = { ...uiState.classes, [className]: true };
        uiState.root.classList.add(className);
      },
      getContentHeight: () => {
        return uiState.contentEl.$el.offsetHeight;
      },
      notifyOpening: () => {
        emit("mdcbanner:opening", {});
      },
      notifyOpened: () => emit("mdcbanner:opened", {}),
      notifyClosing: (reason) => {
        emit("update:modelValue", false);
        emit("mdcbanner:closing", { reason });
      },
      notifyClosed: (reason) => {
        emit("mdcbanner:closed", { reason });
      },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      setStyleProperty: (property, value) => uiState.styles = { ...uiState.styles, [property]: value }
    };
    watch(() => props.modelValue, (nv) => {
      onOpen(nv);
    });
    onMounted(() => {
      foundation = new MDCBannerFoundation(adapter);
      foundation.init();
    });
    onBeforeUnmount(() => {
      foundation == null ? void 0 : foundation.destroy();
    });
    return { ...toRefs(uiState), onContentClick };
  }
};

const _hoisted_1$o = {
  key: 0,
  class: "mdc-banner__fixed"
};
function render$I(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_banner_content = resolveComponent("banner-content");
  return openBlock(), createBlock("div", {
    ref: "root",
    class: ["mdc-banner demo-banner", _ctx.classes],
    role: "banner",
    style: _ctx.styles
  }, [
    _ctx.fixed ? (openBlock(), createBlock("div", _hoisted_1$o, [
      createVNode(_component_banner_content, {
        ref: "contentEl",
        icon: _ctx.icon,
        "primary-action": _ctx.primaryAction,
        "secondary-action": _ctx.secondaryAction,
        text: _ctx.text,
        onClick: _ctx.onContentClick
      }, null, 8, ["icon", "primary-action", "secondary-action", "text", "onClick"])
    ])) : (openBlock(), createBlock(_component_banner_content, {
      key: 1,
      ref: "contentEl",
      icon: _ctx.icon,
      "primary-action": _ctx.primaryAction,
      "secondary-action": _ctx.secondaryAction,
      text: _ctx.text,
      onClick: _ctx.onContentClick
    }, null, 8, ["icon", "primary-action", "secondary-action", "text", "onClick"]))
  ], 6);
}

script$I.render = render$I;
script$I.__file = "src/banner/banner.vue";

var banner = BasePlugin({
  mcwBanner: script$I
});

class RippleElement extends MDCRippleFoundation {
  constructor(element, state, { unbounded = false, ...options } = {}) {
    var _a;
    const $element = (_a = element.$el) != null ? _a : element;
    super({
      addClass: (className) => {
        if (state) {
          state.classes = { ...state.classes, [className]: true };
        } else {
          $element.classList.add(className);
        }
      },
      browserSupportsCssVars: () => supportsCssVariables(window),
      computeBoundingRect: () => $element.getBoundingClientRect(),
      containsEventTarget: (target) => $element.contains(target),
      deregisterDocumentInteractionHandler: (eventType, handler) => document.documentElement.removeEventListener(eventType, handler, applyPassive()),
      deregisterInteractionHandler: (event_, handler) => $element.removeEventListener(event_, handler, applyPassive()),
      deregisterResizeHandler: (handler) => window.removeEventListener("resize", handler),
      getWindowPageOffset: () => ({
        x: window.pageXOffset,
        y: window.pageYOffset
      }),
      isSurfaceActive: () => matches($element, ":active"),
      isSurfaceDisabled: () => false,
      isUnbounded: () => this.unbounded_,
      registerDocumentInteractionHandler: (eventType, handler) => document.documentElement.addEventListener(eventType, handler, applyPassive()),
      registerInteractionHandler: (event_, handler) => {
        $element.addEventListener(event_, handler, applyPassive());
      },
      registerResizeHandler: (handler) => {
        return window.addEventListener("resize", handler);
      },
      removeClass: (className) => {
        if (state) {
          const { [className]: removed, ...rest } = state.classes;
          state.classes = rest;
        } else {
          $element.classList.remove(className);
        }
      },
      updateCssVariable: (variableName, value) => {
        if (state) {
          state.styles = { ...state.styles, [variableName]: value };
        } else {
          $element.style.setProperty(variableName, value);
        }
      },
      ...options
    });
    this.unbounded_ = unbounded;
  }
  get unbounded() {
    return this.unbounded_;
  }
  set unbounded(unbounded) {
    this.unbounded_ = Boolean(unbounded);
    this.setUnbounded(this.unbounded_);
  }
}
function useRipplePlugin(root, options) {
  const ripple = ref();
  const state = shallowReactive({ classes: {}, styles: {} });
  const activate = () => {
    var _a;
    return (_a = ripple.value) == null ? void 0 : _a.activate();
  };
  const deactivate = () => {
    var _a;
    return (_a = ripple.value) == null ? void 0 : _a.deactivate();
  };
  onMounted(() => {
    ripple.value = new RippleElement(root.value, state, options);
    ripple.value.init();
  });
  onBeforeUnmount(() => {
    ripple.value.destroy();
  });
  return { ...toRefs(state), activate, deactivate };
}

var script$H = defineComponent({
  name: "mcw-button",
  props: {
    raised: Boolean,
    unelevated: Boolean,
    outlined: Boolean,
    icon: String,
    trailingIcon: String
  },
  components: { CustomLink },
  setup(props, { slots }) {
    const root = ref();
    const { classes: rippleClasses, styles } = useRipplePlugin(root);
    const classes = computed(() => {
      return {
        ...rippleClasses.value,
        "mdc-button": true,
        "mdc-button--raised": props.raised,
        "mdc-button--unelevated": props.unelevated && !props.raised,
        "mdc-button--outlined": props.outlined
      };
    });
    const haveIcon = computed(() => {
      var _a;
      return (_a = slots.icon) != null ? _a : props.icon;
    });
    const haveTrailingIcon = computed(() => {
      var _a;
      return (_a = slots.trailingIcon) != null ? _a : props.trailingIcon;
    });
    return {
      styles,
      classes,
      root,
      haveIcon,
      haveTrailingIcon
    };
  }
});

const _hoisted_1$n = /* @__PURE__ */ createVNode("div", { class: "mdc-button__ripple" }, null, -1);
const _hoisted_2$j = {
  class: "material-icons mdc-button__icon",
  "aria-hidden": "true"
};
const _hoisted_3$e = { class: "mdc-button__label" };
const _hoisted_4$b = {
  class: "material-icons mdc-button__icon",
  "aria-hidden": "true"
};
function render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_custom_link = resolveComponent("custom-link");
  return openBlock(), createBlock(_component_custom_link, {
    ref: "root",
    class: _ctx.classes,
    style: _ctx.styles,
    tag: "button"
  }, {
    default: withCtx(() => [
      _hoisted_1$n,
      _ctx.haveIcon ? renderSlot(_ctx.$slots, "icon", { key: 0 }, () => [
        createVNode("i", _hoisted_2$j, toDisplayString(_ctx.icon), 1)
      ]) : createCommentVNode("v-if", true),
      createVNode("span", _hoisted_3$e, [
        renderSlot(_ctx.$slots, "default")
      ]),
      _ctx.haveTrailingIcon ? renderSlot(_ctx.$slots, "trailingIcon", { key: 1 }, () => [
        createVNode("i", _hoisted_4$b, toDisplayString(_ctx.trailingIcon), 1)
      ]) : createCommentVNode("v-if", true)
    ]),
    _: 3
  }, 8, ["class", "style"]);
}

script$H.render = render$H;
script$H.__file = "src/button/button.vue";

var button = BasePlugin({
  mcwButton: script$H
});

var mcwCardActionButtons = {
  name: "mcw-card-action-buttons",
  setup(props, { slots }) {
    return () => {
      var _a;
      return h("div", {
        class: ["mdc-card__action-buttons"]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
};

var mcwCardActionIcons = {
  name: "mcw-card-action-icons",
  setup(props, { slots }) {
    return () => {
      var _a;
      return h("div", {
        class: ["mdc-card__action-icons"]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
};

var mcwCardActions = {
  name: "mcw-card-actions",
  props: {
    fullBleed: Boolean
  },
  setup(props, { slots }) {
    return () => {
      var _a;
      return h("section", {
        class: [
          {
            "mdc-card__actions": 1,
            "mdc-card__actions--full-bleed": props.fullBleed
          }
        ]
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};

var mcwCardMedia = {
  name: "mcw-card-media",
  props: {
    src: String,
    square: {
      type: Boolean,
      default() {
        return false;
      }
    },
    wide: {
      type: Boolean,
      default() {
        return false;
      }
    },
    contentClass: String
  },
  setup(props, { slots }) {
    return () => {
      var _a;
      const nodes = [];
      const content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (content) {
        nodes.push(h("div", { class: ["mdc-card__media-content", props.contentClass] }, content));
      }
      return h("section", {
        class: {
          "mdc-card__media": 1,
          "mdc-card__media--square": props.square,
          "mdc-card__media--16-9": props.wide && !props.square
        },
        style: {
          backgroundImage: `url(${props.src})`
        }
      }, nodes);
    };
  }
};

var script$G = {
  name: "mcw-card-primary-action",
  components: { CustomLink },
  setup() {
    const root = ref();
    const { classes: rippleClasses, styles } = useRipplePlugin(root);
    const classes = computed(() => {
      return { ...rippleClasses.value, "mdc-card__primary-action": 1 };
    });
    return {
      classes,
      styles,
      root
    };
  }
};

function render$G(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_custom_link = resolveComponent("custom-link");
  return openBlock(), createBlock(_component_custom_link, {
    ref: "root",
    class: _ctx.classes,
    style: _ctx.styles,
    tabindex: "0"
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "style"]);
}

script$G.render = render$G;
script$G.__file = "src/card/card-primary-action.vue";

var mcwCard = {
  name: "mcw-card",
  props: {
    outlined: Boolean
  },
  setup(props, { attrs, slots }) {
    return () => {
      var _a;
      const { outlined } = props;
      return h("div", {
        class: [
          {
            "mdc-card": 1,
            "mdc-card--outlined": outlined
          }
        ],
        ...attrs
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};

var card = BasePlugin({
  mcwCard,
  mcwCardPrimaryAction: script$G,
  mcwCardMedia,
  mcwCardActions,
  mcwCardActionButtons,
  mcwCardActionIcons
});

const CB_PROTO_PROPS = ["checked", "indeterminate"];
let checkboxId_ = 0;
var script$F = {
  name: "mcw-checkbox",
  props: {
    modelValue: [Boolean, Array],
    indeterminate: Boolean,
    disabled: Boolean,
    label: String,
    alignEnd: Boolean,
    value: {
      type: [String, Number],
      default() {
        return "on";
      }
    },
    name: String
  },
  setup(props, { emit, slots }) {
    const uiState = reactive({
      classes: { "mdc-checkbox": 1 },
      control: void 0,
      labelEl: void 0,
      root: void 0
    });
    let foundation;
    let formField;
    const checkboxId = `__mcw-checkbox-${checkboxId_++}`;
    const {
      classes: rippleClasses,
      styles,
      activate,
      deactivate
    } = useRipplePlugin(toRef(uiState, "root"), {
      isUnbounded: () => true,
      isSurfaceActive: () => {
        return matches(uiState.control, ":active");
      },
      registerInteractionHandler: (event_, handler) => {
        uiState.control.addEventListener(event_, handler, applyPassive());
      },
      deregisterInteractionHandler: (event_, handler) => {
        uiState.control.removeEventListener(event_, handler, applyPassive());
      },
      computeBoundingRect: () => {
        return uiState.root.getBoundingClientRect();
      }
    });
    const rootClasses = computed(() => {
      return { ...rippleClasses.value, ...uiState.classes };
    });
    const hasLabel = computed(() => {
      var _a;
      return (_a = props.label) != null ? _a : slots.default;
    });
    const formFieldClasses = computed(() => {
      return {
        "mdc-form-field": hasLabel.value,
        "mdc-form-field--align-end": hasLabel.value && props.alignEnd
      };
    });
    const onChange = ({ target: { indeterminate, checked } }) => {
      emit("update:indeterminate", indeterminate);
      if (Array.isArray(props.modelValue)) {
        const index = props.modelValue.indexOf(props.value);
        if (checked) {
          index < 0 && emit("update:modelValue", [...props.modelValue, props.value]);
        } else {
          index > -1 && emit("update:modelValue", [
            ...props.modelValue.slice(0, index),
            ...props.modelValue.slice(index + 1)
          ]);
        }
      } else {
        emitCustomEvent(uiState.root, "mdccheckbox:change", {}, true);
        emit("update:modelValue", checked);
      }
    };
    const isChecked = () => uiState.control.checked;
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      forceLayout: () => uiState.root.offsetWidth,
      hasNativeControl: () => true,
      isAttachedToDOM: () => true,
      isChecked: () => uiState.control.checked,
      isIndeterminate: () => uiState.control.indeterminate,
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      removeNativeControlAttr: (attribute) => {
        uiState.control.removeAttribute(attribute);
      },
      setNativeControlAttr: (attribute, value) => {
        uiState.control.setAttribute(attribute, value);
      },
      setNativeControlDisabled: (disabled) => uiState.control.disabled = disabled
    };
    const handleAnimationEnd = () => foundation.handleAnimationEnd();
    const setChecked = (checked) => {
      uiState.control.checked = Array.isArray(checked) ? checked.includes(props.value) : checked;
      emitCustomEvent(uiState.root, "mdccheckbox:change", {}, true);
    };
    const setIndeterminate = (indeterminate) => {
      uiState.control && (uiState.control.indeterminate = indeterminate);
    };
    const installPropertyChangeHooks_ = () => {
      const nativeCallback = uiState.control;
      const callbackProto = Object.getPrototypeOf(nativeCallback);
      for (const controlState of CB_PROTO_PROPS) {
        const desc = Object.getOwnPropertyDescriptor(callbackProto, controlState);
        if (validDescriptor(desc)) {
          const nativeCallbackDesc = {
            get: desc.get,
            set: (state) => {
              desc.set.call(nativeCallback, state);
              foundation.handleChange();
            },
            configurable: desc.configurable,
            enumerable: desc.enumerable
          };
          Object.defineProperty(nativeCallback, controlState, nativeCallbackDesc);
        }
      }
    };
    const uninstallPropertyChangeHooks_ = () => {
      const nativeCallback = uiState.control;
      const callbackProto = Object.getPrototypeOf(nativeCallback);
      for (const controlState of CB_PROTO_PROPS) {
        const desc = Object.getOwnPropertyDescriptor(callbackProto, controlState);
        if (validDescriptor(desc)) {
          Object.defineProperty(nativeCallback, controlState, desc);
        }
      }
    };
    watch(() => props.disabled, (nv, ov) => {
      nv != ov && (foundation == null ? void 0 : foundation.setDisabled(nv));
      emitCustomEvent(uiState.root, "mdccheckbox:change", {}, true);
    });
    watch(() => props.modelValue, (nv, ov) => {
      nv != ov && setChecked(nv);
      emitCustomEvent(uiState.root, "mdccheckbox:change", {}, true);
    });
    watch(() => props.indeterminate, (nv, ov) => {
      nv != ov && setIndeterminate(nv);
      emitCustomEvent(uiState.root, "mdccheckbox:change", {}, true);
    });
    onMounted(() => {
      foundation = new MDCCheckboxFoundation(adapter);
      uiState.root.addEventListener(getCorrectEventName(window, "animationend"), handleAnimationEnd);
      installPropertyChangeHooks_();
      if (hasLabel.value) {
        formField = new MDCFormFieldFoundation({
          registerInteractionHandler: (type, handler) => {
            uiState.labelEl.addEventListener(type, handler);
          },
          deregisterInteractionHandler: (type, handler) => {
            uiState.labelEl.removeEventListener(type, handler);
          },
          activateInputRipple: () => {
            activate();
          },
          deactivateInputRipple: () => {
            deactivate();
          }
        });
        formField.init();
      }
      foundation.init();
      setChecked(props.modelValue);
      foundation.setDisabled(props.disabled);
      setIndeterminate(props.indeterminate);
    });
    onBeforeUnmount(() => {
      uiState.root.removeEventListener(getCorrectEventName(window, "animationend"), handleAnimationEnd);
      formField == null ? void 0 : formField.destroy();
      uninstallPropertyChangeHooks_();
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      rootClasses,
      formFieldClasses,
      onChange,
      styles,
      hasLabel,
      setChecked,
      setIndeterminate,
      isChecked,
      checkboxId
    };
  }
};
function validDescriptor(inputPropertyDesc) {
  return !!inputPropertyDesc && typeof inputPropertyDesc.set === "function";
}

const _hoisted_1$m = /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__background" }, [
  /* @__PURE__ */ createVNode("svg", {
    class: "mdc-checkbox__checkmark",
    viewBox: "0 0 24 24"
  }, [
    /* @__PURE__ */ createVNode("path", {
      class: "mdc-checkbox__checkmark-path",
      fill: "none",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    })
  ]),
  /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__mixedmark" })
], -1);
const _hoisted_2$i = /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__ripple" }, null, -1);
const _hoisted_3$d = /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__background" }, [
  /* @__PURE__ */ createVNode("svg", {
    class: "mdc-checkbox__checkmark",
    viewBox: "0 0 24 24"
  }, [
    /* @__PURE__ */ createVNode("path", {
      class: "mdc-checkbox__checkmark-path",
      fill: "none",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    })
  ]),
  /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__mixedmark" })
], -1);
const _hoisted_4$a = /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__ripple" }, null, -1);
function render$F(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.hasLabel ? (openBlock(), createBlock("div", {
    key: 0,
    class: [_ctx.formFieldClasses, "mdc-checkbox-wrapper"]
  }, [
    createVNode("div", {
      ref: "root",
      class: _ctx.rootClasses,
      style: _ctx.styles
    }, [
      createVNode("input", {
        id: _ctx.checkboxId,
        ref: "control",
        name: _ctx.name,
        value: _ctx.value,
        type: "checkbox",
        class: "mdc-checkbox__native-control",
        onChange: _cache[1] || (_cache[1] = (...args) => _ctx.onChange && _ctx.onChange(...args))
      }, null, 40, ["id", "name", "value"]),
      _hoisted_1$m,
      _hoisted_2$i
    ], 6),
    createVNode("label", {
      ref: "labelEl",
      for: _ctx.checkboxId
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ])
    ], 8, ["for"])
  ], 2)) : (openBlock(), createBlock("div", {
    key: 1,
    ref: "root",
    class: _ctx.rootClasses,
    style: _ctx.styles
  }, [
    createVNode("input", {
      id: _ctx.checkboxId,
      ref: "control",
      name: _ctx.name,
      value: _ctx.value,
      type: "checkbox",
      class: "mdc-checkbox__native-control",
      onChange: _cache[2] || (_cache[2] = (...args) => _ctx.onChange && _ctx.onChange(...args))
    }, null, 40, ["id", "name", "value"]),
    _hoisted_3$d,
    _hoisted_4$a
  ], 6));
}

script$F.render = render$F;
script$F.__file = "src/checkbox/checkbox.vue";

var checkbox = BasePlugin({
  mcwCheckbox: script$F
});

var script$E = {
  name: "mcw-chip-checkmark",
  setup() {
    const width = ref(0);
    const root = ref();
    onMounted(() => width.value = root.value.getBoundingClientRect().height);
    return { width, root };
  }
};

const _hoisted_1$l = {
  ref: "root",
  class: "mdc-chip__checkmark"
};
const _hoisted_2$h = /* @__PURE__ */ createVNode("svg", {
  class: "mdc-chip__checkmark-svg",
  viewBox: "-2 -3 30 30"
}, [
  /* @__PURE__ */ createVNode("path", {
    class: "mdc-chip__checkmark-path",
    fill: "none",
    stroke: "black",
    d: "M1.73,12.91 8.1,19.28 22.79,4.59"
  })
], -1);
function render$E(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("span", _hoisted_1$l, [
    _hoisted_2$h
  ], 512);
}

script$E.render = render$E;
script$E.__file = "src/chips/chip-checkmark.vue";

const { strings: strings$e } = MDCChipFoundation;
var script$D = {
  name: "mcw-chip-set",
  props: {
    choice: [Boolean],
    filter: [Boolean],
    input: [Boolean]
  },
  setup(props) {
    const uiState = reactive({
      classes: {
        "mdc-chip-set": true,
        "mdc-chip-set--choice": props.choice,
        "mdc-chip-set--filter": props.filter,
        "mdc-chip-set--input": props.input
      },
      listn: 0,
      myListeners: {},
      root: void 0
    });
    let foundation;
    let slotObserver;
    const ce = ref([]);
    const addChipElement = (item) => {
      ce.value.push(item);
    };
    provide("addChipElement", addChipElement);
    const adapter = {
      announceMessage: (message) => {
        announce(message);
      },
      focusChipPrimaryActionAtIndex: (index) => {
        const chip = ce.value[index];
        chip && chip.focusPrimaryAction();
      },
      focusChipTrailingActionAtIndex: (index) => {
        const chip = ce.value[index];
        chip && chip.focusTrailingAction();
      },
      getChipListCount: () => {
        return ce.value.length;
      },
      getIndexOfChipById: (chipId) => {
        return ce.value.findIndex(({ id }) => id == chipId);
      },
      hasClass: (className) => uiState.root.classList.contains(className),
      isRTL: () => window.getComputedStyle(uiState.root).getPropertyValue("direction") === "rtl",
      removeChipAtIndex: (index) => {
        if (index >= 0 && index < ce.value.length) {
          ce.value[index].remove();
          ce.value.splice(index, 1);
        }
      },
      removeFocusFromChipAtIndex: (index) => {
        ce.value[index].removeFocus();
      },
      selectChipAtIndex: (index, selected, shouldNotifyClients) => {
        if (index >= 0 && index < ce.value.length) {
          ce.value[index].setSelectedFromChipSet(selected, shouldNotifyClients);
        }
      }
    };
    provide("mcwChipSet", { filter: props.filter, input: props.input });
    onMounted(() => {
      foundation = new MDCChipSetFoundation(adapter);
      foundation.init();
      uiState.myListeners = {
        [strings$e.INTERACTION_EVENT.toLowerCase()]: ({ detail }) => foundation.handleChipInteraction(detail),
        [strings$e.SELECTION_EVENT.toLowerCase()]: ({ detail }) => foundation.handleChipSelection(detail),
        [strings$e.REMOVAL_EVENT.toLowerCase()]: ({ detail }) => foundation.handleChipRemoval(detail),
        [strings$e.NAVIGATION_EVENT.toLowerCase()]: ({ detail }) => foundation.handleChipNavigation(detail)
      }, slotObserver = new MutationObserver(() => {
        uiState.listn++;
      });
      slotObserver.observe(uiState.root, {
        childList: true
      });
    });
    onBeforeUnmount(() => {
      slotObserver.disconnect();
      foundation.destroy();
    });
    return { ...toRefs(uiState) };
  }
};

function render$D(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", mergeProps({
    ref: "root",
    class: _ctx.classes,
    role: "grid"
  }, toHandlers(_ctx.myListeners)), [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}

script$D.render = render$D;
script$D.__file = "src/chips/chip-set.vue";

const { strings: strings$d } = MDCChipFoundation;
const { strings: trailingActionStrings } = MDCChipTrailingActionFoundation;
let chipItemId_ = 0;
var script$C = {
  name: "mcw-chip",
  props: {
    leadingIcon: [String],
    trailingIcon: [String],
    shouldRemoveOnTrailingIconClick: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  setup(props, { slots }) {
    const uiState = reactive({
      classes: {
        "mdc-chip": true
      },
      leadingClasses: {
        "mdc-chip__icon": 1,
        "mdc-chip__icon--leading": 1,
        "material-icons": 1
      },
      styles: {},
      primaryAttrs: {},
      trailingAttrs: {},
      myListeners: {},
      root: void 0,
      checkmarkEl: void 0,
      trailingAction: void 0
    });
    const mcwChipSet = inject("mcwChipSet");
    const addChipElement = inject("addChipElement");
    const { classes: rippleClasses, styles: rippleStyles } = useRipplePlugin(toRef(uiState, "root"));
    const id = chipItemId_++;
    let foundation;
    const classes = computed(() => {
      return { ...rippleClasses.value, ...uiState.classes };
    });
    const styles = computed(() => {
      return { ...rippleStyles.value, ...uiState.styles };
    });
    let trailingAction_;
    let leadingIcon_;
    const selected = computed({
      get() {
        return foundation.isSelected();
      },
      set(nv) {
        foundation.setSelected(nv);
      }
    });
    const isFilter = computed(() => mcwChipSet == null ? void 0 : mcwChipSet.filter);
    const isInput = computed(() => mcwChipSet == null ? void 0 : mcwChipSet.input);
    const haveleadingIcon = computed(() => {
      const slot = slots["leading-icon"];
      return slot && slot[0] || !!props.leadingIcon;
    });
    const havetrailingIcon = computed(() => {
      const slot = slots["trailing-icon"];
      return isInput.value && (slot && slot[0] || !!props.trailingIcon);
    });
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      addClassToLeadingIcon: (className) => {
        if (leadingIcon_) {
          leadingIcon_.classList.add(className);
        }
      },
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      focusPrimaryAction: () => {
        var _a;
        (_a = uiState.root.querySelector(strings$d.PRIMARY_ACTION_SELECTOR)) == null ? void 0 : _a.focus();
      },
      focusTrailingAction: () => {
        trailingAction_ == null ? void 0 : trailingAction_.focus();
      },
      getAttribute: (attribute) => uiState.root.getAttribute(attribute),
      getCheckmarkBoundingClientRect: () => {
        var _a;
        return (_a = uiState.checkmarkEl) == null ? void 0 : _a.getBoundingClientRect();
      },
      getComputedStyleValue: (propertyName) => window.getComputedStyle(uiState.root).getPropertyValue(propertyName),
      getRootBoundingClientRect: () => uiState.root.getBoundingClientRect(),
      hasClass: (className) => uiState.root.classList.contains(className),
      hasLeadingIcon: () => !!haveleadingIcon.value,
      isRTL: () => window.getComputedStyle(uiState.root).getPropertyValue("direction") === "rtl",
      isTrailingActionNavigable: () => {
        var _a;
        if (trailingAction_) {
          return (_a = uiState.trailingAction) == null ? void 0 : _a.isNavigable();
        }
        return false;
      },
      notifyInteraction: () => {
        emitCustomEvent(uiState.root, strings$d.INTERACTION_EVENT, {
          chipId: id
        }, true);
      },
      notifyNavigation: (key, source) => emitCustomEvent(uiState.root, strings$d.NAVIGATION_EVENT, {
        chipId: id,
        key,
        source
      }, true),
      notifyRemoval: (removedAnnouncement) => {
        emitCustomEvent(uiState.root, "mdc-chip:removal", { chipId: id, removedAnnouncement }, true);
      },
      notifySelection: (selected2, shouldIgnore) => emitCustomEvent(uiState.root, strings$d.SELECTION_EVENT, { chipId: id, selected: selected2, shouldIgnore }, true),
      notifyTrailingIconInteraction: () => {
        emitCustomEvent(uiState.root, strings$d.TRAILING_ICON_INTERACTION_EVENT, {
          chipId: id
        }, true);
      },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      removeClassFromLeadingIcon: (className) => {
        if (leadingIcon_) {
          leadingIcon_.classList.remove(className);
        }
      },
      removeTrailingActionFocus: () => {
        var _a;
        (_a = uiState.trailingAction) == null ? void 0 : _a.removeFocus();
      },
      setPrimaryActionAttr: (attribute, value) => uiState.primaryAttrs = {
        ...uiState.primaryAttrs,
        [attribute]: value
      },
      setStyleProperty: (property, value) => uiState.styles = { ...uiState.styles, [property]: value }
    };
    const setSelectedFromChipSet = (selected2, shouldNotifyClients) => {
      foundation.setSelectedFromChipSet(selected2, shouldNotifyClients);
    };
    const focusPrimaryAction = () => foundation.focusPrimaryAction();
    const focusTrailingAction = () => foundation.focusTrailingAction();
    const removeFocus = () => foundation.removeFocus();
    const toggleSelected = () => foundation.toggleSelected();
    const isSelected = () => foundation.isSelected();
    const remove = () => {
      const parent = uiState.root.parentNode;
      if (parent != void 0) {
        uiState.root.remove();
      }
    };
    watch(() => props.shouldRemoveOnTrailingIconClick, (nv) => {
      foundation.setShouldRemoveOnTrailingIconClick(nv);
    });
    addChipElement({
      id,
      removeFocus,
      focusPrimaryAction,
      focusTrailingAction,
      setSelectedFromChipSet,
      remove
    });
    onMounted(() => {
      leadingIcon_ = uiState.root.querySelector(strings$d.LEADING_ICON_SELECTOR);
      trailingAction_ = uiState.root.querySelector(strings$d.TRAILING_ACTION_SELECTOR);
      foundation = new MDCChipFoundation(adapter);
      uiState.myListeners = {
        click: (event_) => {
          foundation.handleClick(event_);
        },
        keydown: (event_) => foundation.handleKeydown(event_),
        transitionend: (event_) => foundation.handleTransitionEnd(event_),
        focusin: (event_) => foundation.handleFocusIn(event_),
        focusout: (event_) => foundation.handleFocusOut(event_)
      };
      if (trailingAction_) {
        uiState.myListeners[trailingActionStrings.INTERACTION_EVENT.toLowerCase()] = (event_) => foundation.handleTrailingActionInteraction(event_);
        uiState.myListeners[trailingActionStrings.NAVIGATION_EVENT.toLowerCase()] = (event_) => foundation.handleTrailingActionNavigation(event_);
      }
      foundation.init();
      uiState.primaryAttrs.tabindex = isFilter.value ? 0 : -1;
      if (props.shouldRemoveOnTrailingIconClick !== foundation.getShouldRemoveOnTrailingIconClick()) {
        foundation.setShouldRemoveOnTrailingIconClick(props.shouldRemoveOnTrailingIconClick);
      }
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      classes,
      styles,
      id,
      isInput,
      isFilter,
      selected,
      haveleadingIcon,
      havetrailingIcon,
      remove,
      isSelected,
      toggleSelected,
      removeFocus,
      focusPrimaryAction,
      focusTrailingAction,
      setSelectedFromChipSet
    };
  }
};

const _hoisted_1$k = /* @__PURE__ */ createVNode("div", { class: "mdc-chip__ripple" }, null, -1);
const _hoisted_2$g = { role: "gridcell" };
const _hoisted_3$c = { class: "mdc-chip__text" };
const _hoisted_4$9 = {
  key: 0,
  role: "gridcell"
};
function render$C(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mcw_chip_checkmark = resolveComponent("mcw-chip-checkmark");
  const _component_mcw_chip_trailing_action = resolveComponent("mcw-chip-trailing-action");
  return openBlock(), createBlock("div", mergeProps({
    ref: "root",
    class: ["mdc-chip", _ctx.classes],
    role: "row",
    style: _ctx.styles
  }, toHandlers(_ctx.myListeners)), [
    _hoisted_1$k,
    renderSlot(_ctx.$slots, "leading-icon", {}, () => [
      _ctx.haveleadingIcon ? (openBlock(), createBlock("i", {
        key: 0,
        ref: "leading-icon",
        class: "material-icons mdc-chip__icon mdc-chip__icon--leading"
      }, toDisplayString(_ctx.leadingIcon), 513)) : createCommentVNode("v-if", true)
    ]),
    _ctx.isFilter ? (openBlock(), createBlock(_component_mcw_chip_checkmark, {
      key: 0,
      ref: "checkmarkEl"
    }, null, 512)) : createCommentVNode("v-if", true),
    createVNode("span", _hoisted_2$g, [
      createVNode("span", {
        role: _ctx.isFilter ? "checkbox" : "button",
        tabindex: "0",
        class: "mdc-chip__primary-action"
      }, [
        createVNode("span", _hoisted_3$c, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 8, ["role"])
    ]),
    renderSlot(_ctx.$slots, "trailing-icon", {}, () => [
      _ctx.havetrailingIcon ? (openBlock(), createBlock("span", _hoisted_4$9, [
        createVNode(_component_mcw_chip_trailing_action, { ref: "trailingAction" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.trailingIcon), 1)
          ]),
          _: 1
        }, 512)
      ])) : createCommentVNode("v-if", true)
    ])
  ], 16);
}

script$C.render = render$C;
script$C.__file = "src/chips/chip.vue";

const { strings: strings$c } = MDCChipTrailingActionFoundation;
var script$B = {
  name: "mcw-chip-trailing-action",
  setup() {
    const root = ref();
    let foundation;
    const { classes, styles } = useRipplePlugin(root);
    const adapter = {
      focus: () => {
        root.value.focus();
      },
      getAttribute: (attribute) => root.value.getAttribute(attribute),
      notifyInteraction: (trigger) => emitCustomEvent(root.value, strings$c.INTERACTION_EVENT, {
        trigger
      }, true),
      notifyNavigation: (key) => emitCustomEvent(root.value, strings$c.NAVIGATION_EVENT, {
        key
      }, true),
      setAttribute: (attribute, value) => {
        root.value.setAttribute(attribute, value);
      }
    };
    const onClick = (event_) => foundation.handleClick(event_);
    const onKeydown = (event_) => foundation.handleKeydown(event_);
    const isNavigable = () => foundation.isNavigable();
    const focus = () => foundation.focus();
    const removeFocus = () => foundation.removeFocus();
    onMounted(() => {
      foundation = new MDCChipTrailingActionFoundation(adapter);
      foundation.init();
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      root,
      styles,
      classes,
      onClick,
      onKeydown,
      isNavigable,
      focus,
      removeFocus
    };
  }
};

const _hoisted_1$j = /* @__PURE__ */ createVNode("span", { class: "mdc-chip-trailing-action__ripple" }, null, -1);
const _hoisted_2$f = { class: "mdc-chip-trailing-action__icon material-icons" };
function render$B(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("button", {
    ref: "root",
    class: [_ctx.classes, "mdc-chip-trailing-action"],
    style: _ctx.styles,
    "aria-label": "Remove chip",
    tabindex: "-1",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
    onKeydown: _cache[2] || (_cache[2] = (...args) => _ctx.onKeydown && _ctx.onKeydown(...args))
  }, [
    _hoisted_1$j,
    createVNode("span", _hoisted_2$f, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 38);
}

script$B.render = render$B;
script$B.__file = "src/chips/trailing-action.vue";

var chips = BasePlugin({
  mcwChip: script$C,
  mcwChipSet: script$D,
  mcwChipCheckmark: script$E,
  mcwChipTrailingAction: script$B
});

const ProgressPropertyType = {
  type: [Number, String],
  validator(value) {
    return Number(value) >= 0 && Number(value) <= 1;
  }
};
var script$A = {
  name: "mcw-circular-progress",
  props: {
    open: { type: Boolean, default: true },
    indeterminate: Boolean,
    medium: Boolean,
    progress: ProgressPropertyType,
    tag: { type: String, default: "div" }
  },
  setup(props) {
    const uiState = reactive({
      classes: {
        "mdc-circular-progress": 1,
        "mdc-circular-progress--medium": props.medium,
        "mdc-circular-progress--large": !props.medium
      },
      rootAttrs: !props.medium ? { style: { width: "48px", height: "48px" } } : { style: { width: "36px", height: "36px" } },
      circleAttrs: getCircleAttributes(props.medium, false),
      trackAttrs: getTrackAttributes(props.medium),
      indeterminateAttrs: getCircleAttributes(props.medium, true),
      viewbox: props.medium ? "0 0 36 36" : "0 0 48 48",
      root: void 0
    });
    let foundation;
    const adapter = {
      addClass: (className) => {
        uiState.classes = { ...uiState.classes, [className]: true };
      },
      getDeterminateCircleAttribute: (attributeName) => {
        return uiState.circleAttrs[attributeName];
      },
      hasClass: (className) => uiState.root.classList.contains(className),
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      removeAttribute: (attributeName) => {
        const { [attributeName]: removed, ...rest } = uiState.rootAttrs;
        uiState.rootAttrs = rest;
      },
      setAttribute: (attributeName, value) => {
        uiState.rootAttrs = { ...uiState.rootAttrs, [attributeName]: value };
      },
      setDeterminateCircleAttribute: (attributeName, value) => uiState.circleAttrs = {
        ...uiState.circleAttrs,
        [attributeName]: value
      }
    };
    watch(() => props.open, (nv) => {
      if (nv) {
        foundation.open();
      } else {
        foundation.close();
      }
    });
    watch(() => props.progress, (nv) => {
      foundation.setProgress(Number(nv));
    });
    watch(() => props.indeterminate, (nv) => {
      foundation.setDeterminate(!nv);
    });
    onMounted(() => {
      foundation = new MDCCircularProgressFoundation(adapter);
      foundation.init();
      foundation.setProgress(Number(props.progress));
      foundation.setDeterminate(!props.indeterminate);
      if (props.open) {
        foundation.open();
      } else {
        foundation.close();
      }
    });
    onBeforeUnmount(() => foundation.destroy());
    return { ...toRefs(uiState) };
  }
};
function getCircleAttributes(medium = false, indeterminate = true) {
  return medium ? {
    cx: "16",
    cy: "16",
    r: "12.5",
    "stroke-dasharray": "78.54",
    "stroke-dashoffset": indeterminate ? "39.27" : "78.54",
    "stroke-width": "3"
  } : {
    cx: "24",
    cy: "24",
    r: "18",
    "stroke-dasharray": "113.097",
    "stroke-dashoffset": indeterminate ? "56.549" : "113.097",
    "stroke-width": "4"
  };
}
function getTrackAttributes(medium = false) {
  const {
    ["stroke-dasharray"]: sda,
    ["stroke-dashoffset"]: sdo,
    ...rest
  } = getCircleAttributes(medium);
  return rest;
}

const _hoisted_1$i = { class: "mdc-circular-progress__determinate-container" };
const _hoisted_2$e = { class: "mdc-circular-progress__indeterminate-container" };
const _hoisted_3$b = { class: "mdc-circular-progress__spinner-layer" };
const _hoisted_4$8 = { class: "mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left" };
const _hoisted_5$7 = { class: "mdc-circular-progress__gap-patch" };
const _hoisted_6$4 = { class: "mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right" };
function render$A(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Fragment, null, [
    createCommentVNode("must be no space between divs"),
    createCommentVNode(" prettier-ignore "),
    createVNode("div", mergeProps({
      ref: "root",
      class: _ctx.classes,
      role: "progressbar"
    }, _ctx.rootAttrs), [
      createVNode("div", _hoisted_1$i, [
        (openBlock(), createBlock("svg", {
          class: "mdc-circular-progress__determinate-circle-graphic",
          viewBox: _ctx.viewbox,
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          createVNode("circle", mergeProps({ class: "mdc-circular-progress__determinate-track" }, _ctx.trackAttrs), null, 16),
          createVNode("circle", mergeProps({ class: "mdc-circular-progress__determinate-circle" }, _ctx.circleAttrs), null, 16)
        ], 8, ["viewBox"]))
      ]),
      createVNode("div", _hoisted_2$e, [
        createVNode("div", _hoisted_3$b, [
          createVNode("div", _hoisted_4$8, [
            (openBlock(), createBlock("svg", {
              class: "mdc-circular-progress__indeterminate-circle-graphic",
              viewBox: _ctx.viewbox,
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              createVNode("circle", _ctx.indeterminateAttrs, null, 16)
            ], 8, ["viewBox"])),
            createCommentVNode("must be no space between divs")
          ]),
          createVNode("div", _hoisted_5$7, [
            (openBlock(), createBlock("svg", {
              class: "mdc-circular-progress__indeterminate-circle-graphic",
              viewBox: _ctx.viewbox,
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              createVNode("circle", _ctx.indeterminateAttrs, null, 16)
            ], 8, ["viewBox"]))
          ]),
          createVNode("div", _hoisted_6$4, [
            (openBlock(), createBlock("svg", {
              class: "mdc-circular-progress__indeterminate-circle-graphic",
              viewBox: _ctx.viewbox,
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              createVNode("circle", _ctx.indeterminateAttrs, null, 16)
            ], 8, ["viewBox"]))
          ])
        ])
      ])
    ], 16)
  ], 2112);
}

script$A.render = render$A;
script$A.__file = "src/circular-progress/circular-progress.vue";

var circularProgress = BasePlugin({
  mcwCircularProgress: script$A
});

class CheckboxAdapter {
  constructor(mcwCheckbox) {
    this.checkbox = mcwCheckbox;
  }
  get checked() {
    return this.checkbox.isChecked();
  }
  set checked(checked) {
    this.checkbox.setChecked(checked);
  }
  get indeterminate() {
    return this.checkbox.isIndeterminate();
  }
  set indeterminate(indeterminate) {
    this.checkbox.setIndeterminate(indeterminate);
  }
  destroy() {
  }
}

const checkboxFactory = (element) => {
  return element.__vue__ ? new CheckboxAdapter(element.__vue__) : new MDCCheckbox(element);
};
var script$z = {
  name: "mcw-data-table",
  props: { sticky: { type: Boolean } },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: { "mdc-data-table--sticky-header": props.sticky },
      root: void 0
    });
    const { cssClasses, selectors, dataAttributes, SortValue, messages } = test;
    let foundation;
    let headerRow;
    let rowCheckboxList;
    let content;
    let headerRowCheckbox;
    let handleHeaderRowCheckboxChange;
    let handleRowCheckboxChange;
    let headerRowClickListener;
    const getRows = () => {
      return foundation.getRows();
    };
    const layout = () => {
      foundation.layout();
    };
    const getHeaderCells = () => {
      return Array.prototype.slice.call(uiState.root.querySelectorAll(selectors.HEADER_CELL));
    };
    const getRowByIndex_ = (index) => {
      return getRows()[index];
    };
    const getRowIdByIndex_ = (index) => {
      return getRowByIndex_(index).getAttribute(dataAttributes.ROW_ID);
    };
    const getSelectedRowIds = () => {
      return foundation.getSelectedRowIds();
    };
    const getSortStatusMessageBySortValue = (sortValue) => {
      switch (sortValue) {
        case SortValue.ASCENDING:
          return messages.SORTED_IN_ASCENDING;
        case SortValue.DESCENDING:
          return messages.SORTED_IN_DESCENDING;
        default:
          return "";
      }
    };
    const handleHeaderRowClick = (event) => {
      const headerCell = closest(event.target, selectors.HEADER_CELL_WITH_SORT);
      if (!headerCell) {
        return;
      }
      const columnId = headerCell.getAttribute(dataAttributes.COLUMN_ID);
      const columnIndex = getHeaderCells().indexOf(headerCell);
      if (columnIndex === -1) {
        return;
      }
      foundation.handleSortAction({ columnId, columnIndex, headerCell });
    };
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      getHeaderCellElements: () => getHeaderCells(),
      getHeaderCellCount: () => getHeaderCells().length,
      getAttributeByHeaderCellIndex: (index, attribute) => {
        return getHeaderCells()[index].getAttribute(attribute);
      },
      setAttributeByHeaderCellIndex: (index, attribute, value) => {
        getHeaderCells()[index].setAttribute(attribute, value);
      },
      setClassNameByHeaderCellIndex: (index, className) => {
        getHeaderCells()[index].classList.add(className);
      },
      removeClassNameByHeaderCellIndex: (index, className) => {
        getHeaderCells()[index].classList.remove(className);
      },
      notifySortAction: (data) => {
        emit("mdc-data-table:sorted", {
          data
        }, true);
      },
      getTableContainerHeight: () => {
        const tableContainer = uiState.root.querySelector`.${cssClasses.CONTAINER}`;
        if (!tableContainer) {
          throw new Error("MDCDataTable: Table container element not found.");
        }
        return tableContainer.getBoundingClientRect().height;
      },
      getTableHeaderHeight: () => {
        const tableHeader = uiState.root.querySelector(selectors.HEADER_ROW);
        if (!tableHeader) {
          throw new Error("MDCDataTable: Table header element not found.");
        }
        return tableHeader.getBoundingClientRect().height;
      },
      setProgressIndicatorStyles: (styles) => {
        const progressIndicator = uiState.root.querySelector(selectors.PROGRESS_INDICATOR);
        if (!progressIndicator) {
          throw new Error("MDCDataTable: Progress indicator element not found.");
        }
        Object.assign(progressIndicator.style, styles);
      },
      addClassAtRowIndex: (rowIndex, className) => getRows()[rowIndex].classList.add(className),
      getRowCount: () => getRows().length,
      getRowElements: () => Array.prototype.slice.call(uiState.root.querySelectorAll(selectors.ROW)),
      getRowIdAtIndex: (rowIndex) => getRows()[rowIndex].getAttribute(dataAttributes.ROW_ID),
      getRowIndexByChildElement: (element) => {
        return getRows().indexOf(closest(element, selectors.ROW));
      },
      getSelectedRowCount: () => uiState.root.querySelectorAll(selectors.ROW_SELECTED).length,
      isCheckboxAtRowIndexChecked: (rowIndex) => rowCheckboxList[rowIndex].checked,
      isHeaderRowCheckboxChecked: () => headerRowCheckbox.checked,
      isRowsSelectable: () => !!uiState.root.querySelector(selectors.ROW_CHECKBOX),
      notifyRowSelectionChanged: (data) => {
        emit("mdcdatatable:rowselectionchanged", {
          row: getRowByIndex_(data.rowIndex),
          rowId: getRowIdByIndex_(data.rowIndex),
          rowIndex: data.rowIndex,
          selected: data.selected
        });
      },
      notifySelectedAll: () => emit("mdcdatatable:selectedall", {}),
      notifyUnselectedAll: () => emit("mdcdatatable:unselectedall", {}),
      registerHeaderRowCheckbox: () => {
        headerRowCheckbox == null ? void 0 : headerRowCheckbox.destroy();
        const checkboxElement = uiState.root.querySelector(selectors.HEADER_ROW_CHECKBOX);
        headerRowCheckbox = checkboxFactory(checkboxElement);
      },
      registerRowCheckboxes: () => {
        if (rowCheckboxList) {
          for (const checkbox of rowCheckboxList)
            checkbox.destroy();
        }
        rowCheckboxList = [];
        for (const rowElement of getRows()) {
          const element = rowElement.querySelector(selectors.ROW_CHECKBOX);
          const checkbox = checkboxFactory(element);
          rowCheckboxList.push(checkbox);
        }
      },
      removeClassAtRowIndex: (rowIndex, className) => {
        getRows()[rowIndex].classList.remove(className);
      },
      setAttributeAtRowIndex: (rowIndex, attribute, value) => {
        getRows()[rowIndex].setAttribute(attribute, value);
      },
      setHeaderRowCheckboxChecked: (checked) => headerRowCheckbox.checked = checked,
      setHeaderRowCheckboxIndeterminate: (indeterminate) => headerRowCheckbox.indeterminate = indeterminate,
      setRowCheckboxCheckedAtIndex: (rowIndex, checked) => rowCheckboxList[rowIndex].checked = checked,
      setSortStatusLabelByHeaderCellIndex: (columnIndex, sortValue) => {
        const headerCell = getHeaderCells()[columnIndex];
        const sortStatusLabel = headerCell.querySelector(selectors.SORT_STATUS_LABEL);
        if (!sortStatusLabel) {
          return;
        }
        sortStatusLabel.textContent = getSortStatusMessageBySortValue(sortValue);
      }
    };
    onMounted(() => {
      headerRow = uiState.root.querySelector(`.${cssClasses.HEADER_ROW}`);
      handleHeaderRowCheckboxChange = () => foundation.handleHeaderRowCheckboxChange();
      headerRow.addEventListener("mdccheckbox:change", handleHeaderRowCheckboxChange);
      headerRowClickListener = (event) => {
        handleHeaderRowClick(event);
      };
      headerRow.addEventListener("click", headerRowClickListener);
      content = uiState.root.querySelector(`.${cssClasses.CONTENT}`);
      handleRowCheckboxChange = (event) => foundation.handleRowCheckboxChange(event);
      content.addEventListener("mdccheckbox:change", handleRowCheckboxChange);
      foundation = new MDCDataTableFoundation(adapter);
      foundation.init();
      layout();
    });
    onBeforeUnmount(() => {
      var _a, _b;
      headerRow.removeEventListener("mdccheckbox:change", handleHeaderRowCheckboxChange);
      headerRow.removeEventListener("click", headerRowClickListener);
      content.removeEventListener("mdccheckbox:change", handleRowCheckboxChange);
      (_a = headerRowCheckbox == null ? void 0 : headerRowCheckbox.destroy) == null ? void 0 : _a.call(headerRowCheckbox);
      if (rowCheckboxList) {
        for (const checkbox of rowCheckboxList) {
          (_b = checkbox.destroy) == null ? void 0 : _b.call(checkbox);
        }
      }
      foundation.destroy();
    });
    return { ...toRefs(uiState), getSelectedRowIds, layout };
  }
};

const _hoisted_1$h = { class: "mdc-data-table__table-container" };
function render$z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    ref: "root",
    class: [_ctx.classes, "mdc-data-table"]
  }, [
    createVNode("div", _hoisted_1$h, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 2);
}

script$z.render = render$z;
script$z.__file = "src/data-table/data-table.vue";

var dataTable = BasePlugin({
  mcwDataTable: script$z
});

var mcwDialogButton = {
  name: "mcw-dialog-button",
  props: {
    action: String,
    isDefault: Boolean,
    isInitialFocus: Boolean
  },
  setup(props, { attrs, slots }) {
    return () => {
      return h(resolveComponent("mcw-button"), {
        ...attrs,
        class: ["mdc-button", "mdc-dialog__button"],
        "data-mdc-dialog-action": props.action,
        "data-mdc-dialog-button-default": props.isDefault,
        "data-mdc-dialog-initial-focus": props.isInitialFocus
      }, { default: () => {
        var _a;
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      } });
    };
  }
};

var mcwDialogContent = {
  name: "mcw-dialog-content",
  props: {
    tag: {
      type: String,
      default() {
        return "div";
      }
    }
  },
  setup(props, { slots }) {
    return () => {
      var _a;
      return h(props.tag, {
        class: ["mdc-dialog__content"]
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};

var mcwDialogFooter = {
  name: "mcw-dialog-footer",
  props: {
    tag: {
      type: String,
      default() {
        return "div";
      }
    }
  },
  setup(props, { slots }) {
    return () => {
      var _a;
      return h(props.tag, {
        class: ["mdc-dialog__actions"]
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};

var mcwDialogTitle = {
  name: "mcw-dialog-title",
  props: {
    tag: {
      type: String,
      default() {
        return "h2";
      }
    }
  },
  setup(props, { slots }) {
    return () => {
      var _a;
      return h(props.tag, {
        class: ["mdc-dialog__title"]
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};

const { cssClasses: cssClasses$7, strings: strings$b } = MDCDialogFoundation;
const LAYOUT_EVENTS = ["resize", "orientationchange"];
const getInitialFocusElement_ = () => {
  return document.querySelector(`[${strings$b.INITIAL_FOCUS_ATTRIBUTE}]`);
};
const focusTrapFactory_$1 = (element, options) => new FocusTrap(element, options);
var script$y = {
  name: "mcw-dialog",
  components: {
    mcwButton: script$H
  },
  props: {
    autoStackButtons: Boolean,
    escapeKeyAction: String,
    scrollable: Boolean,
    modelValue: Boolean,
    role: String,
    scrimClickAction: { type: String, default: "close" },
    tag: { type: String, default: "div" },
    ariaLabelledby: String,
    ariaDescribedby: String
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: { "mdc-dialog": 1 },
      styles: {},
      container: void 0,
      root: void 0
    });
    let foundation;
    let content_;
    let buttons_;
    let focusTrap;
    let defaultButton;
    const handleLayout = () => {
      foundation.layout();
    };
    const handleDocumentKeyDown = (event_) => {
      foundation.handleDocumentKeydown(event_);
    };
    const onClick = (event_) => {
      foundation.handleClick(event_);
    };
    const onKeydown = (event_) => {
      foundation.handleKeydown(event_);
    };
    const onOpen = (nv) => {
      if (nv) {
        if (uiState.container) {
          focusTrap = util.createFocusTrapInstance(uiState.root, focusTrapFactory_$1, getInitialFocusElement_() || void 0);
        }
        foundation.open();
      } else {
        foundation.close();
      }
    };
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => uiState.root.classList.contains(className),
      addBodyClass: (className) => document.body.classList.add(className),
      removeBodyClass: (className) => document.body.classList.remove(className),
      eventTargetMatches: (target, selector) => matches(target, selector),
      trapFocus: () => focusTrap == null ? void 0 : focusTrap.trapFocus(),
      releaseFocus: () => focusTrap == null ? void 0 : focusTrap.releaseFocus(),
      getInitialFocusEl: () => getInitialFocusElement_(),
      isContentScrollable: () => util.isScrollable(content_),
      areButtonsStacked: () => util.areTopsMisaligned(buttons_),
      getActionFromEvent: (event) => {
        const element = closest(event.target, `[${strings$b.ACTION_ATTRIBUTE}]`);
        return element == null ? void 0 : element.getAttribute(strings$b.ACTION_ATTRIBUTE);
      },
      clickDefaultButton: () => {
        defaultButton == null ? void 0 : defaultButton.click();
      },
      reverseButtons: () => {
        const buttons = buttons_;
        return buttons && buttons.reverse().forEach((button) => {
          var _a;
          return (_a = button.parentElement) == null ? void 0 : _a.appendChild(button);
        });
      },
      notifyOpening: () => {
        emit("mdcdialog:opening", {});
        for (const event_ of LAYOUT_EVENTS)
          window.addEventListener(event_, handleLayout);
        document.addEventListener("keydown", handleDocumentKeyDown);
      },
      notifyOpened: () => emit("mdcdialog:opened", {}),
      notifyClosing: (action) => {
        emit("update:modelValue", false);
        emit("mdcdialog:closing", action ? { action } : {});
        for (const event_ of LAYOUT_EVENTS)
          window.removeEventListener(event_, handleLayout);
        document.removeEventListener("keydown", handleDocumentKeyDown);
      },
      notifyClosed: (action) => {
        emit("mdcdialog:closed", action ? { action } : {});
      }
    };
    watch(() => props.modelValue, (nv) => {
      onOpen(nv);
    });
    onMounted(() => {
      const {
        modelValue,
        autoStackButtons,
        escapeKeyAction,
        scrimClickAction
      } = props;
      buttons_ = Array.prototype.slice.call(uiState.root.querySelectorAll(cssClasses$7.BUTTON));
      defaultButton = uiState.root.querySelector(`[${strings$b.BUTTON_DEFAULT_ATTRIBUTE}]`);
      const container = uiState.root.querySelector(strings$b.CONTAINER_SELECTOR);
      if (!container) {
        throw new Error(`Dialog component requires a ${strings$b.CONTAINER_SELECTOR} container element`);
      }
      content_ = uiState.root.querySelector(strings$b.CONTENT_SELECTOR);
      foundation = new MDCDialogFoundation(adapter);
      foundation.init();
      if (!autoStackButtons) {
        foundation.setAutoStackButtons(autoStackButtons);
      }
      if (typeof escapeKeyAction === "string") {
        foundation.setEscapeKeyAction(escapeKeyAction);
      }
      if (typeof scrimClickAction === "string") {
        foundation.setScrimClickAction(scrimClickAction);
      }
      onOpen(modelValue);
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      handleLayout,
      handleDocumentKeyDown,
      onKeydown,
      onClick
    };
  }
};

const _hoisted_1$g = {
  ref: "container",
  class: "mdc-dialog__container"
};
const _hoisted_2$d = /* @__PURE__ */ createVNode("div", { class: "mdc-dialog__scrim" }, null, -1);
function render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    ref: "root",
    class: _ctx.classes,
    style: _ctx.styles,
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
    onKeydown: _cache[2] || (_cache[2] = (...args) => _ctx.onKeydown && _ctx.onKeydown(...args))
  }, [
    createVNode("div", _hoisted_1$g, [
      createVNode("div", {
        ref: "surface",
        class: "mdc-dialog__surface",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-describedby": _ctx.ariaDescribedby
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["aria-labelledby", "aria-describedby"])
    ], 512),
    _hoisted_2$d
  ], 38);
}

script$y.render = render$y;
script$y.__file = "src/dialog/dialog.vue";

var dialog = BasePlugin({
  mcwDialog: script$y,
  mcwDialogTitle,
  mcwDialogFooter,
  mcwDialogButton,
  mcwDialogContent
});

const { strings: strings$a, cssClasses: cssClasses$6 } = MDCDismissibleDrawerFoundation;
const focusTrapFactory_ = (element, options) => new FocusTrap(element, options);
var script$x = {
  name: "mcw-drawer",
  props: {
    modelValue: Boolean,
    modal: Boolean,
    dismissible: Boolean,
    toolbarSpacer: Boolean
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {
        "mdc-drawer": 1,
        "mdc-drawer--modal": props.modal,
        "mdc-drawer--dismissible": props.dismissible && !props.modal
      },
      drawer: void 0
    });
    const show = () => foundation.open();
    const close = () => foundation.close();
    const toggle = () => foundation.isOpen() ? foundation.close() : foundation.open();
    const isOpen = () => foundation.isOpen();
    let foundation;
    let focusTrap_;
    let previousFocus_;
    const handleScrimClick = () => foundation.handleScrimClick();
    const handleKeydown = (event_) => foundation.handleKeydown(event_);
    const handleTransitionEnd = (event_) => foundation.handleTransitionEnd(event_);
    const onChange = (event) => {
      emit("update:modelValue", event);
    };
    const onListAction = () => props.modal && close();
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => !!uiState.classes[className],
      elementHasClass: (element, className) => element.classList.contains(className),
      saveFocus: () => {
        previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        const previousFocus = previousFocus_ == null ? void 0 : previousFocus_.focus;
        if (previousFocus && uiState.drawer.contains(document.activeElement)) {
          previousFocus_.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const activeNavItemElement = uiState.drawer.querySelector(`.${MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS}`);
        if (activeNavItemElement) {
          activeNavItemElement.focus();
        }
      },
      notifyClose: () => {
        emitCustomEvent(uiState.drawer, strings$a.CLOSE_EVENT, {}, true);
        emit("update:modelValue", false);
        emit("close");
      },
      notifyOpen: () => {
        emitCustomEvent(uiState.drawer, strings$a.OPEN_EVENT, {}, true);
        emit("update:modelValue", true);
        emit("open");
      },
      trapFocus: () => focusTrap_.trapFocus(),
      releaseFocus: () => focusTrap_.releaseFocus()
    };
    watch(() => props.modelValue, (nv) => {
      if (nv) {
        foundation == null ? void 0 : foundation.open();
      } else {
        foundation == null ? void 0 : foundation.close();
      }
    });
    onMounted(() => {
      const { DISMISSIBLE, MODAL } = cssClasses$6;
      if (props.dismissible) {
        foundation = new MDCDismissibleDrawerFoundation(adapter);
      } else if (props.modal) {
        foundation = new MDCModalDrawerFoundation(adapter);
      } else {
        throw new Error(`mcwDrawer: Failed to instantiate component. Supported variants are ${DISMISSIBLE} and ${MODAL}.`);
      }
      foundation.init();
      if (props.modal) {
        focusTrap_ = util$1.createFocusTrapInstance(uiState.drawer, focusTrapFactory_);
      }
    });
    onBeforeUnmount(() => {
      foundation.close();
      foundation.destroy();
      foundation = void 0;
    });
    return {
      ...toRefs(uiState),
      onChange,
      show,
      close,
      toggle,
      isOpen,
      onListAction,
      handleScrimClick,
      handleKeydown,
      handleTransitionEnd
    };
  }
};

const _hoisted_1$f = { class: "mdc-drawer__content" };
const _hoisted_2$c = {
  key: 1,
  class: "drawer-wrapper"
};
const _hoisted_3$a = { class: "mdc-drawer__content" };
function render$x(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mcw_list = resolveComponent("mcw-list");
  return openBlock(), createBlock(Fragment, null, [
    createCommentVNode(' <div ref="root"> '),
    !_ctx.modal ? (openBlock(), createBlock("aside", {
      key: 0,
      ref: "drawer",
      class: _ctx.classes,
      onKeydown: _cache[1] || (_cache[1] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args)),
      onTransitionend: _cache[2] || (_cache[2] = (...args) => _ctx.handleTransitionEnd && _ctx.handleTransitionEnd(...args))
    }, [
      renderSlot(_ctx.$slots, "header"),
      createVNode("div", _hoisted_1$f, [
        createVNode(_component_mcw_list, {
          "wrap-focus": true,
          tag: "nav",
          "onMdclist:action": _ctx.onListAction,
          "single-selection": "",
          "selected-index": 0
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["onMdclist:action"])
      ])
    ], 34)) : (openBlock(), createBlock("div", _hoisted_2$c, [
      createVNode("aside", {
        ref: "drawer",
        class: _ctx.classes,
        onKeydown: _cache[3] || (_cache[3] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args)),
        onTransitionend: _cache[4] || (_cache[4] = (...args) => _ctx.handleTransitionEnd && _ctx.handleTransitionEnd(...args))
      }, [
        renderSlot(_ctx.$slots, "header"),
        createVNode("div", _hoisted_3$a, [
          createVNode(_component_mcw_list, {
            "wrap-focus": true,
            tag: "nav",
            "single-selection": "",
            "selected-index": 0,
            "onMdclist:action": _ctx.onListAction
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["onMdclist:action"])
        ])
      ], 34),
      _ctx.modal ? (openBlock(), createBlock("div", {
        key: 0,
        class: "mdc-drawer-scrim",
        onClick: _cache[5] || (_cache[5] = (...args) => _ctx.handleScrimClick && _ctx.handleScrimClick(...args))
      })) : createCommentVNode("v-if", true)
    ]))
  ], 2112);
}

script$x.render = render$x;
script$x.__file = "src/drawer/drawer.vue";

var drawer = BasePlugin({
  mcwDrawer: script$x
});

var script$w = {
  name: "mcw-fab",
  props: {
    icon: String,
    mini: Boolean,
    exited: Boolean,
    label: String
  },
  components: { CustomLink },
  setup(props, { slots }) {
    const root = ref();
    const uiState = reactive({
      classes: {
        "mdc-fab": 1,
        "mdc-fab--mini": props.mini,
        "mdc-fab--extended": props.label || slots.default,
        "mdc-fab--exited": props.exited
      }
    });
    const { classes: rippleClasses, styles } = useRipplePlugin(root);
    const classes = computed(() => {
      return { ...rippleClasses.value, ...uiState.classes };
    });
    watch(() => props.icon, (nv) => {
      uiState.classes = { ...uiState.classes, "material-icons": nv };
    });
    watch(() => props.mini, (nv) => {
      uiState.classes = { ...uiState.classes, "mdc-fab--mini": nv };
    });
    watch(() => props.exited, (nv) => {
      uiState.classes = { ...uiState.classes, "mdc-fab--exited": nv };
    });
    return { ...toRefs(uiState), classes, root, styles };
  }
};

const _hoisted_1$e = /* @__PURE__ */ createVNode("div", { class: "mdc-fab__ripple" }, null, -1);
const _hoisted_2$b = { class: "mdc-fab__icon material-icons" };
const _hoisted_3$9 = { class: "mdc-fab__label" };
function render$w(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_custom_link = resolveComponent("custom-link");
  return openBlock(), createBlock(_component_custom_link, {
    ref: "root",
    class: _ctx.classes,
    style: _ctx.styles,
    tag: "button"
  }, {
    default: withCtx(() => [
      _hoisted_1$e,
      renderSlot(_ctx.$slots, "icon", {}, () => [
        createVNode("span", _hoisted_2$b, toDisplayString(_ctx.icon), 1)
      ]),
      createVNode("span", _hoisted_3$9, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ])
      ])
    ]),
    _: 3
  }, 8, ["class", "style"]);
}

script$w.render = render$w;
script$w.__file = "src/fab/fab.vue";

var fab = BasePlugin({
  mcwFAB: script$w
});

var script$v = {
  name: "mcw-floating-label",
  props: { required: { type: Boolean } },
  setup(props) {
    const uiState = reactive({
      labelClasses: {
        "mdc-floating-label": true,
        "mdc-floating-label--required": props.required
      },
      root: void 0
    });
    let foundation;
    const adapter = {
      addClass: (className) => uiState.labelClasses = {
        ...uiState.labelClasses,
        [className]: true
      },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.labelClasses;
        uiState.labelClasses = rest;
      },
      getWidth: () => uiState.root.scrollWidth,
      registerInteractionHandler: (eventType, handler) => {
        uiState.root.addEventListener(eventType, handler);
      },
      deregisterInteractionHandler: (eventType, handler) => {
        uiState.root.removeEventListener(eventType, handler);
      }
    };
    const getWidth = () => {
      return foundation.getWidth();
    };
    const setRequired = (isRequired) => {
      return foundation.setRequired(isRequired);
    };
    const float = (shouldFloat) => {
      foundation.float(shouldFloat);
    };
    const shake = (shouldShake) => {
      foundation.shake(shouldShake);
    };
    onMounted(() => {
      foundation = new MDCFloatingLabelFoundation(adapter);
      foundation.init();
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      getWidth,
      float,
      shake,
      setRequired
    };
  }
};

function render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("span", {
    ref: "root",
    class: _ctx.labelClasses
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}

script$v.render = render$v;
script$v.__file = "src/floating-label/floating-label.vue";

var floatingLabel = BasePlugin({
  mcwFloatingLabel: script$v
});

var script$u = {
  name: "mcw-icon-button",
  props: {
    modelValue: Boolean,
    disabled: Boolean
  },
  setup(props, { emit, attrs }) {
    const uiState = reactive({
      classes: {
        "mdc-icon-button": 1,
        "material-icons": 1
      }
    });
    const root = ref();
    const { CHANGE_EVENT } = MDCIconButtonToggleFoundation.strings;
    const { classes: rippleClasses, styles } = useRipplePlugin(root, {
      isUnbounded: () => true
    });
    let foundation;
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => Boolean(uiState.classes[className]),
      setAttr: (attributeName, attributeValue) => root.value.setAttribute(attributeName, attributeValue),
      getAttr: (attributeName) => root.value.getAttribute(attributeName),
      notifyChange: (eventData) => {
        emit(CHANGE_EVENT, eventData);
        emit("update:modelValue", eventData.isOn);
      }
    };
    const classes = computed(() => {
      return {
        ...rippleClasses.value,
        ...uiState.classes
      };
    });
    watch(() => props.modelValue, (nv) => {
      foundation.toggle(nv);
    });
    const tag = computed(() => {
      const isLink = Boolean(attrs.href);
      return isLink ? "a" : "button";
    });
    const onClick = (event_) => foundation.handleClick(event_);
    onMounted(() => {
      foundation = new MDCIconButtonToggleFoundation(adapter);
      foundation.init();
      foundation.toggle(props.modelValue);
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return { ...toRefs(uiState), classes, styles, root, tag, onClick };
  }
};

function render$u(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: _ctx.classes,
    style: _ctx.styles,
    ref: "root",
    onClick: _ctx.onClick,
    "aria-pressed": "false",
    disabled: _ctx.disabled
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "style", "onClick", "disabled"]);
}

script$u.render = render$u;
script$u.__file = "src/icon-button/icon-button.vue";

var mcwIconToggle = {
  name: "mcw-icon-toggle",
  props: {
    isOn: Boolean
  },
  setup(props, { slots }) {
    return () => {
      var _a;
      return h("i", {
        class: {
          "material-icons": 1,
          "mdc-icon-button__icon": true,
          "mdc-icon-button__icon--on": props.isOn
        }
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};

var iconButton = BasePlugin({
  mcwIconButton: script$u,
  mcwIconToggle
});

const spanOptions_ = {
  type: [String, Number],
  default: void 0,
  validator: (value) => {
    const number = Number(value);
    return Number.isFinite(number) && number <= 12 && number > 0;
  }
};
var script$t = {
  name: "mcw-layout-cell",
  props: {
    span: spanOptions_,
    order: spanOptions_,
    phone: spanOptions_,
    tablet: spanOptions_,
    desktop: spanOptions_,
    align: {
      type: String,
      validator: (value) => ["top", "bottom", "middle"].includes(value)
    }
  },
  setup(props) {
    const classes = computed(() => {
      const cssClasses = [];
      if (props.span) {
        cssClasses.push(`mdc-layout-grid__cell--span-${props.span}`);
      }
      if (props.order) {
        cssClasses.push(`mdc-layout-grid__cell--order-${props.order}`);
      }
      if (props.phone) {
        cssClasses.push(`mdc-layout-grid__cell--span-${props.phone}-phone`);
      }
      if (props.tablet) {
        cssClasses.push(`mdc-layout-grid__cell--span-${props.tablet}-tablet`);
      }
      if (props.desktop) {
        cssClasses.push(`mdc-layout-grid__cell--span-${props.desktop}-desktop`);
      }
      if (props.align) {
        cssClasses.push(`mdc-layout-grid__cell--align-${props.align}`);
      }
      return cssClasses;
    });
    return { classes };
  }
};

function render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    class: [_ctx.classes, "mdc-layout-cell mdc-layout-grid__cell"]
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}

script$t.render = render$t;
script$t.__file = "src/layout-grid/layout-cell.vue";

var script$s = {
  name: "mcw-layout-grid",
  props: {
    fixedColumWidth: Boolean,
    alignLeft: Boolean,
    alignRight: Boolean
  },
  setup(props) {
    const classes = computed(() => {
      return {
        "mdc-layout-grid": true,
        "mdc-layout-grid--fixed-column-width": props.fixedColumnWidth,
        "mdc-layout-grid--align-left": props.alignLeft,
        "mdc-layout-grid--align-right": props.alignRight
      };
    });
    return { classes };
  }
};

const _hoisted_1$d = { class: "mdc-layout-grid__inner" };
function render$s(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", { class: _ctx.classes }, [
    createVNode("div", _hoisted_1$d, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 2);
}

script$s.render = render$s;
script$s.__file = "src/layout-grid/layout-grid.vue";

var script$r = {
  name: "mcw-layout-inner-grid"
};

const _hoisted_1$c = { class: "mdc-layout-inner-grid mdc-layout-grid__inner" };
function render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$c, [
    renderSlot(_ctx.$slots, "default")
  ]);
}

script$r.render = render$r;
script$r.__file = "src/layout-grid/layout-inner-grid.vue";

var layoutGrid = BasePlugin({
  mcwLayoutGrid: script$s,
  mcwLayoutCell: script$t,
  mcwLayoutInnerGrid: script$r
});

var script$q = {
  name: "mcw-line-ripple",
  setup() {
    const uiState = reactive({
      lineClasses: { "mdc-line-ripple": 1 },
      lineStyles: {}
    });
    let foundation_;
    const adapter = {
      addClass: (className) => uiState.lineClasses = {
        ...uiState.lineClasses,
        [className]: true
      },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.lineClasses;
        uiState.lineClasses = rest;
      },
      hasClass: (className) => {
        return Boolean(uiState.lineClasses[className]);
      },
      setStyle: (name, value) => uiState.lineStyles = {
        ...uiState.lineStyles,
        [name]: value
      }
    };
    const setRippleCenter = (xCoordinate) => {
      foundation_.setRippleCenter(xCoordinate);
    };
    const activate = () => {
      foundation_.activate();
    };
    const deactivate = () => {
      foundation_.deactivate();
    };
    const onTransitionEnd = (event_) => foundation_.handleTransitionEnd(event_);
    onMounted(() => {
      foundation_ = new MDCLineRippleFoundation(adapter);
      foundation_.init();
    });
    onBeforeUnmount(() => {
      foundation_.destroy();
    });
    return {
      ...toRefs(uiState),
      setRippleCenter,
      activate,
      deactivate,
      onTransitionEnd
    };
  }
};

function render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("span", {
    class: _ctx.lineClasses,
    style: _ctx.lineStyles,
    onTransitionend: _cache[1] || (_cache[1] = (...args) => _ctx.onTransitionEnd && _ctx.onTransitionEnd(...args))
  }, null, 38);
}

script$q.render = render$q;
script$q.__file = "src/line-ripple/line-ripple.vue";

var lineRipple = BasePlugin({
  mcwLineRipple: script$q
});

const progressPropertyType_ = {
  type: [Number, String],
  validator(value) {
    return Number(value) >= 0 && Number(value) <= 1;
  }
};
var script$p = {
  name: "mcw-linear-progress",
  props: {
    open: { type: Boolean, default: true },
    indeterminate: Boolean,
    progress: progressPropertyType_,
    buffer: progressPropertyType_,
    bufferingDots: { type: Boolean, default: true },
    tag: { type: String, default: "div" }
  },
  setup(props) {
    const uiState = reactive({
      classes: {
        "mdc-linear-progress": 1
      },
      bufferbarStyles: {},
      primaryStyles: {},
      rootAttrs: { "aria-valuemin": 0, "aria-valuemax": 1 },
      rootStyles: {},
      root: void 0
    });
    let foundation;
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      forceLayout: () => uiState.root.offsetWidth,
      setBufferBarStyle: (styleProperty, value) => uiState.bufferbarStyles = {
        ...uiState.bufferbarStyles,
        [styleProperty]: value
      },
      setPrimaryBarStyle: (styleProperty, value) => uiState.primaryStyles = {
        ...uiState.primaryStyles,
        [styleProperty]: value
      },
      hasClass: (className) => uiState.root.classList.contains(className),
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      setAttribute: (attributeName, value) => uiState.rootAttrs = {
        ...uiState.rootAttrs,
        [attributeName]: value
      },
      removeAttribute: (attributeName) => {
        const { [attributeName]: removed, ...rest } = uiState.rootAttrs;
        uiState.rootAttrs = rest;
      },
      setStyle: (name, value) => {
        uiState.rootStyles = {
          ...uiState.rootStyles,
          [name]: value
        };
      },
      attachResizeObserver: (callback) => {
        if (window.ResizeObserver) {
          const ro = new ResizeObserver(callback);
          ro.observe(uiState.root);
          return ro;
        }
        return;
      },
      getWidth: () => uiState.root.offsetWidth
    };
    watch(() => props.open, (nv) => {
      if (nv) {
        foundation.open();
      } else {
        foundation.close();
      }
    });
    watch(() => props.progress, (nv) => {
      foundation.setProgress(Number(nv));
    });
    watch(() => props.buffer, (nv) => {
      foundation.setBuffer(Number(nv));
    });
    watch(() => props.indeterminate, (nv) => {
      foundation.setDeterminate(!nv);
    });
    onMounted(() => {
      foundation = new MDCLinearProgressFoundation(adapter);
      foundation.init();
      foundation.setProgress(Number(props.progress));
      foundation.setBuffer(Number(props.buffer));
      foundation.setDeterminate(!props.indeterminate);
      if (props.open) {
        foundation.open();
      } else {
        foundation.close();
      }
    });
    onBeforeUnmount(() => foundation.destroy());
    return { ...toRefs(uiState) };
  }
};

const _hoisted_1$b = {
  ref: "buffer",
  class: "mdc-linear-progress__buffer"
};
const _hoisted_2$a = /* @__PURE__ */ createVNode("div", { class: "mdc-linear-progress__buffer-dots" }, null, -1);
const _hoisted_3$8 = /* @__PURE__ */ createVNode("span", { class: "mdc-linear-progress__bar-inner" }, null, -1);
const _hoisted_4$7 = {
  ref: "secondary",
  class: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
};
const _hoisted_5$6 = /* @__PURE__ */ createVNode("span", { class: "mdc-linear-progress__bar-inner" }, null, -1);
function render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", mergeProps({
    ref: "root",
    class: _ctx.classes,
    style: _ctx.rootStyles,
    role: "progressbar"
  }, _ctx.rootAttrs), [
    createVNode("div", _hoisted_1$b, [
      createVNode("div", {
        class: "mdc-linear-progress__buffer-bar",
        style: _ctx.bufferbarStyles
      }, null, 4),
      _hoisted_2$a
    ], 512),
    createVNode("div", {
      ref: "primary",
      class: "mdc-linear-progress__bar mdc-linear-progress__primary-bar",
      style: _ctx.primaryStyles
    }, [
      _hoisted_3$8
    ], 4),
    createVNode("div", _hoisted_4$7, [
      _hoisted_5$6
    ], 512)
  ], 16);
}

script$p.render = render$p;
script$p.__file = "src/linear-progress/linear-progress.vue";

var linearProgress = BasePlugin({
  mcwLinearProgress: script$p
});

let itemId = 0;
var script$o = {
  name: "mcw-list-item",
  inheritAttrs: false,
  props: {
    twoLine: String,
    disabled: Boolean,
    icon: [String, Boolean],
    groupIcon: String,
    name: String,
    trailing: Boolean
  },
  components: { CustomLink },
  setup(props, { slots, attrs }) {
    const root = ref();
    const myItemId = itemId++;
    const uiState = reactive({
      classes: {
        "mdc-list-item": 1,
        "mdc-list-item--disabled": props.disabled
      },
      attrs: {}
    });
    if (attrs.class) {
      uiState.classes[attrs.class] = 1;
    }
    const registerListItem = inject("registerListItem");
    const radioChecked = computed(() => {
      return attrs["aria-checked"] == "true";
    });
    const checkbox = computed(() => !props.trailing && attrs.role == "checkbox");
    const radio = computed(() => !props.trailing && attrs.role == "radio");
    const trailingRadio = computed(() => props.trailing && attrs.role == "radio");
    const trailingCheckbox = computed(() => props.trailing && attrs.role == "checkbox");
    const { classes: rippleClasses, styles } = useRipplePlugin(root);
    const isTwoLine = computed(() => {
      return props.twoLine || slots["secondary-text"];
    });
    const groupClasses = computed(() => ({
      "mdc-menu__selection-group-icon": props.groupIcon
    }));
    const needGraphic = computed(() => typeof props.icon == "string" || !!props.groupIcon);
    const listIcon = computed(() => typeof props.icon === "string" && props.icon || props.groupIcon);
    const focus = () => {
      var _a;
      ((_a = root.value.$el) != null ? _a : root.value).focus();
    };
    const myAttributes = computed(() => {
      return {
        ...attrs,
        class: { ...rippleClasses.value, ...uiState.classes },
        style: styles.value,
        ...uiState.attrs
      };
    });
    const addClass = (className) => {
      uiState.classes = { ...uiState.classes, [className]: true };
    };
    const removeClass = (className) => {
      const { [className]: removed, ...rest } = uiState.classes;
      uiState.classes = rest;
    };
    const removeAttribute = (attribute) => {
      const { [attribute]: removed, ...rest } = uiState.attrs;
      uiState.attrs = rest;
    };
    const setAttribute = (attribute, value) => {
      uiState.attrs = { ...uiState.attrs, [attribute]: value };
    };
    const getAttribute = (attribute) => {
      return myAttributes.value[attribute];
    };
    const classList = {
      add: addClass,
      remove: removeClass,
      contains: (className) => !!uiState.classes[className]
    };
    registerListItem({
      itemId: myItemId,
      removeAttribute,
      setAttribute,
      getAttribute,
      classList
    });
    return {
      ...toRefs(uiState),
      focus,
      root,
      isTwoLine,
      needGraphic,
      listIcon,
      groupClasses,
      checkbox,
      radio,
      radioChecked,
      myAttrs: myAttributes,
      trailingRadio,
      trailingCheckbox,
      myItemId
    };
  }
};

const _hoisted_1$a = /* @__PURE__ */ createVNode("span", { class: "mdc-list-item__ripple" }, null, -1);
const _hoisted_2$9 = {
  key: 0,
  class: "material-icons"
};
const _hoisted_3$7 = {
  key: 1,
  class: "mdc-list-item__graphic"
};
const _hoisted_4$6 = /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox" }, [
  /* @__PURE__ */ createVNode("input", {
    type: "checkbox",
    class: "mdc-checkbox__native-control"
  }),
  /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__background" }, [
    /* @__PURE__ */ createVNode("svg", {
      class: "mdc-checkbox__checkmark",
      viewBox: "0 0 24 24"
    }, [
      /* @__PURE__ */ createVNode("path", {
        class: "mdc-checkbox__checkmark-path",
        fill: "none",
        d: "M1.73,12.91 8.1,19.28 22.79,4.59"
      })
    ]),
    /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__mixedmark" })
  ])
], -1);
const _hoisted_5$5 = {
  key: 2,
  class: "mdc-list-item__graphic"
};
const _hoisted_6$3 = { class: "mdc-radio" };
const _hoisted_7$3 = /* @__PURE__ */ createVNode("div", { class: "mdc-radio__background" }, [
  /* @__PURE__ */ createVNode("div", { class: "mdc-radio__outer-circle" }),
  /* @__PURE__ */ createVNode("div", { class: "mdc-radio__inner-circle" })
], -1);
const _hoisted_8$2 = {
  key: 3,
  class: "mdc-list-item__text"
};
const _hoisted_9$1 = { class: "mdc-list-item__primary-text" };
const _hoisted_10$1 = { class: "mdc-list-item__secondary-text" };
const _hoisted_11$1 = {
  key: 4,
  class: "mdc-list-item__text"
};
const _hoisted_12$1 = {
  key: 5,
  class: "mdc-list-item__meta"
};
const _hoisted_13 = { class: "mdc-radio" };
const _hoisted_14 = /* @__PURE__ */ createVNode("div", { class: "mdc-radio__background" }, [
  /* @__PURE__ */ createVNode("div", { class: "mdc-radio__outer-circle" }),
  /* @__PURE__ */ createVNode("div", { class: "mdc-radio__inner-circle" })
], -1);
const _hoisted_15 = {
  key: 6,
  class: "mdc-list-item__meta"
};
const _hoisted_16 = /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox" }, [
  /* @__PURE__ */ createVNode("input", {
    type: "checkbox",
    class: "mdc-checkbox__native-control"
  }),
  /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__background" }, [
    /* @__PURE__ */ createVNode("svg", {
      class: "mdc-checkbox__checkmark",
      viewBox: "0 0 24 24"
    }, [
      /* @__PURE__ */ createVNode("path", {
        class: "mdc-checkbox__checkmark-path",
        fill: "none",
        d: "M1.73,12.91 8.1,19.28 22.79,4.59"
      })
    ]),
    /* @__PURE__ */ createVNode("div", { class: "mdc-checkbox__mixedmark" })
  ])
], -1);
const _hoisted_17 = {
  key: 7,
  class: "mdc-list-item__meta"
};
function render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_custom_link = resolveComponent("custom-link");
  return openBlock(), createBlock(_component_custom_link, mergeProps({ ref: "root" }, _ctx.myAttrs, {
    tag: "a",
    "data-myItemId": _ctx.myItemId
  }), {
    default: withCtx(() => [
      _hoisted_1$a,
      _ctx.needGraphic ? (openBlock(), createBlock("span", {
        key: 0,
        class: ["mdc-list-item__graphic", _ctx.groupClasses]
      }, [
        renderSlot(_ctx.$slots, "graphic", {}, () => [
          _ctx.listIcon ? (openBlock(), createBlock("i", _hoisted_2$9, toDisplayString(_ctx.listIcon), 1)) : createCommentVNode("v-if", true)
        ])
      ], 2)) : _ctx.checkbox ? (openBlock(), createBlock("span", _hoisted_3$7, [
        renderSlot(_ctx.$slots, "graphic", {}, () => [
          _hoisted_4$6
        ])
      ])) : _ctx.radio ? (openBlock(), createBlock("span", _hoisted_5$5, [
        renderSlot(_ctx.$slots, "graphic", {}, () => [
          createVNode("div", _hoisted_6$3, [
            createVNode("input", {
              class: "mdc-radio__native-control",
              type: "radio",
              value: "1",
              name: _ctx.name,
              checked: _ctx.radioChecked
            }, null, 8, ["name", "checked"]),
            _hoisted_7$3
          ])
        ])
      ])) : createCommentVNode("v-if", true),
      _ctx.isTwoLine ? (openBlock(), createBlock("span", _hoisted_8$2, [
        createVNode("span", _hoisted_9$1, [
          renderSlot(_ctx.$slots, "default")
        ]),
        createVNode("span", _hoisted_10$1, [
          renderSlot(_ctx.$slots, "secondary-text", {}, () => [
            createTextVNode(toDisplayString(_ctx.twoLine), 1)
          ])
        ])
      ])) : (openBlock(), createBlock("span", _hoisted_11$1, [
        renderSlot(_ctx.$slots, "default")
      ])),
      _ctx.trailingRadio ? (openBlock(), createBlock("span", _hoisted_12$1, [
        renderSlot(_ctx.$slots, "meta", {}, () => [
          createVNode("div", _hoisted_13, [
            createVNode("input", {
              class: "mdc-radio__native-control",
              type: "radio",
              value: "1",
              name: _ctx.name,
              checked: _ctx.radioChecked
            }, null, 8, ["name", "checked"]),
            _hoisted_14
          ])
        ])
      ])) : _ctx.trailingCheckbox ? (openBlock(), createBlock("span", _hoisted_15, [
        renderSlot(_ctx.$slots, "meta", {}, () => [
          _hoisted_16
        ])
      ])) : _ctx.$slots.meta ? (openBlock(), createBlock("span", _hoisted_17, [
        renderSlot(_ctx.$slots, "meta")
      ])) : createCommentVNode("v-if", true)
    ]),
    _: 3
  }, 16, ["data-myItemId"]);
}

script$o.render = render$o;
script$o.__file = "src/list/list-item.vue";

const { strings: strings$9, cssClasses: cssClasses$5 } = MDCListFoundation;
const getPrimaryText = (item) => {
  const primaryText = item.querySelector(`.${cssClasses$5.LIST_ITEM_PRIMARY_TEXT_CLASS}`);
  if (primaryText) {
    return primaryText.textContent || "";
  }
  const singleLineText = item.querySelector(`.${cssClasses$5.LIST_ITEM_TEXT_CLASS}`);
  return singleLineText && singleLineText.textContent || "";
};
var script$n = {
  name: "mcw-list",
  props: {
    nonInteractive: { type: Boolean, default: false },
    dense: Boolean,
    avatarList: Boolean,
    twoLine: Boolean,
    singleSelection: Boolean,
    wrapFocus: Boolean,
    textualList: Boolean,
    modelValue: { type: [String, Number, Array] },
    tag: { type: String, default: "ul" },
    ariaOrientation: { type: String, default: "vertical" },
    thumbnailList: Boolean,
    iconList: Boolean,
    videoList: Boolean,
    typeAhead: Boolean
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {
        "mdc-list": 1,
        "mdc-list--dense": props.dense,
        "mdc-list--avatar-list": props.avatarList,
        "mdc-list--two-line": props.twoLine,
        "mdc-list--non-interactive": props.nonInteractive,
        "mdc-list--textual-list": props.textualList,
        "mdc-list--icon-list": props.iconList,
        "mdc-list--thumbnail-list": props.thumbnailList,
        "mdc-list--video-list": props.videoList
      },
      rootAttrs: { "aria-orientation": props.ariaOrientation },
      listn: 0,
      listRoot: void 0
    });
    const singleSelection = ref(props.singleSelection);
    let foundation;
    let slotObserver;
    if (singleSelection.value) {
      uiState.rootAttrs.role = "listbox";
    }
    const listItems = ref({});
    const registerListItem = (item) => {
      listItems.value[item.itemId] = item;
    };
    provide("registerListItem", registerListItem);
    const setSingleSelection = (isSingleSelectionList) => {
      singleSelection.value = isSingleSelectionList;
      foundation.setSingleSelection(isSingleSelectionList);
    };
    const setSelectedIndex = (index) => {
      foundation.setSelectedIndex(index);
    };
    const getSelectedIndex = () => foundation.getSelectedIndex();
    const listElements = ref([]);
    const updateListElements = () => {
      const elements = Array.prototype.slice.call(uiState.listRoot.querySelectorAll(`.${cssClasses$5.LIST_ITEM_CLASS}`));
      listElements.value = elements;
    };
    const getListItemByIndex = (index) => {
      const element = listElements.value[index];
      if (element) {
        const myItemId = element.dataset.myitemid;
        return listItems.value[myItemId];
      }
    };
    const getListItemIndex = (event_) => {
      const myItemId = event_.target.dataset.myitemid;
      if (myItemId !== void 0) {
        const lei = listElements.value.findIndex(({ dataset: { myitemid } }) => myitemid === myItemId);
        return lei;
      }
      const eventTarget = event_.target;
      const nearestParent = closest(eventTarget, `.${cssClasses$5.LIST_ITEM_CLASS}, .${cssClasses$5.ROOT}`);
      if (nearestParent && matches(nearestParent, `.${cssClasses$5.LIST_ITEM_CLASS}`)) {
        return listElements.value.indexOf(nearestParent);
      }
      return -1;
    };
    const layout = () => {
      foundation.setVerticalOrientation(props.ariaOrientation == "vertical");
      for (const ele of Array.prototype.slice.call(uiState.listRoot.querySelectorAll(".mdc-list-item:not([tabindex])"))) {
        ele.setAttribute("tabindex", -1);
      }
      for (const ele of Array.prototype.slice.call(uiState.listRoot.querySelectorAll(strings$9.FOCUSABLE_CHILD_ELEMENTS)))
        ele.setAttribute("tabindex", -1);
      foundation.layout();
    };
    const initializeListType = () => {
      const checkboxListItems = uiState.listRoot.querySelectorAll(strings$9.ARIA_ROLE_CHECKBOX_SELECTOR);
      const radioSelectedListItem = uiState.listRoot.querySelector(strings$9.ARIA_CHECKED_RADIO_SELECTOR);
      if (checkboxListItems.length > 0) {
        const preselectedItems = uiState.listRoot.querySelectorAll(strings$9.ARIA_CHECKED_CHECKBOX_SELECTOR);
        setSelectedIndex(Array.prototype.map.call(preselectedItems, (listItem) => listElements.value.indexOf(listItem)));
      } else if (radioSelectedListItem) {
        setSelectedIndex(listElements.value.indexOf(radioSelectedListItem));
      }
    };
    const setEnabled = (itemIndex, isEnabled) => {
      foundation.setEnabled(itemIndex, isEnabled);
    };
    const typeaheadMatchItem = (nextChar, startingIndex) => {
      return foundation.typeaheadMatchItem(nextChar, startingIndex, true);
    };
    const handleFocusInEvent = (event_) => {
      const index = getListItemIndex(event_);
      foundation.handleFocusIn(event_, index);
    };
    const handleFocusOutEvent = (event_) => {
      const index = getListItemIndex(event_);
      foundation.handleFocusOut(event_, index);
    };
    const handleKeydownEvent = (event_) => {
      const index = getListItemIndex(event_);
      const target = event_.target;
      foundation.handleKeydown(event_, target.classList.contains(cssClasses$5.LIST_ITEM_CLASS), index);
    };
    const handleClickEvent = (event_) => {
      const index = getListItemIndex(event_);
      const target = event_.target;
      const toggleCheckbox = !matches(target, strings$9.CHECKBOX_RADIO_SELECTOR);
      foundation.handleClick(index, toggleCheckbox);
    };
    const rootListeners = {
      click: (event) => handleClickEvent(event),
      focusin: (event) => {
        handleFocusInEvent(event);
      },
      focusout: (event) => {
        handleFocusOutEvent(event);
      },
      keydown: (event) => handleKeydownEvent(event)
    };
    const typeaheadInProgress = () => foundation.isTypeaheadInProgress();
    const adapter = {
      addClassForElementIndex: (index, className) => {
        const listItem = getListItemByIndex(index);
        listItem == null ? void 0 : listItem.classList.add(className);
      },
      focusItemAtIndex: (index) => {
        const element = listElements.value[index];
        if (element) {
          element.focus();
        }
      },
      getAttributeForElementIndex: (index, attribute) => {
        const listItem = getListItemByIndex(index);
        return listItem == null ? void 0 : listItem.getAttribute(attribute);
      },
      getFocusedElementIndex: () => listElements.value.indexOf(document.activeElement),
      getListItemCount: () => listElements.value.length,
      getPrimaryTextAtIndex: (index) => getPrimaryText(listElements.value[index]),
      hasCheckboxAtIndex: (index) => {
        const listItem = listElements.value[index];
        return listItem && !!listItem.querySelector(strings$9.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: (index) => {
        const listItem = listElements.value[index];
        return listItem && !!listItem.querySelector(strings$9.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: (index) => {
        const listItem = listElements.value[index];
        const toggleElement = listItem.querySelector(strings$9.CHECKBOX_SELECTOR);
        return toggleElement.checked;
      },
      isFocusInsideList: () => {
        const root = uiState.listRoot;
        return root && root !== document.activeElement && root.contains(document.activeElement);
      },
      isRootFocused: () => document.activeElement === uiState.listRoot,
      listItemAtIndexHasClass: (index, className) => {
        const listItem = getListItemByIndex(index);
        listItem == null ? void 0 : listItem.classList.contains(className);
      },
      notifyAction: (index) => {
        emitCustomEvent(uiState.listRoot, strings$9.ACTION_EVENT, { index }, true);
        if (Array.isArray(props.modelValue)) {
          emit("update:modelValue", foundation.getSelectedIndex());
        } else {
          emit("update:modelValue", index);
        }
      },
      removeClassForElementIndex: (index, className) => {
        const listItem = getListItemByIndex(index);
        listItem == null ? void 0 : listItem.classList.remove(className);
      },
      setAttributeForElementIndex: (index, attribute, value) => {
        const listItem = getListItemByIndex(index);
        listItem == null ? void 0 : listItem.setAttribute(attribute, value);
      },
      setCheckedCheckboxOrRadioAtIndex: (index, isChecked) => {
        const listItem = listElements.value[index];
        const toggleElement = listItem.querySelector(strings$9.CHECKBOX_RADIO_SELECTOR);
        toggleElement && (toggleElement.checked = isChecked);
        const event = document.createEvent("Event");
        event.initEvent("update:modelValue", true, true);
        toggleElement == null ? void 0 : toggleElement.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        var _a;
        const element = listElements.value[listItemIndex];
        const listItemChildren = Array.prototype.slice.call(element.querySelectorAll(strings$9.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        for (const element_ of listItemChildren) {
          const listItem = (_a = listItems.value[element_.dataset.myitemid]) != null ? _a : element_;
          listItem.setAttribute("tabindex", tabIndexValue);
        }
      }
    };
    watch(() => props.modelValue, (nv) => {
      if (Array.isArray(nv)) {
        foundation.setSelectedIndex(nv);
      } else if (props.modelValue != nv) {
        foundation.setSelectedIndex(nv);
      }
    });
    watch(() => props.wrapFocus, (nv) => foundation.setWrapFocus(nv));
    watch(() => props.ariaOrientation, (nv) => foundation.setVerticalOrientation(nv === "vertical"));
    watch(() => props.typeAhead, (nv) => foundation.setHasTypeahead(nv));
    onMounted(() => {
      updateListElements();
      foundation = new MDCListFoundation(adapter);
      foundation.init();
      if (singleSelection.value && typeof props.modelValue === "number" && !Number.isNaN(props.modelValue)) {
        const index = props.modelValue;
        const hasSelectedClass = adapter.listItemAtIndexHasClass(index, cssClasses$5.LIST_ITEM_SELECTED_CLASS);
        const hasActivatedClass = adapter.listItemAtIndexHasClass(index, cssClasses$5.LIST_ITEM_ACTIVATED_CLASS);
        if (!(hasSelectedClass || hasActivatedClass)) {
          adapter.addClassForElementIndex(props.modelValue, "mdc-list-item--selected");
        }
        adapter.setAttributeForElementIndex(index, "tabindex", 0);
        foundation.setSingleSelection(true);
        foundation.setSelectedIndex(index);
      }
      layout();
      initializeListType();
      foundation.setWrapFocus(props.wrapFocus);
      foundation.setVerticalOrientation(props.ariaOrientation === "vertical");
      if (props.typeAhead) {
        foundation.setHasTypeahead(props.typeAhead);
      }
      slotObserver = new MutationObserver(() => {
        updateListElements();
      });
      slotObserver.observe(uiState.listRoot, {
        childList: true
      });
    });
    onBeforeUnmount(() => {
      slotObserver.disconnect();
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      listItems,
      listElements,
      rootListeners,
      layout,
      setEnabled,
      typeaheadMatchItem,
      typeaheadInProgress,
      getSelectedIndex,
      setSelectedIndex,
      getPrimaryText,
      setSingleSelection
    };
  }
};

function render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
    ref: "listRoot",
    class: _ctx.classes
  }, toHandlers(_ctx.rootListeners), _ctx.rootAttrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class"]);
}

script$n.render = render$n;
script$n.__file = "src/list/list.vue";

var list = BasePlugin({
  mcwList: script$n,
  mcwListItem: script$o
});

var mcwMaterialIcon = {
  name: "mcw-material-icon",
  props: {
    icon: String,
    tag: { type: String, default: "i" }
  },
  setup(props, { attrs }) {
    return () => {
      return h(props.tag, { ...attrs, class: "material-icons" }, props.icon);
    };
  }
};

var materialIcon = BasePlugin({
  mcwMaterialIcon
});

var mcwMenuAnchor = {
  name: "mcw-menu-anchor",
  setup(props, { slots }) {
    return () => {
      var _a;
      return h("div", {
        class: {
          "mdc-menu-surface--anchor": 1
        }
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};

var mcwMenuItem = {
  name: "mcw-menu-item",
  props: {
    disabled: Boolean
  },
  setup(props, { slots }) {
    return () => {
      var _a;
      return h("li", {
        class: {
          "mdc-menu-divider": 1,
          "mdc-list-divider": 1
        },
        tabindex: props.disabled ? "-1" : "0",
        "aria-disabled": props.disabled,
        role: "menuitem"
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
};

const { cssClasses: cssClasses$4, strings: strings$8 } = MDCMenuSurfaceFoundation;
var script$m = {
  name: "mcw-menu-surface",
  props: {
    modelValue: [Boolean, Object],
    "quick-open": Boolean,
    "anchor-corner": [String, Number],
    "anchor-margin": Object
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {
        "mdc-menu-surface": 1
      },
      root: void 0
    });
    let foundation;
    let anchorElement;
    let previousFocus_;
    const handleBodyClick = (event_) => {
      foundation.handleBodyClick(event_);
    };
    const registerBodyClickListener = () => {
      document.body.addEventListener("click", handleBodyClick);
    };
    const deregisterBodyClickListener = () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
    const handleKeydown = (event_) => {
      foundation.handleKeydown(event_);
    };
    const getFocusAdapterMethods = () => {
      return {
        isFocused: () => document.activeElement === uiState.root,
        saveFocus: () => {
          previousFocus_ = document.activeElement;
        },
        restoreFocus: () => {
          if (uiState.root.contains(document.activeElement) && previousFocus_ && previousFocus_.focus) {
            previousFocus_.focus();
          }
        }
      };
    };
    const getDimensionAdapterMethods = () => {
      return {
        getInnerDimensions: () => {
          return {
            width: uiState.root.offsetWidth,
            height: uiState.root.offsetHeight
          };
        },
        getAnchorDimensions: () => anchorElement ? anchorElement.getBoundingClientRect() : void 0,
        getWindowDimensions: () => {
          return { width: window.innerWidth, height: window.innerHeight };
        },
        getBodyDimensions: () => {
          return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
          };
        },
        getWindowScroll: () => {
          return { x: window.pageXOffset, y: window.pageYOffset };
        },
        setPosition: (position) => {
          uiState.root.style.left = "left" in position ? `${position.left}px` : "";
          uiState.root.style.right = "right" in position ? `${position.right}px` : "";
          uiState.root.style.top = "top" in position ? `${position.top}px` : "";
          uiState.root.style.bottom = "bottom" in position ? `${position.bottom}px` : "";
        },
        setMaxHeight: (height) => {
          uiState.root.style.maxHeight = height;
        }
      };
    };
    const rootListeners = {
      keydown: (event_) => handleKeydown(event_)
    };
    const onOpen_ = (value) => {
      const method = value ? "open" : "close";
      foundation[method]();
    };
    const setIsHoisted = (isHoisted) => {
      foundation.setIsHoisted(isHoisted);
    };
    const hoistMenuToBody = () => {
      uiState.root.remove();
      document.body.append(uiState.root);
      setIsHoisted(true);
    };
    const setFixedPosition = (isFixed) => {
      if (isFixed) {
        uiState.classes = { ...uiState.classes, [cssClasses$4.FIXED]: true };
      } else {
        const { [cssClasses$4.FIXED]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      }
      foundation.setFixedPosition(isFixed);
    };
    const setAbsolutePosition = (x, y) => {
      foundation.setAbsolutePosition(x, y);
      setIsHoisted(true);
    };
    const setAnchorCorner = (corner) => {
      foundation.setAnchorCorner(corner);
    };
    const setAnchorMargin = (margin) => {
      foundation.setAnchorMargin(margin);
    };
    const setMenuSurfaceAnchorElement = (element) => {
      anchorElement = element;
    };
    const show = (options) => {
      foundation.open(options);
    };
    const close = (skipRestoreFocus = false) => {
      foundation.close(skipRestoreFocus);
    };
    const hide = () => {
      close();
    };
    const isOpen = () => {
      return foundation ? foundation.isOpen() : false;
    };
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => uiState.root.classList.contains(className),
      hasAnchor: () => !!anchorElement,
      notifyClose: () => {
        uiState.root && emitCustomEvent(uiState.root, strings$8.CLOSED_EVENT, {});
        deregisterBodyClickListener();
        emit("mdcmenusurface:closed");
        emit("update:modelValue", false);
      },
      notifyOpen: () => {
        emitCustomEvent(uiState.root, strings$8.OPENED_EVENT, {});
        registerBodyClickListener();
        emit("mdcmenusurface:opened");
        emit("update:modelValue", true);
      },
      isElementInContainer: (element) => {
        var _a;
        return (_a = uiState.root) == null ? void 0 : _a.contains(element);
      },
      isRtl: () => getComputedStyle(uiState.root).getPropertyValue("direction") === "rtl",
      setTransformOrigin: (origin) => {
        uiState.root.style.setProperty(`${getCorrectPropertyName(window, "transform")}-origin`, origin);
      }
    };
    watch(() => props.modelValue, (nv) => onOpen_(nv));
    watch(() => props.quickOpen, (nv) => foundation.setQuickOpen(nv));
    onMounted(() => {
      foundation = new MDCMenuSurfaceFoundation({
        ...adapter,
        ...getFocusAdapterMethods(),
        ...getDimensionAdapterMethods()
      });
      foundation.init();
      if (uiState.root.parentElement && uiState.root.parentElement.classList.contains(cssClasses$4.ANCHOR)) {
        anchorElement = uiState.root.parentElement;
      }
    });
    onBeforeUnmount(() => {
      previousFocus_ = void 0;
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      rootListeners,
      hoistMenuToBody,
      setFixedPosition,
      setAbsolutePosition,
      setAnchorCorner,
      setAnchorMargin,
      setMenuSurfaceAnchorElement,
      show,
      hide,
      isOpen,
      close
    };
  }
};

function render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", mergeProps({
    ref: "root",
    class: _ctx.classes
  }, toHandlers(_ctx.rootListeners)), [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}

script$m.render = render$m;
script$m.__file = "src/menu/menu-surface.vue";

const { cssClasses: cssClasses$3, strings: strings$7 } = MDCMenuFoundation;
const DefaultFocusState_ = {
  NONE: 0,
  LIST_ROOT: 1,
  FIRST_ITEM: 2,
  LAST_ITEM: 3
};
var script$l = {
  name: "mcw-menu",
  props: {
    modelValue: [Boolean, Object],
    quickOpen: Boolean,
    anchorCorner: [String, Number],
    anchorMargin: Object,
    fixed: Boolean,
    absolutePosition: Array,
    typeAhead: Boolean,
    singleSelection: Boolean,
    defaultFocusState: { type: String, default: () => "LIST_ROOT" }
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {},
      styles: {},
      menuOpen: false,
      myWrapFocus: true,
      menuSurface: void 0,
      list: void 0
    });
    let foundation;
    let rootElement;
    const items = computed(() => {
      var _a, _b;
      return (_b = (_a = uiState.list) == null ? void 0 : _a.listElements) != null ? _b : [];
    });
    const listItems = computed(() => {
      var _a;
      return (_a = uiState.list.listItems) != null ? _a : [];
    });
    const getListItemByIndex = (index) => {
      const element = items.value[index];
      const myItemId = element.dataset.myitemid;
      return listItems.value[myItemId];
    };
    const surfaceOpen = computed({
      get() {
        return uiState.menuOpen;
      },
      set(value) {
        uiState.menuOpen = value;
      }
    });
    const wrapFocus = computed({
      get() {
        return uiState.myWrapFocus;
      },
      set(nv) {
        uiState.myWrapFocus = nv;
      }
    });
    const layout = () => {
      var _a;
      return (_a = uiState.list) == null ? void 0 : _a.layout();
    };
    const handleAction = (index) => {
      foundation.handleItemAction(items.value[index]);
    };
    const handleKeydown = (event_) => foundation.handleKeydown(event_);
    const handleMenuSurfaceOpened = () => {
      foundation.handleMenuSurfaceOpened();
      emit("mdcmenusurface:opened");
    };
    const handleMenuSurfaceClosed = () => {
      emit("mdcmenusurface:closed");
    };
    const onChange = (item) => {
      uiState.menuOpen = item;
      emit("update:modelValue", item);
    };
    const setDefaultFocusState = (focusState) => {
      if (typeof focusState == "string") {
        focusState = DefaultFocusState_[focusState];
      }
      foundation.setDefaultFocusState(focusState);
    };
    const setAnchorCorner = (corner) => {
      uiState.menuSurface.setAnchorCorner(corner);
    };
    const setAnchorElement = (element) => {
      uiState.menuSurface.setMenuSurfaceAnchorElement(element);
    };
    const setSelectedIndex = (index) => {
      var _a;
      return (_a = uiState.list) == null ? void 0 : _a.setSelectedIndex(index);
    };
    const getSelectedIndex = () => {
      var _a, _b;
      return (_b = (_a = uiState.list) == null ? void 0 : _a.getSelectedIndex()) != null ? _b : -1;
    };
    const setAnchorMargin = (margin) => {
      uiState.menuSurface.setAnchorMargin(margin);
    };
    const getOptionByIndex = (index) => {
      const itms = items.value;
      if (index < itms.length) {
        return itms[index];
      }
      return;
    };
    const getPrimaryTextAtIndex = (index) => {
      const item = getOptionByIndex(index);
      if (item && uiState.list) {
        return uiState.list.getPrimaryText(item) || "";
      }
      return "";
    };
    const setFixedPosition = (isFixed) => {
      uiState.menuSurface.setFixedPosition(isFixed);
    };
    const hoistMenuToBody = () => {
      uiState.menuSurface.hoistMenuToBody();
    };
    const setIsHoisted = (isHoisted) => {
      uiState.menuSurface.setIsHoisted(isHoisted);
    };
    const setAbsolutePosition = (x, y) => {
      uiState.menuSurface.setAbsolutePosition(x, y);
    };
    const typeaheadInProgress = () => {
      var _a;
      return (_a = uiState.list.typeAheadInProgress) != null ? _a : false;
    };
    const typeaheadMatchItem = (nextChar, startingIndex) => {
      if (uiState.list) {
        return uiState.list.typeaheadMatchItem(nextChar, startingIndex);
      }
      return -1;
    };
    const setSingleSelection = (singleSelection) => {
      var _a;
      return (_a = uiState.list) == null ? void 0 : _a.setSingleSelection(singleSelection);
    };
    const adapter = {
      addClassToElementAtIndex: (index, className) => {
        const listItem = getListItemByIndex(index);
        listItem.classList.add(className);
      },
      removeClassFromElementAtIndex: (index, className) => {
        const listItem = getListItemByIndex(index);
        listItem.classList.remove(className);
      },
      addAttributeToElementAtIndex: (index, attribute, value) => {
        const listItem = getListItemByIndex(index);
        listItem.setAttribute(attribute, value);
      },
      removeAttributeFromElementAtIndex: (index, attribute) => {
        const listItem = getListItemByIndex(index);
        listItem.removeAttribute(attribute);
      },
      elementContainsClass: (element, className) => element.classList.contains(className),
      closeSurface: (skipRestoreFocus) => {
        uiState.menuSurface.close(skipRestoreFocus);
        emit("update:modelValue", false);
      },
      getElementIndex: (element) => {
        return items.value.findIndex((element_) => element_ == element);
      },
      notifySelected: (eventData) => {
        emitCustomEvent(rootElement, strings$7.SELECTED_EVENT, {
          index: eventData.index,
          item: items.value[eventData.index]
        });
        emit("select", {
          index: eventData.index,
          item: items.value[eventData.index]
        });
      },
      getMenuItemCount: () => items.value.length,
      focusItemAtIndex: (index) => items.value[index].focus(),
      focusListRoot: () => {
        uiState.menuSurface.$el.querySelector(strings$7.LIST_SELECTOR).focus();
      },
      isSelectableItemAtIndex: (index) => !!closest(items.value[index], `.${cssClasses$3.MENU_SELECTION_GROUP}`),
      getSelectedSiblingOfItemAtIndex: (index) => {
        const selectionGroupElement = closest(items.value[index], `.${cssClasses$3.MENU_SELECTION_GROUP}`);
        const selectedItemElement = selectionGroupElement.querySelector(`.${cssClasses$3.MENU_SELECTED_LIST_ITEM}`);
        return selectedItemElement ? items.value.findIndex((element) => element == selectedItemElement) : -1;
      }
    };
    watch(() => props.modelValue, (nv) => {
      uiState.menuOpen = nv;
    });
    onMounted(() => {
      rootElement = uiState.menuSurface.$el;
      uiState.menuOpen = props.modelValue;
      foundation = new MDCMenuFoundation(adapter);
      foundation.init();
      if (props.fixed) {
        uiState.menuSurface.setFixedPosition(props.fixed);
      }
      if (props.absolutePosition) {
        const [x, y] = props.absolutePosition;
        uiState.menuSurface.setAbsolutePosition(x, y);
      }
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      handleAction,
      handleKeydown,
      onChange,
      handleMenuSurfaceOpened,
      handleMenuSurfaceClosed,
      setAbsolutePosition,
      setIsHoisted,
      hoistMenuToBody,
      setFixedPosition,
      getOptionByIndex,
      setAnchorMargin,
      setAnchorElement,
      setAnchorCorner,
      getSelectedIndex,
      setSelectedIndex,
      setDefaultFocusState,
      wrapFocus,
      surfaceOpen,
      layout,
      getPrimaryTextAtIndex,
      items,
      typeaheadInProgress,
      typeaheadMatchItem,
      setSingleSelection
    };
  }
};

function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mcw_list = resolveComponent("mcw-list");
  const _component_mcw_menu_surface = resolveComponent("mcw-menu-surface");
  return openBlock(), createBlock(_component_mcw_menu_surface, {
    ref: "menuSurface",
    class: "mdc-menu",
    "quick-open": _ctx.quickOpen,
    modelValue: _ctx.menuOpen,
    onKeydown: _ctx.handleKeydown,
    "onUpdate:modelValue": _ctx.onChange,
    "onMdcmenusurface:opened": _ctx.handleMenuSurfaceOpened,
    "onMdcmenusurface:closed": _ctx.handleMenuSurfaceClosed
  }, {
    default: withCtx(() => [
      createVNode(_component_mcw_list, {
        ref: "list",
        role: "menu",
        "aria-hidden": "true",
        "wrap-focus": _ctx.myWrapFocus,
        "onUpdate:modelValue": _ctx.handleAction,
        tabindex: "-1",
        "type-ahead": _ctx.typeAhead,
        "single-selection": _ctx.singleSelection
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["wrap-focus", "onUpdate:modelValue", "type-ahead", "single-selection"])
    ]),
    _: 1
  }, 8, ["quick-open", "modelValue", "onKeydown", "onUpdate:modelValue", "onMdcmenusurface:opened", "onMdcmenusurface:closed"]);
}

script$l.render = render$l;
script$l.__file = "src/menu/menu.vue";

var menu = BasePlugin({
  mcwMenu: script$l,
  mcwMenuSurface: script$m,
  mcwMenuItem,
  mcwMenuAnchor,
  mcwList: script$n
});

const { cssClasses: cssClasses$2 } = MDCNotchedOutlineFoundation;
var script$k = {
  name: "mcw-notched-outline",
  components: { mcwFloatingLabel: script$v },
  setup(props, { slots }) {
    const uiState = reactive({
      outlinedClasses: { "mdc-notched-outline": true },
      notchStyles: {},
      labelEl: void 0
    });
    let foundation;
    const adapter = {
      addClass: (className) => uiState.outlinedClasses = {
        ...uiState.outlinedClasses,
        [className]: true
      },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.outlinedClasses;
        uiState.outlinedClasses = rest;
      },
      setNotchWidthProperty: (width) => uiState.notchStyles = { ...uiState.notchStyles, width: `${width}px` },
      removeNotchWidthProperty: () => {
        const { width: removed, ...rest } = uiState.notchStyles;
        uiState.notchStyles = rest;
      }
    };
    const notch = (notchWidth) => {
      foundation.notch(notchWidth);
    };
    const closeNotch = () => {
      foundation.closeNotch();
    };
    const float = (shouldFloat) => {
      var _a;
      (_a = uiState.labelEl) == null ? void 0 : _a.float(shouldFloat);
    };
    const shake = (shouldShake) => {
      var _a;
      (_a = uiState.labelEl) == null ? void 0 : _a.shake(shouldShake);
    };
    const getWidth = () => {
      var _a;
      return (_a = uiState.labelEl) == null ? void 0 : _a.getWidth();
    };
    onMounted(() => {
      foundation = new MDCNotchedOutlineFoundation(adapter);
      foundation.init();
      const key = slots.default ? cssClasses$2.OUTLINE_UPGRADED : cssClasses$2.NO_LABEL;
      uiState.outlinedClasses = { ...uiState.outlinedClasses, [key]: true };
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      getWidth,
      shake,
      float,
      closeNotch,
      notch
    };
  }
};

const _hoisted_1$9 = /* @__PURE__ */ createVNode("span", { class: "mdc-notched-outline__leading" }, null, -1);
const _hoisted_2$8 = /* @__PURE__ */ createVNode("span", { class: "mdc-notched-outline__trailing" }, null, -1);
function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mcw_floating_label = resolveComponent("mcw-floating-label");
  return openBlock(), createBlock("span", {
    ref: "outlined",
    class: _ctx.outlinedClasses
  }, [
    _hoisted_1$9,
    createVNode("span", {
      class: "mdc-notched-outline__notch",
      style: _ctx.notchStyles
    }, [
      _ctx.$slots.default ? (openBlock(), createBlock(_component_mcw_floating_label, {
        key: 0,
        ref: "labelEl"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 512)) : createCommentVNode("v-if", true)
    ], 4),
    _hoisted_2$8
  ], 2);
}

script$k.render = render$k;
script$k.__file = "src/notched-outline/notched-outline.vue";

var notchedOutline = BasePlugin({
  mcwNotchedOutline: script$k
});

let radioId_ = 0;
var script$j = {
  name: "mcw-radio",
  props: {
    label: String,
    alignEnd: Boolean,
    radioClasses: String,
    name: { type: String, required: true },
    id: { type: String },
    value: String,
    modelValue: String,
    disabled: Boolean,
    checked: Boolean
  },
  setup(props, { emit }) {
    var _a;
    const uiState = reactive({
      classes: { "mdc-radio": 1 },
      controlEl: void 0,
      labelEl: void 0,
      root: void 0
    });
    const {
      classes: rippleClasses,
      styles,
      activate,
      deactivate
    } = useRipplePlugin(toRef(uiState, "root"), {
      isUnbounded: () => true,
      isSurfaceActive: () => false,
      registerInteractionHandler: (event_, handler) => {
        uiState.controlEl.addEventListener(event_, handler, applyPassive());
      },
      deregisterInteractionHandler: (event_, handler) => {
        uiState.controlEl.removeEventListener(event_, handler, applyPassive());
      },
      computeBoundingRect: () => {
        return uiState.root.getBoundingClientRect();
      }
    });
    let foundation;
    let formField;
    const radioId = (_a = props.id) != null ? _a : `__mcw-radio-${radioId_++}`;
    const rootClasses = computed(() => {
      return {
        ...rippleClasses.value,
        ...uiState.classes,
        ...props.radioClasses
      };
    });
    const formFieldClasses = computed(() => {
      return {
        "mdc-form-field": 1,
        "mdc-form-field--align-end": props.alignEnd
      };
    });
    const onChange = () => {
      const nativeValue = uiState.controlEl.value;
      nativeValue != props.modelValue && emit("update:modelValue", uiState.controlEl.value);
    };
    const setChecked = (checked) => {
      uiState.controlEl.checked = checked;
    };
    const onPicked = (nv) => {
      setChecked(nv == uiState.controlEl.value);
    };
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      setNativeControlDisabled: (disabled) => uiState.controlEl && uiState.controlEl.disabled == disabled
    };
    watch(() => props.checked, (nv) => {
      setChecked(nv);
    });
    watch(() => props.disabled, (nv) => {
      foundation.setDisabled(nv);
    });
    watch(() => props.modelValue, (nv) => {
      onPicked(nv);
    });
    onMounted(() => {
      foundation = new MDCRadioFoundation(adapter);
      formField = new MDCFormFieldFoundation({
        registerInteractionHandler: (type, handler) => {
          var _a2;
          return (_a2 = uiState.labelEl) == null ? void 0 : _a2.addEventListener(type, handler);
        },
        deregisterInteractionHandler: (type, handler) => {
          var _a2;
          return (_a2 = uiState.labelEl) == null ? void 0 : _a2.removeEventListener(type, handler);
        },
        activateInputRipple: () => {
          activate();
        },
        deactivateInputRipple: () => {
          deactivate();
        }
      });
      foundation.init();
      formField.init();
      const { checked, disabled, modelValue, value } = props;
      foundation.setDisabled(disabled);
      setChecked(checked || modelValue == value);
      checked && onChange();
    });
    onBeforeUnmount(() => {
      foundation.destroy();
      formField.destroy();
    });
    return {
      ...toRefs(uiState),
      rootClasses,
      formFieldClasses,
      styles,
      onChange,
      onPicked,
      setChecked,
      radioId
    };
  }
};

const _hoisted_1$8 = /* @__PURE__ */ createVNode("div", { class: "mdc-radio__background" }, [
  /* @__PURE__ */ createVNode("div", { class: "mdc-radio__outer-circle" }),
  /* @__PURE__ */ createVNode("div", { class: "mdc-radio__inner-circle" })
], -1);
const _hoisted_2$7 = /* @__PURE__ */ createVNode("div", { class: "mdc-radio__ripple" }, null, -1);
const _hoisted_3$6 = /* @__PURE__ */ createVNode("div", { class: "mdc-radio__background" }, [
  /* @__PURE__ */ createVNode("div", { class: "mdc-radio__outer-circle" }),
  /* @__PURE__ */ createVNode("div", { class: "mdc-radio__inner-circle" })
], -1);
const _hoisted_4$5 = /* @__PURE__ */ createVNode("div", { class: "mdc-radio__ripple" }, null, -1);
function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.label ? (openBlock(), createBlock("div", {
    key: 0,
    class: [_ctx.formFieldClasses, "mdc-radio-wrapper"]
  }, [
    createVNode("div", {
      ref: "root",
      class: _ctx.rootClasses,
      style: _ctx.styles
    }, [
      createVNode("input", mergeProps({
        ref: "controlEl",
        id: _ctx.radioId,
        name: _ctx.name,
        type: "radio",
        class: "mdc-radio__native-control",
        onChange: _cache[1] || (_cache[1] = (...args) => _ctx.onChange && _ctx.onChange(...args))
      }, _ctx.$attrs, {
        value: _ctx.value,
        checked: _ctx.modelValue == _ctx.value,
        disabled: _ctx.disabled
      }), null, 16, ["id", "name", "value", "checked", "disabled"]),
      _hoisted_1$8,
      _hoisted_2$7
    ], 6),
    createVNode("label", {
      ref: "labelEl",
      for: _ctx.radioId
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ])
    ], 8, ["for"])
  ], 2)) : (openBlock(), createBlock("div", {
    key: 1,
    ref: "root",
    class: _ctx.rootClasses,
    style: _ctx.styles
  }, [
    createVNode("input", mergeProps({
      ref: "controlEl",
      id: _ctx.radioId,
      name: _ctx.name,
      type: "radio",
      class: "mdc-radio__native-control",
      onChange: _cache[2] || (_cache[2] = (...args) => _ctx.onChange && _ctx.onChange(...args))
    }, _ctx.$attrs, {
      value: _ctx.value,
      checked: _ctx.modelValue == _ctx.value,
      disabled: _ctx.disabled
    }), null, 16, ["id", "name", "value", "checked", "disabled"]),
    _hoisted_3$6,
    _hoisted_4$5
  ], 6));
}

script$j.render = render$j;
script$j.__file = "src/radio/radio.vue";

var radio = BasePlugin({ mcwRadio: script$j });

var script$i = {
  name: "mcw-segment",
  props: {
    icon: String,
    label: String,
    ripple: { type: Boolean, default: () => true }
  },
  setup(props, { attrs }) {
    var _a, _b;
    const uiState = reactive({
      classes: {},
      attrs: {},
      root: void 0
    });
    let foundation;
    const getSegmentIndex = inject("getSegmentIdx");
    const isSingleSelect = inject("isSingleSelect");
    const isTouch = inject("isTouch");
    if (isSingleSelect) {
      uiState.attrs["role"] = "radio";
      uiState.attrs["aria-checked"] = (_a = attrs["aria-checked"]) != null ? _a : "false";
    } else {
      uiState.attrs["aria-pressed"] = (_b = attrs["aria-pressed"]) != null ? _b : "false";
    }
    const getSegmentId = () => foundation.getSegmentId();
    const isSelected = () => foundation.isSelected();
    const setSelected = () => foundation.setSelected();
    const setUnselected = () => foundation.setUnselected();
    const segmentIndex = getSegmentIndex({
      getSegmentId,
      isSelected,
      setSelected,
      setUnselected
    });
    const { classes: rippleClasses, styles } = useRipplePlugin(toRef(uiState, "root"), {
      computeBoundingRect: () => {
        return foundation.getDimensions();
      }
    });
    const myAttributes = computed(() => {
      return {
        ...uiState.attrs,
        class: { ...rippleClasses.value, ...uiState.classes },
        style: styles.value
      };
    });
    const onClick = () => foundation.handleClick();
    const adapter = {
      isSingleSelect: () => {
        return isSingleSelect;
      },
      getAttr: (name) => uiState.root.getAttribute(name),
      setAttr: (attributeName, value) => {
        uiState.attrs = { ...uiState.attrs, [attributeName]: value };
      },
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      hasClass: (className) => !!uiState.classes[className],
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      notifySelectedChange: (selected) => {
        emitCustomEvent(uiState.root, "selected", {
          index: segmentIndex,
          selected,
          segmentId: getSegmentId()
        }, true);
      },
      getRootBoundingClientRect: () => {
        return uiState.root.getBoundingClientRect();
      }
    };
    onMounted(() => {
      foundation = new MDCSegmentedButtonSegmentFoundation(adapter);
      foundation.init();
    });
    onBeforeUnmount(() => {
      foundation == null ? void 0 : foundation.destroy();
    });
    return { ...toRefs(uiState), myAttrs: myAttributes, onClick, isTouch };
  }
};

const _hoisted_1$7 = {
  key: 0,
  class: "mdc-touch-target-wrapper"
};
const _hoisted_2$6 = {
  key: 0,
  class: "mdc-segmented-button__ripple"
};
const _hoisted_3$5 = {
  key: 1,
  class: "material-icons mdc-segmented-button__icon"
};
const _hoisted_4$4 = {
  key: 2,
  class: "mdc-segmented-button__label"
};
const _hoisted_5$4 = /* @__PURE__ */ createVNode("div", { class: "mdc-segmented-button__touch" }, null, -1);
const _hoisted_6$2 = {
  key: 0,
  class: "mdc-segmented-button__ripple"
};
const _hoisted_7$2 = {
  key: 1,
  class: "material-icons mdc-segmented-button__icon"
};
const _hoisted_8$1 = {
  key: 2,
  class: "mdc-segmented-button__label"
};
function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.isTouch ? (openBlock(), createBlock("div", _hoisted_1$7, [
    createVNode("button", mergeProps({
      ref: "root",
      class: "mdc-segmented-button__segment mdc-segmented-button--touch"
    }, _ctx.myAttrs, {
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    }), [
      _ctx.ripple ? (openBlock(), createBlock("div", _hoisted_2$6)) : createCommentVNode("v-if", true),
      _ctx.icon ? (openBlock(), createBlock("i", _hoisted_3$5, toDisplayString(_ctx.icon), 1)) : createCommentVNode("v-if", true),
      _ctx.label ? (openBlock(), createBlock("div", _hoisted_4$4, toDisplayString(_ctx.label), 1)) : createCommentVNode("v-if", true),
      _hoisted_5$4
    ], 16)
  ])) : (openBlock(), createBlock("button", mergeProps({
    key: 1,
    ref: "root",
    class: "mdc-segmented-button__segment"
  }, _ctx.myAttrs, {
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }), [
    _ctx.ripple ? (openBlock(), createBlock("div", _hoisted_6$2)) : createCommentVNode("v-if", true),
    _ctx.icon ? (openBlock(), createBlock("i", _hoisted_7$2, toDisplayString(_ctx.icon), 1)) : createCommentVNode("v-if", true),
    _ctx.label ? (openBlock(), createBlock("div", _hoisted_8$1, toDisplayString(_ctx.label), 1)) : createCommentVNode("v-if", true)
  ], 16));
}

script$i.render = render$i;
script$i.__file = "src/segmented-button/segment.vue";

var script$h = {
  name: "mcw-segmented-button",
  props: {
    singleSelect: Boolean,
    touch: Boolean,
    modelValue: { type: [Number, Array] }
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {
        "mdc-segmented-button--single-select": props.singleSelect
      },
      styles: {},
      root: void 0,
      contentEl: void 0
    });
    let foundation;
    let segmentIndex = 0;
    const segments_ = [];
    const getSegmentIndex = (segment) => {
      const sg = { ...segment, index: segmentIndex++ };
      segments_.push(sg);
      return sg.index;
    };
    provide("getSegmentIdx", getSegmentIndex);
    provide("isSingleSelect", props.singleSelect);
    provide("isTouch", props.touch);
    const mappedSegments = computed(() => segments_.map(({ index, isSelected, getSegmentId }) => ({
      index,
      selected: isSelected(),
      segmentId: getSegmentId()
    })));
    const onSelected = ({ detail }) => {
      foundation.handleSelected(detail);
    };
    const adapter = {
      hasClass: (className) => uiState.root.classList.contains(className),
      getSegments: () => {
        return mappedSegments.value;
      },
      selectSegment: (indexOrSegmentId) => {
        const segmentDetail = mappedSegments.value.find((_segmentDetail) => _segmentDetail.index === indexOrSegmentId || _segmentDetail.segmentId === indexOrSegmentId);
        if (segmentDetail) {
          segments_[segmentDetail.index].setSelected();
        }
      },
      unselectSegment: (indexOrSegmentId) => {
        const segmentDetail = mappedSegments.value.find((_segmentDetail) => _segmentDetail.index === indexOrSegmentId || _segmentDetail.segmentId === indexOrSegmentId);
        if (segmentDetail) {
          segments_[segmentDetail.index].setUnselected();
        }
      },
      notifySelectedChange: (detail) => {
        emit("change", detail);
        if (Array.isArray(props.modelValue)) {
          const { selected, index } = detail;
          const index_ = props.modelValue.indexOf(index);
          if (selected) {
            index_ < 1 && emit("update:modelValue", [...props.modelValue, index]);
          } else {
            index_ > -1 && emit("update:modelValue", [
              ...props.modelValue.slice(0, index_),
              ...props.modelValue.slice(index_ + 1)
            ]);
          }
        } else {
          emit("update:modelValue", detail.index);
        }
      }
    };
    const role = computed(() => props.singleSelect ? "radiogroup" : "group");
    onMounted(() => {
      foundation = new MDCSegmentedButtonFoundation(adapter);
      foundation.init();
      if (props.singleSelect && props.modelValue !== void 0) {
        foundation.selectSegment(props.modelValue);
      }
      watch(() => props.modelValue, (nv) => {
        if (Array.isArray(nv)) {
          const selectedSegments = mappedSegments.value.filter(({ selected }) => selected).map(({ index }) => index);
          for (const v of nv) {
            if (!selectedSegments.includes(v)) {
              foundation.selectSegment(v);
            }
          }
          for (const v of selectedSegments) {
            if (!nv.includes(v)) {
              foundation.unselectSegment(v);
            }
          }
        } else {
          foundation.selectSegment(nv);
          foundation.handleSelected({ index: nv });
        }
      });
    });
    onBeforeUnmount(() => {
      foundation == null ? void 0 : foundation.destroy();
    });
    return { ...toRefs(uiState), role, onSelected };
  }
};

function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    ref: "root",
    class: ["mdc-segmented-button", _ctx.classes],
    role: _ctx.role,
    onSelected: _cache[1] || (_cache[1] = (...args) => _ctx.onSelected && _ctx.onSelected(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42, ["role"]);
}

script$h.render = render$h;
script$h.__file = "src/segmented-button/segmented-button.vue";

var segmentedButton = BasePlugin({
  mcwSegmentedButton: script$h,
  mcwSegment: script$i
});

var script$g = {
  name: "select-helper-text",
  props: {
    helptextPersistent: Boolean,
    helptextValidation: Boolean,
    helptext: String
  },
  setup(props) {
    const uiState = reactive({
      classes: {
        "mdc-select-helper-text": true,
        "mdc-select-helper-text--persistent": props.helptextPersistent,
        "mdc-select-helper-text--validation-msg": props.helptextValidation
      },
      attrs: { "aria-hidden": "true" },
      myHelptext: props.helptext,
      foundation: {}
    });
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => Boolean(uiState.classes[className]),
      setAttr: (attribute, value) => uiState.attrs = { ...uiState.attrs, [attribute]: value },
      removeAttr: (attribute) => {
        const { [attribute]: removed, ...rest } = uiState.attrs;
        uiState.attrs = rest;
      },
      setContent: (content) => {
        uiState.myHelptext = content;
      }
    };
    watch(() => props.helptextPersistent, (nv) => uiState.foundation.setPersistent(nv));
    watch(() => props.helptextValidation, (nv) => uiState.foundation.setValidation(nv));
    watch(() => props.helptext, (nv) => uiState.myHelptext = nv);
    onMounted(() => {
      uiState.foundation = new MDCSelectHelperTextFoundation(adapter);
      uiState.foundation.init();
    });
    onBeforeUnmount(() => {
      uiState.foundation.destroy();
    });
    return { ...toRefs(uiState) };
  }
};

function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("p", { class: _ctx.classes }, toDisplayString(_ctx.myHelptext), 3);
}

script$g.render = render$g;
script$g.__file = "src/select/select-helper-text.vue";

const { strings: strings$6 } = MDCSelectIconFoundation;
var script$f = {
  name: "select-icon",
  props: {
    icon: String
  },
  setup(props, { emit, attrs }) {
    const uiState = reactive({
      classes: {
        "material-icons": true,
        "mdc-select__icon": true
      },
      styles: {},
      root: void 0,
      rootAttrs: {},
      rootListeners: {},
      foundation: {}
    });
    const listeners = computed(() => {
      return { ...attrs, ...uiState.rootListeners };
    });
    const adapter = {
      getAttr: (attribute) => uiState.rootAttrs[attribute],
      setAttr: (attribute, value) => uiState.rootAttrs = { ...uiState.rootAttrs, [attribute]: value },
      removeAttr: (attribute) => {
        const { [attribute]: removed, ...rest } = uiState.rootAttrs;
        uiState.rootAttrs = rest;
      },
      setContent: (content) => {
        uiState.root.textContent = content;
      },
      registerInteractionHandler: (eventType, handler) => uiState.rootListeners = {
        ...uiState.rootListeners,
        [eventType.toLowerCase()]: handler
      },
      deregisterInteractionHandler: (eventType) => {
        const { [eventType]: removed, ...rest } = uiState.rootListeners;
        uiState.rootListeners = rest;
      },
      notifyIconAction: () => {
        emit("click");
        emitCustomEvent(uiState.root, strings$6.ICON_EVENT, {}, true);
      }
    };
    onMounted(() => {
      uiState.foundation = new MDCSelectIconFoundation(adapter);
      uiState.foundation.init();
    });
    onBeforeUnmount(() => {
      uiState.foundation.destroy();
    });
    return { ...toRefs(uiState), listeners };
  }
};

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("i", mergeProps({
    ref: "root",
    class: _ctx.classes,
    style: _ctx.styles
  }, toHandlers(_ctx.rootListeners), _ctx.rootAttrs), toDisplayString(_ctx.icon), 17);
}

script$f.render = render$f;
script$f.__file = "src/select/select-icon.vue";

const { strings: strings$5 } = MDCSelectFoundation;
let uid_$1 = 0;
var script$e = {
  name: "mcw-select",
  inheritAttrs: false,
  props: {
    modelValue: String,
    helptext: String,
    leadingIcon: String,
    helptextPersistent: Boolean,
    helptextValidation: Boolean,
    disabled: Boolean,
    label: String,
    outlined: Boolean,
    required: Boolean,
    menuFullwidth: { type: Boolean, default: () => true }
  },
  setup(props, { emit }) {
    const uiState = reactive({
      styles: {},
      classes: {},
      selectedTextContent: "",
      selTextAttrs: {},
      selectAnchorAttrs: {},
      helpId: `help-mcw-select-${uid_$1++}`,
      menuClasses: { "mdc-menu-surface--fullwidth": props.menuFullwidth },
      root: void 0,
      helperTextEl: void 0,
      leadingIconEl: void 0,
      lineRippleEl: void 0,
      outlineEl: void 0,
      labelEl: void 0,
      menu: void 0,
      anchorEl: void 0
    });
    let rippleClasses;
    let rippleStyles;
    if (props.outlined) {
      const { classes, styles } = useRipplePlugin(toRef(uiState, "anchorEl"), {
        registerInteractionHandler: (eventType, handler) => {
          uiState.anchorEl.addEventListener(eventType, handler);
        },
        deregisterInteractionHandler: (eventType, handler) => {
          uiState.anchorEl.removeEventListener(eventType, handler);
        }
      });
      rippleClasses = classes;
      rippleStyles = styles;
    }
    const rootClasses = computed(() => {
      return {
        "mdc-select": 1,
        "mdc-select--required": props.required,
        "mdc-select--filled": !props.outlined,
        "mdc-select--outlined": props.outlined,
        "mdc-select--with-leading-icon": props.leadingIcon,
        "mdc-select--disabled": props.disabled,
        "mdc-select--no-label": !props.label,
        ...uiState.classes
      };
    });
    const menuItems = computed(() => {
      var _a;
      return (_a = uiState.menu) == null ? void 0 : _a.items;
    });
    let foundation;
    const handleFocus = () => foundation.handleFocus();
    const handleBlur = () => foundation.handleBlur();
    const handleClick = (event_) => {
      uiState.anchorEl.focus();
      handleFocus();
      foundation.handleClick(getNormalizedXCoordinate(event_));
    };
    const handleKeydown = (event_) => foundation.handleKeydown(event_);
    const handleChange = (isOpen) => foundation[`handleMenu${isOpen ? "Opened" : "Closed"}`]();
    const layout = () => foundation.layout();
    const handleMenuOpened = () => foundation.handleMenuOpened();
    const handleMenuClosed = () => foundation.handleMenuClosed();
    const handleMenuItemAction = ({ index }) => foundation.handleMenuItemAction(index);
    const layoutOptions = () => {
      foundation.layoutOptions();
      uiState.menu.layout();
    };
    const selectedTextAttributes = computed(() => {
      const attributes = { ...uiState.selTextAttrs };
      if (props.helptext) {
        attributes["aria-controls"] = uiState.helpId;
        attributes["aria-describedBy"] = uiState.helpId;
      }
      return attributes;
    });
    const adapter = {
      getMenuItemAttr: (menuItem, attribute) => menuItem.getAttribute(attribute),
      setSelectedText: (text) => {
        uiState.selectedTextContent = text;
      },
      isSelectAnchorFocused: () => document.activeElement === uiState.anchorEl,
      getSelectAnchorAttr: (attribute) => uiState.selectAnchorAttrs[attribute],
      setSelectAnchorAttr: (attribute, value) => uiState.selectAnchorAttrs = {
        ...uiState.selectAnchorAttrs,
        [attribute]: value
      },
      removeSelectAnchorAttr: (attribute) => {
        const { [attribute]: removed, ...rest } = uiState.selectAnchorAttrs;
        uiState.selectAnchorAttrs = rest;
      },
      addMenuClass: (className) => uiState.menuClasses = { ...uiState.menuClasses, [className]: true },
      removeMenuClass: (className) => {
        const { [className]: removed, ...rest } = uiState.menuClasses;
        uiState.menuClasses = rest;
      },
      openMenu: () => uiState.menu.surfaceOpen = true,
      closeMenu: () => uiState.menu.surfaceOpen = false,
      getAnchorElement: () => uiState.anchorEl,
      setMenuAnchorElement: (anchorElement) => uiState.menu.setAnchorElement(anchorElement),
      setMenuAnchorCorner: (anchorCorner) => uiState.menu.setAnchorCorner(anchorCorner),
      setMenuWrapFocus: (wrapFocus) => uiState.menu.wrapFocus = wrapFocus,
      getSelectedIndex: () => {
        var _a, _b;
        const index = (_b = (_a = uiState.menu) == null ? void 0 : _a.getSelectedIndex()) != null ? _b : -1;
        return Array.isArray(index) ? index[0] : index;
      },
      setSelectedIndex: (index) => {
        uiState.menu.setSelectedIndex(index);
      },
      focusMenuItemAtIndex: (index) => menuItems.value[index].focus(),
      getMenuItemCount: () => menuItems.value.length,
      getMenuItemValues: () => menuItems.value.map((element) => element.getAttribute(strings$5.VALUE_ATTR) || ""),
      getMenuItemTextAtIndex: (index) => {
        return menuItems.value[index].textContent;
      },
      isTypeaheadInProgress: () => uiState.menu.typeaheadInProgress(),
      typeaheadMatchItem: (nextChar, startingIndex) => {
        var _a;
        return (_a = uiState.menu) == null ? void 0 : _a.typeaheadMatchItem(nextChar, startingIndex);
      },
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => Boolean(rootClasses.value[className]),
      setRippleCenter: (normalizedX) => {
        var _a;
        return (_a = uiState.lineRippleEl) == null ? void 0 : _a.setRippleCenter(normalizedX);
      },
      activateBottomLine: () => {
        var _a;
        return (_a = uiState.lineRippleEl) == null ? void 0 : _a.activate();
      },
      deactivateBottomLine: () => {
        var _a;
        return (_a = uiState.lineRippleEl) == null ? void 0 : _a.deactivate();
      },
      notifyChange: (value) => {
        const index = foundation.getSelectedIndex();
        emitCustomEvent(uiState.root, strings$5.CHANGE_EVENT, { value, index }, true);
        value != props.modelValue && emit("update:modelValue", value);
      },
      hasOutline: () => props.outlined,
      notchOutline: (labelWidth) => {
        var _a;
        return (_a = uiState.outlineEl) == null ? void 0 : _a.notch(labelWidth);
      },
      closeOutline: () => {
        var _a;
        return (_a = uiState.outlineEl) == null ? void 0 : _a.closeNotch();
      },
      hasLabel: () => !!props.label,
      floatLabel: (shouldFloat) => {
        var _a;
        return (_a = uiState.labelEl || uiState.outlineEl) == null ? void 0 : _a.float(shouldFloat);
      },
      getLabelWidth: () => {
        var _a;
        return ((_a = uiState.labelEl) == null ? void 0 : _a.getWidth()) || 0;
      },
      setLabelRequired: (isRequired) => {
        var _a;
        return (_a = uiState.labelEl) == null ? void 0 : _a.setRequired(isRequired);
      }
    };
    const setFixedPosition = (isFixed) => uiState.menu.setFixedPosition(isFixed);
    const refreshIndex = () => {
      const items = menuItems.value.map((element) => element.getAttribute(strings$5.VALUE_ATTR) || "");
      const index = items.indexOf(props.modelValue);
      uiState.menu.setSelectedIndex(index);
      return index;
    };
    watch(() => props.disabled, (nv) => foundation == null ? void 0 : foundation.updateDisabledStyle(nv));
    watch(() => props.modelValue, () => {
      const index = refreshIndex();
      foundation.setSelectedIndex(index);
    });
    onMounted(() => {
      var _a, _b;
      uiState.menu.hasTypeahead = true;
      uiState.menu.setSingleSelection = true;
      foundation = new MDCSelectFoundation(adapter, {
        helperText: (_a = uiState.helperTextEl) == null ? void 0 : _a.foundation,
        leadingIcon: (_b = uiState.leadingIconEl) == null ? void 0 : _b.foundation
      });
      refreshIndex();
      foundation = new MDCSelectFoundation(adapter);
      foundation.init();
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      rootClasses,
      handleBlur,
      handleFocus,
      handleClick,
      handleChange,
      handleKeydown,
      layout,
      layoutOptions,
      rippleClasses,
      rippleStyles,
      selectedTextAttrs: selectedTextAttributes,
      handleMenuItemAction,
      refreshIndex,
      setFixedPosition,
      handleMenuOpened,
      handleMenuClosed
    };
  },
  components: { SelectHelperText: script$g, SelectIcon: script$f }
};
function getNormalizedXCoordinate(event_) {
  const targetClientRect = event_.target.getBoundingClientRect();
  const xCoordinate = event_.clientX;
  return xCoordinate - targetClientRect.left;
}

const _hoisted_1$6 = { class: "select-wrapper" };
const _hoisted_2$5 = {
  key: 1,
  class: "mdc-select__ripple"
};
const _hoisted_3$4 = { class: "mdc-select__selected-text-container" };
const _hoisted_4$3 = { class: "mdc-select__selected-text" };
const _hoisted_5$3 = /* @__PURE__ */ createVNode("span", { class: "mdc-select__dropdown-icon" }, [
  /* @__PURE__ */ createVNode("svg", {
    class: "mdc-select__dropdown-icon-graphic",
    viewBox: "7 10 10 5"
  }, [
    /* @__PURE__ */ createVNode("polygon", {
      class: "mdc-select__dropdown-icon-inactive",
      stroke: "none",
      "fill-rule": "evenodd",
      points: "7 10 12 15 17 10"
    }),
    /* @__PURE__ */ createVNode("polygon", {
      class: "mdc-select__dropdown-icon-active",
      stroke: "none",
      "fill-rule": "evenodd",
      points: "7 15 12 10 17 15"
    })
  ])
], -1);
function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_select_icon = resolveComponent("select-icon");
  const _component_mcw_notched_outline = resolveComponent("mcw-notched-outline");
  const _component_mcw_floating_label = resolveComponent("mcw-floating-label");
  const _component_mcw_line_ripple = resolveComponent("mcw-line-ripple");
  const _component_mcw_menu = resolveComponent("mcw-menu");
  const _component_select_helper_text = resolveComponent("select-helper-text");
  return openBlock(), createBlock("div", _hoisted_1$6, [
    createVNode("div", mergeProps({ ref: "root" }, _ctx.$attrs, { class: _ctx.rootClasses }), [
      createVNode("div", mergeProps({
        ref: "anchorEl",
        class: ["mdc-select__anchor", _ctx.rippleClasses],
        style: _ctx.rippleStyles,
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClick && _ctx.handleClick(...args)),
        onKeydown: _cache[2] || (_cache[2] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args)),
        onFocus: _cache[3] || (_cache[3] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onBlur: _cache[4] || (_cache[4] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args))
      }, _ctx.selectAnchorAttrs, {
        role: "button",
        "aria-haspopup": "listbox",
        "aria-required": _ctx.required
      }), [
        _ctx.leadingIcon ? (openBlock(), createBlock(_component_select_icon, {
          key: 0,
          ref: "leadingIconEl",
          icon: _ctx.leadingIcon,
          tabindex: "0",
          role: "button"
        }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
        !_ctx.outlined ? (openBlock(), createBlock("span", _hoisted_2$5)) : createCommentVNode("v-if", true),
        createVNode("span", _hoisted_3$4, [
          createVNode("span", _hoisted_4$3, toDisplayString(_ctx.selectedTextContent), 1)
        ]),
        _hoisted_5$3,
        _ctx.outlined ? (openBlock(), createBlock(_component_mcw_notched_outline, {
          key: 2,
          ref: "outlineEl"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ]),
          _: 1
        }, 512)) : (openBlock(), createBlock(Fragment, { key: 3 }, [
          createVNode(_component_mcw_floating_label, { ref: "labelEl" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.label), 1)
            ]),
            _: 1
          }, 512),
          createVNode(_component_mcw_line_ripple, { ref: "lineRippleEl" }, null, 512)
        ], 64))
      ], 16, ["aria-required"]),
      createVNode(_component_mcw_menu, {
        ref: "menu",
        class: ["mdc-select__menu", _ctx.menuClasses],
        "onUpdate:modelValue": _ctx.handleChange,
        onSelect: _ctx.handleMenuItemAction,
        "onMdcMenuSurface:opened": _ctx.handleMenuOpened,
        "onMdcMenuSurface:closed": _ctx.handleMenuClosed,
        role: "listbox"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "onUpdate:modelValue", "onSelect", "onMdcMenuSurface:opened", "onMdcMenuSurface:closed"])
    ], 16),
    _ctx.helptext ? (openBlock(), createBlock(_component_select_helper_text, {
      key: 0,
      ref: "helperTextEl",
      id: _ctx.helpId,
      helptextPersistent: _ctx.helptextPersistent,
      helptextValidation: _ctx.helptextValidation,
      helptext: _ctx.helptext
    }, null, 8, ["id", "helptextPersistent", "helptextValidation", "helptext"])) : createCommentVNode("v-if", true)
  ]);
}

script$e.render = render$e;
script$e.__file = "src/select/select.vue";

var select = BasePlugin({
  mcwSelect: script$e,
  mcwNotchedOutline: script$k,
  mcwLineRipple: script$q,
  mcwFloatingLabel: script$v
});

const getThumbName = (thumb, suffix) => {
  const thumbName = thumb == Thumb.END ? "endThumb" : "startThumb";
  return `${thumbName}${suffix}`;
};
let valueToAriaValueTextFunction = () => {
};
const setValueToAriaValueTextFunction = (mapFunction) => {
  valueToAriaValueTextFunction = mapFunction;
};
var script$d = {
  name: "mcw-slider",
  props: {
    modelValue: [Number, String],
    start: [Number, String],
    min: { type: [Number, String], default: 0 },
    max: { type: [Number, String], default: 100 },
    step: { type: [Number, String], default: 1 },
    discrete: Boolean,
    tickMarks: Boolean,
    disabled: Boolean,
    range: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const uiState = reactive({
      skipInitialUIUpdate: false,
      dir: void 0,
      marks: [],
      classes: {
        "mdc-slider": 1,
        "mdc-slider--discrete": props.discrete,
        "mdc-slider--tick-marks": props.discrete && props.tickMarks,
        "mdc-slider--range": props.range
      },
      startValueText: "",
      startThumbClasses: {},
      startThumbAttrs: {
        "aria-valuenow": "0"
      },
      test: 50,
      endValueText: "",
      endThumbClasses: {},
      endThumbAttrs: {
        "aria-valuenow": "0"
      },
      inputs: [],
      thumbs: [],
      root: void 0,
      startThumb: void 0,
      endThumb: void 0,
      trackActive: void 0
    });
    let foundation;
    const getThumbElement = (thumb) => {
      return thumb === Thumb.END ? uiState.thumbs[uiState.thumbs.length - 1] : uiState.thumbs[0];
    };
    const setInputReference = (element) => uiState.inputs.push(element);
    const setThumbReference = (element) => uiState.thumbs.push(element);
    const getInput = (thumb) => {
      return thumb === Thumb.END ? uiState.inputs[uiState.inputs.length - 1] : uiState.inputs[0];
    };
    const adapter = {
      hasClass: (className) => uiState.root.classList.contains(className),
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      addThumbClass: (className, thumb) => {
        const thumbName = getThumbName(thumb, "Classes");
        uiState[thumbName] = { ...uiState[thumbName], [className]: true };
      },
      removeThumbClass: (className, thumb) => {
        const thumbName = getThumbName(thumb, "Classes");
        const { [className]: removed, ...rest } = uiState[thumbName];
        uiState[thumbName] = rest;
      },
      getAttribute: (name) => uiState.root.getAttribute(name),
      getInputValue: (thumb) => getInput(thumb).value,
      setInputValue: (value, thumb) => {
        getInput(thumb).value = value;
      },
      getInputAttribute: (attribute, thumb) => {
        if (attribute == "value") {
          return adapter.getInputValue(thumb);
        }
        return getInput(thumb).getAttribute(attribute);
      },
      setInputAttribute: (attribute, value, thumb) => {
        getInput(thumb).setAttribute(attribute, value);
      },
      removeInputAttribute: (attribute, thumb) => {
        getInput(thumb).removeAttribute(attribute);
      },
      focusInput: (thumb) => {
        getInput(thumb).focus();
      },
      isInputFocused: (thumb) => getInput(thumb) === document.activeElement,
      getThumbAttribute: (attribute, thumb) => {
        const thumbName = getThumbName(thumb, "Attrs");
        return uiState[thumbName][attribute];
      },
      setThumbAttribute: (attribute, value, thumb) => {
        const thumbName = getThumbName(thumb, "Attrs");
        uiState[thumbName] = { ...uiState[thumbName], [attribute]: value };
      },
      isThumbFocused: (thumb) => {
        return getThumbElement(thumb) === document.activeElement;
      },
      focusThumb: (thumb) => getThumbElement(thumb).focus(),
      getThumbKnobWidth: (thumb) => {
        var _a;
        return (_a = getThumbElement(thumb).querySelector(`.${cssClasses$8.THUMB_KNOB}`)) == null ? void 0 : _a.getBoundingClientRect().width;
      },
      getThumbBoundingClientRect: (thumb) => getThumbElement(thumb).getBoundingClientRect(),
      getBoundingClientRect: () => uiState.root.getBoundingClientRect(),
      isRTL: () => getComputedStyle(uiState.root).direction === "rtl",
      setThumbStyleProperty: (propertyName, value, thumb) => {
        getThumbElement(thumb).style.setProperty(propertyName, value);
      },
      removeThumbStyleProperty: (propertyName, thumb) => getThumbElement(thumb).style.removeProperty(propertyName),
      setTrackActiveStyleProperty: (propertyName, value) => uiState.trackActive.style.setProperty(propertyName, value),
      removeTrackActiveStyleProperty: (propertyName) => {
        uiState.trackActive.style.removeProperty(propertyName);
      },
      setValueIndicatorText: (value, thumb) => {
        const thumbName = thumb == Thumb.END ? "endValueText" : "startValueText";
        uiState[thumbName] = String(value);
      },
      getValueToAriaValueTextFn: () => valueToAriaValueTextFunction,
      updateTickMarks: (tickMarks) => {
        uiState.marks = tickMarks.map((mark) => mark == 0 ? "mdc-slider__tick-mark--active" : "mdc-slider__tick-mark--inactive");
      },
      setPointerCapture: (pointerId) => uiState.root.setPointerCapture(pointerId),
      emitChangeEvent: (value, thumb) => {
        emitCustomEvent(uiState.root, events.CHANGE, { value, thumb });
        const eventName = thumb == Thumb.END ? "update:modelValue" : "update:start";
        emit(eventName, value);
      },
      emitInputEvent: (value, thumb) => {
        emitCustomEvent(uiState.root, events.INPUT, { value, thumb });
      },
      emitDragStartEvent: () => {
      },
      emitDragEndEvent: () => {
      },
      registerEventHandler: (eventType, handler) => uiState.root.addEventListener(eventType, handler),
      deregisterEventHandler: (eventType, handler) => uiState.root.removeEventListener(eventType, handler),
      registerThumbEventHandler: (thumb, eventType, handler) => getThumbElement(thumb).addEventListener(eventType, handler),
      deregisterThumbEventHandler: (thumb, eventType, handler) => getThumbElement(thumb).removeEventListener(eventType, handler),
      registerInputEventHandler: (thumb, eventType, handler) => {
        getInput(thumb).addEventListener(eventType, handler);
      },
      deregisterInputEventHandler: (thumb, eventType, handler) => {
        getInput(thumb).removeEventListener(eventType, handler);
      },
      registerBodyEventHandler: (eventType, handler) => document.body.addEventListener(eventType, handler),
      deregisterBodyEventHandler: (eventType, handler) => document.body.removeEventListener(eventType, handler),
      registerWindowEventHandler: (eventType, handler) => window.addEventListener(eventType, handler),
      deregisterWindowEventHandler: (eventType, handler) => window.removeEventListener(eventType, handler)
    };
    watch(() => props.modelValue, (nv) => {
      if (foundation.getValue() !== Number(nv)) {
        foundation.setValue(nv);
      }
    });
    watch(() => props.start, (nv) => {
      if (foundation.getValueStart() !== Number(nv)) {
        foundation.setValueStart(nv);
      }
    });
    watch(() => props.disabled, (nv) => {
      foundation.setDisabled(nv);
    });
    onMounted(() => {
      uiState.dir = getComputedStyle(uiState.root).direction;
      if (props.range) {
        uiState.startThumbAttrs["aria-valuemin"] = props.min;
        uiState.startThumbAttrs["aria-valuemax"] = props.max;
        uiState.startThumbAttrs["aria-valuenow"] = props.start;
        uiState.startValueText = String(props.start);
      }
      uiState.endThumbAttrs["aria-valuemin"] = props.min;
      uiState.endThumbAttrs["aria-valuemax"] = props.max;
      uiState.endThumbAttrs["aria-valuenow"] = props.modelValue;
      uiState.endValueText = String(props.modelValue);
      foundation = new MDCSliderFoundation(adapter);
      foundation.init();
      foundation.layout({ skipUpdateUI: uiState.skipInitialUIUpdate });
      foundation.setDisabled(props.disabled);
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      setValueToAriaValueTextFn: setValueToAriaValueTextFunction,
      setInputRef: setInputReference,
      setThumbRef: setThumbReference
    };
  }
};

const _hoisted_1$5 = { class: "mdc-slider__track" };
const _hoisted_2$4 = /* @__PURE__ */ createVNode("div", { class: "mdc-slider__track--inactive" }, null, -1);
const _hoisted_3$3 = { class: "mdc-slider__track--active" };
const _hoisted_4$2 = {
  key: 0,
  class: "mdc-slider__tick-marks"
};
const _hoisted_5$2 = {
  key: 0,
  class: "mdc-slider__value-indicator-container",
  "aria-hidden": "true"
};
const _hoisted_6$1 = { class: "mdc-slider__value-indicator" };
const _hoisted_7$1 = { class: "mdc-slider__value-indicator-text" };
const _hoisted_8 = /* @__PURE__ */ createVNode("div", { class: "mdc-slider__thumb-knob" }, null, -1);
const _hoisted_9 = {
  key: 0,
  class: "mdc-slider__value-indicator-container",
  "aria-hidden": "true"
};
const _hoisted_10 = { class: "mdc-slider__value-indicator" };
const _hoisted_11 = { class: "mdc-slider__value-indicator-text" };
const _hoisted_12 = /* @__PURE__ */ createVNode("div", { class: "mdc-slider__thumb-knob" }, null, -1);
function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    ref: "root",
    class: _ctx.classes
  }, [
    _ctx.range ? (openBlock(), createBlock("input", {
      key: 0,
      ref: _ctx.setInputRef,
      class: "mdc-slider__input",
      type: "range",
      min: _ctx.min,
      max: _ctx.max,
      step: _ctx.step,
      value: _ctx.start,
      name: "volume",
      "aria-label": "slider"
    }, null, 8, ["min", "max", "step", "value"])) : createCommentVNode("v-if", true),
    createVNode("input", {
      ref: _ctx.setInputRef,
      class: "mdc-slider__input",
      type: "range",
      min: _ctx.min,
      max: _ctx.max,
      step: _ctx.step,
      value: _ctx.modelValue,
      name: "volume",
      "aria-label": "slider"
    }, null, 8, ["min", "max", "step", "value"]),
    createVNode("div", _hoisted_1$5, [
      _hoisted_2$4,
      createVNode("div", _hoisted_3$3, [
        createVNode("div", {
          ref: "trackActive",
          dir: _ctx.dir,
          class: "mdc-slider__track--active_fill"
        }, null, 8, ["dir"])
      ]),
      _ctx.tickMarks ? (openBlock(), createBlock("div", _hoisted_4$2, [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.marks, (mark) => {
          return openBlock(), createBlock("div", { class: mark }, null, 2);
        }), 256))
      ])) : createCommentVNode("v-if", true)
    ]),
    _ctx.range ? (openBlock(), createBlock("div", mergeProps({
      key: 1,
      ref: _ctx.setThumbRef,
      class: [_ctx.startThumbClasses, "mdc-slider__thumb"],
      tabindex: "0",
      role: "slider",
      "aria-label": "slider"
    }, _ctx.startThumbAttrs), [
      _ctx.discrete ? (openBlock(), createBlock("div", _hoisted_5$2, [
        createVNode("div", _hoisted_6$1, [
          createVNode("span", _hoisted_7$1, toDisplayString(_ctx.startValueText), 1)
        ])
      ])) : createCommentVNode("v-if", true),
      _hoisted_8
    ], 16)) : createCommentVNode("v-if", true),
    createVNode("div", mergeProps({
      ref: _ctx.setThumbRef,
      class: [_ctx.endThumbClasses, "mdc-slider__thumb"],
      tabindex: "0",
      role: "slider",
      "aria-label": "slider"
    }, _ctx.endThumbAttrs), [
      _ctx.discrete ? (openBlock(), createBlock("div", _hoisted_9, [
        createVNode("div", _hoisted_10, [
          createVNode("span", _hoisted_11, toDisplayString(_ctx.endValueText), 1)
        ])
      ])) : createCommentVNode("v-if", true),
      _hoisted_12
    ], 16)
  ], 2);
}

script$d.render = render$d;
script$d.__file = "src/slider/slider.vue";

var slider = BasePlugin({
  mcwSlider: script$d
});

const noop = () => {
};
var script$c = {
  name: "mcw-snackbar-queue",
  props: { snack: Object },
  setup(props, { emit, attrs }) {
    const uiState = reactive({
      open: false,
      queue: [],
      snack: {
        timeoutMs: 5e3,
        closeOnEscape: false,
        message: "",
        actionText: "",
        dismissAction: true,
        leading: false,
        stacked: false
      }
    });
    let actionHandler_;
    const handleSnack = ({
      timeoutMs = 5e3,
      closeOnEscape,
      message = "",
      actionText = "",
      dismissAction = true,
      stacked,
      leading,
      actionHandler = noop
    }) => {
      uiState.queue.push(() => {
        uiState.snack = {
          timeoutMs,
          closeOnEscape,
          message,
          actionText,
          actionHandler,
          dismissAction,
          stacked,
          leading
        };
        actionHandler_ = actionHandler;
        uiState.open = true;
      });
      if (uiState.queue.length === 1) {
        uiState.queue[0]();
      }
    };
    const handleClosed = () => {
      uiState.open = false;
      uiState.queue.shift();
      if (uiState.queue.length > 0) {
        nextTick(() => uiState.queue[0]());
      }
    };
    const listeners = computed(() => {
      return {
        "update:reason": attrs["update:reason"],
        "mdcsnackbar:closed": ({ reason }) => {
          if (actionHandler_ && reason === "action") {
            actionHandler_({ reason });
          }
          handleClosed();
          emit("closed", { reason });
        }
      };
    });
    watch(() => props.snack, (nv) => {
      if (nv) {
        handleSnack(nv);
        emit("update:snack");
      }
    });
    return { ...toRefs(uiState), handleSnack, listeners };
  }
};

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mcw_snackbar = resolveComponent("mcw-snackbar");
  return openBlock(), createBlock(_component_mcw_snackbar, mergeProps({ modelValue: _ctx.open }, _ctx.snack, toHandlers(_ctx.listeners)), null, 16, ["modelValue"]);
}

script$c.render = render$c;
script$c.__file = "src/snackbar/snackbar-queue.vue";

const { strings: strings$4, numbers } = MDCSnackbarFoundation;
var script$b = {
  name: "mcw-snackbar",
  props: {
    modelValue: Boolean,
    stacked: Boolean,
    leading: Boolean,
    message: String,
    actionText: String,
    timeoutMs: [String, Number],
    closeOnEscape: { type: Boolean, default: true },
    dismissAction: { type: [String, Boolean], default: true },
    reason: String
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {},
      hidden: false,
      actionHidden: false,
      showMessage: true,
      labelEl: void 0
    });
    let foundation;
    const rootClasses = computed(() => {
      return {
        "mdc-snackbar": 1,
        "mdc-snackbar--leading": props.leading,
        "mdc-snackbar--stacked": props.stacked,
        ...uiState.classes
      };
    });
    const showDismissAction = computed(() => {
      return typeof props.dismissAction === "string" ? props.dismissAction != "false" : props.dismissAction;
    });
    const handleKeydownEvent = (event_) => foundation.handleKeyDown(event_);
    const announce = (ariaElement, labelElement = ariaElement) => {
      const priority = ariaElement.getAttribute("aria-live");
      const text = props.message;
      if (!text) {
        return;
      }
      ariaElement.setAttribute("aria-live", "off");
      uiState.showMessage = false;
      labelElement.setAttribute(strings$4.ARIA_LIVE_LABEL_TEXT_ATTR, props.message);
      setTimeout(() => {
        ariaElement.setAttribute("aria-live", priority);
        labelElement.removeAttribute(strings$4.ARIA_LIVE_LABEL_TEXT_ATTR);
        uiState.showMessage = true;
      }, numbers.ARIA_LIVE_DELAY_MS);
    };
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      announce: () => announce(uiState.labelEl),
      notifyClosed: (reason) => {
        emit(strings$4.CLOSED_EVENT.toLowerCase(), reason ? { reason } : {});
        emit("update:modelValue", false);
        emit("hide");
      },
      notifyClosing: (reason) => {
        emit(strings$4.CLOSING_EVENT, reason ? { reason } : {});
        emit("update:reason", reason);
      },
      notifyOpened: () => {
        emit(strings$4.OPENED_EVENT.toLowerCase(), {});
        emit("update:modelValue", true);
        emit("show", {});
      },
      notifyOpening: () => emit(strings$4.OPENING_EVENT, {}),
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      }
    };
    const surfaceClickHandler = (event_) => {
      if (isActionButton_(event_.target)) {
        foundation.handleActionButtonClick(event_);
      } else if (isActionIcon_(event_.target)) {
        foundation.handleActionIconClick(event_);
      }
    };
    watch(() => props.modelValue, (nv) => {
      if (nv) {
        foundation.open();
      } else {
        foundation.close(props.reason ? props.reason : "");
      }
    });
    watch(() => props.timeoutMs, (nv) => {
      if (nv !== void 0) {
        foundation.setTimeoutMs(nv);
      }
    });
    watch(() => props.closeOnEscape, (nv) => foundation.setCloseOnEscape(nv));
    onMounted(() => {
      window.addEventListener("keydown", handleKeydownEvent);
      foundation = new MDCSnackbarFoundation(adapter);
      foundation.init();
      if (props.timeoutMs !== void 0) {
        foundation.setTimeoutMs(props.timeoutMs);
      }
      foundation.setCloseOnEscape(props.closeOnEscape);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeydownEvent);
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      rootClasses,
      showDismissAction,
      surfaceClickHandler
    };
  }
};
function isActionButton_(target) {
  return Boolean(closest(target, strings$4.ACTION_SELECTOR));
}
function isActionIcon_(target) {
  return Boolean(closest(target, strings$4.DISMISS_SELECTOR));
}

const _hoisted_1$4 = {
  ref: "labelEl",
  class: "mdc-snackbar__label",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_2$3 = {
  key: 1,
  style: { "display": "inline-block", "width": "0", "height": "'1px'" }
};
const _hoisted_3$2 = { class: "mdc-snackbar__actions" };
const _hoisted_4$1 = {
  key: 0,
  ref: "actionEl",
  type: "button",
  class: "mdc-button mdc-snackbar__action"
};
const _hoisted_5$1 = /* @__PURE__ */ createVNode("div", { class: "mdc-button__ripple" }, null, -1);
const _hoisted_6 = { class: "mdc-button__label" };
const _hoisted_7 = {
  key: 1,
  type: "button",
  class: "mdc-icon-button mdc-snackbar__dismiss material-icons",
  title: "Dismiss"
};
function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", { class: _ctx.rootClasses }, [
    createVNode("div", {
      class: "mdc-snackbar__surface",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.surfaceClickHandler && _ctx.surfaceClickHandler(...args))
    }, [
      createVNode("div", _hoisted_1$4, [
        _ctx.showMessage ? (openBlock(), createBlock(Fragment, { key: 0 }, [
          createTextVNode(toDisplayString(_ctx.message), 1)
        ], 2112)) : (openBlock(), createBlock("span", _hoisted_2$3, "\xA0"))
      ], 512),
      createVNode("div", _hoisted_3$2, [
        _ctx.actionText ? (openBlock(), createBlock("button", _hoisted_4$1, [
          _hoisted_5$1,
          createVNode("span", _hoisted_6, toDisplayString(_ctx.actionText), 1)
        ], 512)) : createCommentVNode("v-if", true),
        _ctx.showDismissAction ? (openBlock(), createBlock("button", _hoisted_7, " close ")) : createCommentVNode("v-if", true)
      ])
    ])
  ], 2);
}

script$b.render = render$b;
script$b.__file = "src/snackbar/snackbar.vue";

var snackbar = BasePlugin({
  mcwSnackbar: script$b,
  mcwSnackbarQueue: script$c
});

let switchId_ = 0;
var script$a = {
  name: "mcw-switch",
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    value: String,
    label: String,
    alignEnd: Boolean,
    name: String,
    id: String
  },
  setup(props, { slots, emit }) {
    var _a;
    const uiState = reactive({
      classes: { "mdc-switch": 1 },
      nativeControlChecked: props.modelValue,
      nativeControlDisabled: props.disabled,
      nativeAttrs: {},
      root: void 0
    });
    const { classes: rippleClasses, styles } = useRipplePlugin(toRef(uiState, "root"));
    let foundation;
    const switchId = (_a = props.id) != null ? _a : `__mcw-switch-${switchId_++}`;
    const classes = computed(() => {
      return { ...rippleClasses.value, ...uiState.classes };
    });
    const hasLabel = computed(() => {
      return props.label || slots.default;
    });
    const onChanged = (event) => {
      foundation == null ? void 0 : foundation.handleChange(event);
      emit("update:modelValue", event.target.checked);
    };
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      setNativeControlChecked: (checked) => uiState.nativeControlChecked = checked,
      setNativeControlDisabled: (disabled) => uiState.nativeControlDisabled = disabled,
      setNativeControlAttr: (attribute, value) => {
        uiState.nativeAttrs[attribute] = value;
      }
    };
    watch(() => props.modelValue, (nv, ov) => {
      nv != ov && (foundation == null ? void 0 : foundation.setChecked(nv));
    });
    watch(() => props.disabled, (nv, ov) => {
      nv != ov && (foundation == null ? void 0 : foundation.setDisabled(nv));
    });
    onMounted(() => {
      foundation = new MDCSwitchFoundation(adapter);
      foundation.init();
      foundation.setChecked(props.modelValue);
      foundation.setDisabled(props.disabled);
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      classes,
      hasLabel,
      onChanged,
      styles,
      switchId
    };
  }
};

const _hoisted_1$3 = /* @__PURE__ */ createVNode("div", { class: "mdc-switch__track" }, null, -1);
const _hoisted_2$2 = { class: "mdc-switch__thumb-underlay" };
const _hoisted_3$1 = /* @__PURE__ */ createVNode("div", { class: "mdc-switch__thumb" }, null, -1);
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    class: [{
      "mdc-form-field": _ctx.hasLabel,
      "mdc-form-field--align-end": _ctx.hasLabel && _ctx.alignEnd
    }, "mdc-switch-wrapper"]
  }, [
    createVNode("div", {
      ref: "root",
      class: [_ctx.classes, "mdc-switch"],
      style: _ctx.styles
    }, [
      _hoisted_1$3,
      createVNode("div", _hoisted_2$2, [
        _hoisted_3$1,
        createVNode("input", mergeProps({
          name: _ctx.name,
          id: _ctx.switchId,
          value: _ctx.value,
          type: "checkbox",
          role: "switch",
          class: "mdc-switch__native-control",
          checked: _ctx.nativeControlChecked,
          disabled: _ctx.nativeControlDisabled
        }, _ctx.nativeAttrs, {
          onChange: _cache[1] || (_cache[1] = (...args) => _ctx.onChanged && _ctx.onChanged(...args))
        }), null, 16, ["name", "id", "value", "checked", "disabled"])
      ])
    ], 6),
    _ctx.hasLabel ? (openBlock(), createBlock("label", {
      key: 0,
      for: _ctx.switchId,
      class: "mdc-switch-label"
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ])
    ], 8, ["for"])) : createCommentVNode("v-if", true)
  ], 2);
}

script$a.render = render$a;
script$a.__file = "src/switch/switch.vue";

var switchControl = BasePlugin({
  mcwSwitch: script$a
});

const { strings: strings$3 } = MDCTabBarFoundation;
var script$9 = {
  name: "mcw-tab-bar",
  props: {
    fade: Boolean,
    stacked: Boolean,
    spanContent: Boolean,
    modelValue: Number
  },
  setup(props, { emit, attrs }) {
    const scroller = ref();
    const root = ref();
    const tabList = ref([]);
    provide("mcwTabList", {
      fade: props.fade,
      stacked: props.stacked,
      spanContent: props.spanContent,
      tabList
    });
    const listeners = computed(() => {
      return {
        change: attrs.onChange,
        "mdctab:interacted": (event_) => {
          foundation.handleTabInteraction(event_);
        },
        "mdc-tab:interacted": (event_) => {
          foundation.handleTabInteraction(event_);
        },
        keydown: (event_) => foundation.handleKeyDown(event_)
      };
    });
    let foundation;
    const getTabElements_ = () => {
      return Array.prototype.slice.call(root.value.querySelectorAll(strings$3.TAB_SELECTOR));
    };
    const activateTab = (index) => foundation.activateTab(index);
    const adapter = {
      scrollTo: (scrollX) => scroller.value.scrollTo(scrollX),
      incrementScroll: (scrollXIncrement) => scroller.value.incrementScroll(scrollXIncrement),
      getScrollPosition: () => scroller.value.getScrollPosition(),
      getScrollContentWidth: () => scroller.value.getScrollContentWidth(),
      getOffsetWidth: () => root.value.offsetWidth,
      isRTL: () => window.getComputedStyle(root.value).getPropertyValue("direction") === "rtl",
      setActiveTab: (index) => {
        foundation.activateTab(index);
      },
      activateTabAtIndex: (index, clientRect) => {
        tabList.value[index].activate(clientRect);
      },
      deactivateTabAtIndex: (index) => {
        var _a;
        return (_a = tabList.value[index]) == null ? void 0 : _a.deactivate();
      },
      focusTabAtIndex: (index) => tabList.value[index].focus(),
      getTabIndicatorClientRectAtIndex: (index) => {
        var _a;
        return (_a = tabList.value[index]) == null ? void 0 : _a.computeIndicatorClientRect();
      },
      getTabDimensionsAtIndex: (index) => tabList.value[index].computeDimensions(),
      getPreviousActiveTabIndex: () => {
        for (let index = 0; index < tabList.value.length; index++) {
          if (tabList.value[index].isActive()) {
            return index;
          }
        }
        return -1;
      },
      getFocusedTabIndex: () => {
        const tabElements = getTabElements_();
        const activeElement = document.activeElement;
        return tabElements.indexOf(activeElement);
      },
      getIndexOfTabById: (id) => {
        for (let index = 0; index < tabList.value.length; index++) {
          if (tabList.value[index].id === id) {
            return index;
          }
        }
        return -1;
      },
      getTabListLength: () => tabList.value.length,
      notifyTabActivated: (index) => {
        emitCustomEvent(root.value, strings$3.TAB_ACTIVATED_EVENT, { index }, true);
        emit("update:modelValue", Number(index));
      }
    };
    onMounted(() => {
      foundation = foundation = new MDCTabBarFoundation(adapter);
      foundation.init();
      props.modelValue !== void 0;
      foundation.activateTab(Number(props.modelValue) || 0);
      for (let index = 0; index < tabList.value.length; index++) {
        if (tabList.value[index].active) {
          foundation.scrollIntoView(index);
          break;
        }
      }
      watch(() => props.modelValue, (nv) => {
        foundation.activateTab(Number(nv));
      });
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return { root, scroller, listeners, activateTab };
  }
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mcw_tab_scroller = resolveComponent("mcw-tab-scroller");
  return openBlock(), createBlock("div", mergeProps({
    ref: "root",
    role: "tablist"
  }, toHandlers(_ctx.listeners), { class: "mdc-tab-bar" }), [
    createVNode(_component_mcw_tab_scroller, { ref: "scroller" }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 512)
  ], 16);
}

script$9.render = render$9;
script$9.__file = "src/tabs/tab-bar.vue";

const { cssClasses: cssClasses$1 } = MDCTabIndicatorFoundation;
var script$8 = {
  name: "mcw-tab-indicator",
  props: { fade: { type: Boolean }, icon: { type: String } },
  setup(props) {
    const uiState = reactive({
      classes: { "mdc-tab-indicator--fade": props.fade },
      contentClasses: {
        "mdc-tab-indicator__content--underline": !props.icon,
        "mdc-tab-indicator__content--icon": !!props.icon,
        "material-icons": !!props.icon
      },
      contentAttrs: { "aria-hidden": !!props.icon },
      styles: {},
      contentEl: void 0
    });
    let foundation;
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      computeContentClientRect: () => uiState.contentEl.getBoundingClientRect(),
      setContentStyleProperty: (property, value) => uiState.styles = { ...uiState.styles, [property]: value }
    };
    const deactivate = () => foundation.deactivate();
    const computeContentClientRect = () => foundation.computeContentClientRect();
    const activate = (previousIndicatorClientRect) => {
      if (!previousIndicatorClientRect) {
        adapter.addClass(cssClasses$1.ACTIVE);
        return;
      }
      const currentClientRect = computeContentClientRect();
      const widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
      const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
      requestAnimationFrame(() => {
        adapter.addClass(cssClasses$1.NO_TRANSITION);
        adapter.setContentStyleProperty("transform", `translateX(${xPosition}px) scaleX(${widthDelta})`);
        requestAnimationFrame(() => {
          adapter.removeClass(cssClasses$1.NO_TRANSITION);
          adapter.addClass(cssClasses$1.ACTIVE);
          adapter.setContentStyleProperty("transform", "");
        });
      });
    };
    onMounted(() => {
      foundation = props.fade ? new MDCFadingTabIndicatorFoundation(adapter) : new MDCSlidingTabIndicatorFoundation(adapter);
      foundation.init();
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      activate,
      deactivate,
      computeContentClientRect
    };
  }
};

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("span", {
    class: ["mdc-tab-indicator", _ctx.classes]
  }, [
    createVNode("span", mergeProps({
      ref: "contentEl",
      class: ["mdc-tab-indicator__content", _ctx.contentClasses],
      style: _ctx.styles
    }, _ctx.contentAttrs), toDisplayString(_ctx.icon), 17)
  ], 2);
}

script$8.render = render$8;
script$8.__file = "src/tabs/tab-indicator.vue";

var script$7 = {
  name: "mcw-tab-scroller",
  setup() {
    const uiState = reactive({
      classes: { "mdc-tab-scroller": 1 },
      areaClasses: { "mdc-tab-scroller__scroll-area": 1 },
      areaStyles: {},
      contentStyles: {},
      content: void 0,
      area: void 0
    });
    let foundation;
    const getScrollPosition = () => foundation.getScrollPosition();
    const getScrollContentWidth = () => uiState.content.offsetWidth;
    const incrementScroll = (scrollXIncrement) => foundation.incrementScroll(scrollXIncrement);
    const scrollTo = (scrollX) => foundation.scrollTo(scrollX);
    const onTransitionEnd = (event_) => foundation.handleTransitionEnd(event_);
    const areaListeners = {
      mousedown: (event_) => foundation.handleInteraction(event_),
      wheel: (event_) => foundation.handleInteraction(event_),
      pointerdown: (event_) => foundation.handleInteraction(event_),
      touchstart: (event_) => foundation.handleInteraction(event_),
      keydown: (event_) => foundation.handleInteraction(event_)
    };
    const adapter = {
      eventTargetMatchesSelector: (eventTarget, selector) => {
        return matches(eventTarget, selector);
      },
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      addScrollAreaClass: (className) => uiState.areaClasses = { ...uiState.areaClasses, [className]: true },
      setScrollAreaStyleProperty: (property, value) => uiState.areaStyles = { ...uiState.areaStyles, [property]: value },
      setScrollContentStyleProperty: (property, value) => uiState.contentStyles = {
        ...uiState.contentStyles,
        [property]: value
      },
      getScrollContentStyleValue: (propertyName) => window.getComputedStyle(uiState.content).getPropertyValue(propertyName),
      setScrollAreaScrollLeft: (scrollX) => uiState.area.scrollLeft = scrollX,
      getScrollAreaScrollLeft: () => uiState.area.scrollLeft,
      getScrollContentOffsetWidth: () => uiState.content.offsetWidth,
      getScrollAreaOffsetWidth: () => uiState.area.offsetWidth,
      computeScrollAreaClientRect: () => uiState.area.getBoundingClientRect(),
      computeScrollContentClientRect: () => uiState.content.getBoundingClientRect(),
      computeHorizontalScrollbarHeight: () => util$2.computeHorizontalScrollbarHeight(document)
    };
    onMounted(() => {
      foundation = new MDCTabScrollerFoundation(adapter);
      foundation.init();
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      scrollTo,
      incrementScroll,
      getScrollPosition,
      getScrollContentWidth,
      areaListeners,
      onTransitionEnd
    };
  }
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", { class: _ctx.classes }, [
    createVNode("div", mergeProps({
      ref: "area",
      class: _ctx.areaClasses,
      style: _ctx.areaStyles
    }, toHandlers(_ctx.areaListeners)), [
      createVNode("div", {
        ref: "content",
        class: "mdc-tab-scroller__scroll-content",
        style: _ctx.contentStyles,
        onTransitionend: _cache[1] || (_cache[1] = (...args) => _ctx.onTransitionEnd && _ctx.onTransitionEnd(...args))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 36)
    ], 16)
  ], 2);
}

script$7.render = render$7;
script$7.__file = "src/tabs/tab-scroller.vue";

const { strings: strings$2 } = MDCTabFoundation;
let tabId_ = 0;
var script$6 = {
  name: "mcw-tab",
  props: {
    active: Boolean,
    icon: [String, Array, Object],
    minWidth: Boolean
  },
  components: { CustomLink },
  setup(props, { slots }) {
    const uiState = reactive({
      classes: {
        "mdc-tab": 1,
        "mdc-tab--min-width": props.minWidth
      },
      rootAttrs: {
        role: "tab",
        "aria-selected": "false",
        tabindex: "-1",
        tag: "button"
      },
      styles: {},
      content: void 0,
      iconEl: void 0,
      tabIndicator: void 0,
      root: void 0,
      rippleSurface: void 0
    });
    const { classes: rippleClasses, styles: rippleStyles } = useRipplePlugin(toRef(uiState, "root"));
    const { fade, stacked, spanContent, tabList } = inject("mcwTabList");
    uiState.classes["mdc-tab--stacked"] = stacked;
    const hasIcon = computed(() => {
      if (props.icon || slots.icon) {
        return props.icon ? extractIconProperty(props.icon) : {};
      }
      return false;
    });
    const hasText = computed(() => {
      return !!slots.default;
    });
    let foundation;
    const tabId = `__mcw-tab-${tabId_++}`;
    let rootElement;
    const activate = (computeIndicatorClientRect2) => foundation.activate(computeIndicatorClientRect2);
    const deactivate = () => foundation.deactivate();
    const isActive = () => foundation.isActive();
    const setActive = (isActive2) => {
      if (isActive2) {
        uiState.classes = { ...uiState.classes, "mdc-tab--active": true }, uiState.tabIndicator.activate();
      }
    };
    const computeIndicatorClientRect = () => uiState.tabIndicator.computeContentClientRect();
    const computeDimensions = () => foundation.computeDimensions();
    const focus = () => rootElement.focus();
    const onClick = (event_) => {
      foundation.handleClick(event_);
    };
    const adapter = {
      setAttr: (attribute, value) => uiState.rootAttrs = { ...uiState.rootAttrs, [attribute]: value },
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => !!uiState.classes[className],
      activateIndicator: (previousIndicatorClientRect) => uiState.tabIndicator.activate(previousIndicatorClientRect),
      deactivateIndicator: () => uiState.tabIndicator.deactivate(),
      notifyInteracted: () => {
        emitCustomEvent(rootElement, strings$2.INTERACTED_EVENT, { tabId }, true);
      },
      getOffsetLeft: () => rootElement.offsetLeft,
      getOffsetWidth: () => rootElement.offsetWidth,
      getContentOffsetLeft: () => uiState.content.offsetLeft,
      getContentOffsetWidth: () => uiState.content.offsetWidth,
      focus: () => rootElement.focus()
    };
    onMounted(() => {
      rootElement = uiState.root.$el.nodeType === 3 ? uiState.root.$el.nextSibling : uiState.root.$el;
      foundation = new MDCTabFoundation(adapter);
      foundation.init();
      tabList.value.push({
        id: tabId,
        activate,
        deactivate,
        focus,
        computeIndicatorClientRect,
        computeDimensions,
        isActive
      });
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      hasIcon,
      hasText,
      onClick,
      setActive,
      tabId,
      fade,
      spanContent,
      rippleClasses,
      rippleStyles
    };
  }
};
function extractIconProperty(iconProperty) {
  if (typeof iconProperty === "string") {
    return {
      classes: { "material-icons": true },
      content: iconProperty
    };
  } else if (Array.isArray(iconProperty)) {
    return {
      classes: iconProperty.reduce((result, value) => Object.assign(result, { [value]: true }), {})
    };
  } else if (typeof iconProperty === "object") {
    return {
      classes: iconProperty.className.split(" ").reduce((result, value) => Object.assign(result, { [value]: true }), {}),
      content: iconProperty.textContent
    };
  }
}

const _hoisted_1$2 = {
  ref: "content",
  class: "mdc-tab__content"
};
const _hoisted_2$1 = {
  key: 1,
  class: "mdc-tab__text-label"
};
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mcw_tab_indicator = resolveComponent("mcw-tab-indicator");
  const _component_custom_link = resolveComponent("custom-link");
  return openBlock(), createBlock(_component_custom_link, mergeProps({
    id: _ctx.tabId,
    ref: "root"
  }, _ctx.rootAttrs, {
    class: _ctx.classes,
    style: _ctx.styles,
    onClick: _ctx.onClick
  }), {
    default: withCtx(() => [
      createVNode("span", _hoisted_1$2, [
        _ctx.hasIcon ? (openBlock(), createBlock("i", {
          key: 0,
          ref: "iconEl",
          class: ["mdc-tab__icon", _ctx.hasIcon.classes],
          tabindex: "0",
          "aria-hidden": "true",
          slot: "icon"
        }, toDisplayString(_ctx.hasIcon.content), 3)) : createCommentVNode("v-if", true),
        _ctx.hasText ? (openBlock(), createBlock("span", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "default")
        ])) : createCommentVNode("v-if", true),
        _ctx.spanContent ? (openBlock(), createBlock(_component_mcw_tab_indicator, {
          key: 2,
          ref: "tabIndicator",
          fade: _ctx.fade
        }, null, 8, ["fade"])) : createCommentVNode("v-if", true),
        createVNode("span", {
          ref: "rippleSurface",
          class: ["mdc-tab__ripple", _ctx.rippleClasses],
          style: _ctx.styles
        }, null, 6)
      ], 512),
      !_ctx.spanContent ? (openBlock(), createBlock(_component_mcw_tab_indicator, {
        key: 0,
        ref: "tabIndicator",
        fade: _ctx.fade
      }, null, 8, ["fade"])) : createCommentVNode("v-if", true)
    ]),
    _: 3
  }, 16, ["id", "class", "style", "onClick"]);
}

script$6.render = render$6;
script$6.__file = "src/tabs/tab.vue";

var tabs = BasePlugin({
  mcwTab: script$6,
  mcwTabBar: script$9,
  mcwTabScroller: script$7,
  mcwTabIndicator: script$8
});

var script$5 = {
  name: "mcw-character-counter",
  setup() {
    const uiState = reactive({ textContent: "", foundation: {} });
    const adapter = {
      setContent: (content) => {
        uiState.textContent = content;
      }
    };
    onMounted(() => {
      uiState.foundation = new MDCTextFieldCharacterCounterFoundation(adapter);
      uiState.foundation.init();
    });
    onBeforeUnmount(() => {
      uiState.foundation.destroy();
    });
    return { ...toRefs(uiState) };
  }
};

const _hoisted_1$1 = { class: "mdc-text-field-character-counter" };
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$1, toDisplayString(_ctx.textContent), 1);
}

script$5.render = render$5;
script$5.__file = "src/textfield/character-counter.vue";

var script$4 = {
  name: "mcw-textfield-helper-text",
  props: {
    persistent: Boolean,
    validation: Boolean,
    helptext: String
  },
  setup(props) {
    const uiState = reactive({
      classes: {
        "mdc-text-field-helper-text": true,
        "mdc-text-field-helper-text--persistent": props.persistent,
        "mdc-text-field-helper-text--validation-msg": props.validation
      },
      rootAttrs: { "aria-hidden": true },
      helpertext: props.helptext,
      foundation: {}
    });
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => Boolean(uiState.classes[className]),
      getAttr: (attribute) => uiState.rootAttrs[attribute],
      setAttr: (attribute, value) => uiState.rootAttrs = { ...uiState.rootAttrs, [attribute]: value },
      removeAttr: (attribute) => {
        const { [attribute]: removed, ...rest } = uiState.rootAttrs;
        uiState.rootAttrs = rest;
      },
      setContent: (content) => uiState.helpertext = content
    };
    watch(() => props.persistent, (nv) => uiState.foundation.setPersistent(nv));
    watch(() => props.validation, (nv) => uiState.foundation.setValidation(nv));
    onMounted(() => {
      uiState.foundation = new MDCTextFieldHelperTextFoundation(adapter);
      uiState.foundation.init();
    });
    onBeforeUnmount(() => {
      uiState.foundation.destroy();
    });
    return { ...toRefs(uiState) };
  }
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", mergeProps({ class: _ctx.classes }, _ctx.rootAttrs), toDisplayString(_ctx.helpertext), 17);
}

script$4.render = render$4;
script$4.__file = "src/textfield/textfield-helper-text.vue";

const { strings: strings$1 } = MDCTextFieldIconFoundation;
var script$3 = {
  name: "textfield-icon",
  props: {
    disabled: Boolean,
    trailing: Boolean,
    trailingIcon: Boolean
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {
        "mdc-text-field__icon": 1,
        [`mdc-text-field__icon--${props.trailing || props.trailingIcon ? "trailing" : "leading"}`]: 1
      },
      rootAttrs: {
        tabindex: props.disabled ? "-1" : "0",
        role: props.disabled ? void 0 : "button"
      },
      root: void 0,
      foundation: {}
    });
    const addIconFoundation = inject("addIconFoundation");
    const adapter = {
      getAttr: (attribute) => uiState.rootAttrs[attribute],
      setAttr: (attribute, value) => uiState.rootAttrs = { ...uiState.rootAttrs, [attribute]: value },
      removeAttr: (attribute) => {
        const { [attribute]: removed, ...rest } = uiState.rootAttrs;
        uiState.rootAttrs = rest;
      },
      setContent: () => {
      },
      registerInteractionHandler: (eventType, handler) => uiState.root.addEventListener(eventType, handler),
      deregisterInteractionHandler: (eventType, handler) => uiState.root.removeEventListener(eventType, handler),
      notifyIconAction: () => {
        emitCustomEvent(uiState.root, strings$1.ICON_EVENT, {}, true);
        emit("click");
      }
    };
    onMounted(() => {
      uiState.foundation = new MDCTextFieldIconFoundation(adapter);
      uiState.foundation.init();
      addIconFoundation({
        foundation: uiState.foundation,
        trailing: props.trailing || props.trailingIcon
      });
    });
    onBeforeUnmount(() => {
      uiState.foundation.destroy();
    });
    return { ...toRefs(uiState) };
  }
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("i", mergeProps({
    ref: "root",
    class: ["material-icons", _ctx.classes]
  }, _ctx.rootAttrs), [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}

script$3.render = render$3;
script$3.__file = "src/textfield/textfield-icon.vue";

let uid_ = 0;
const getAttributesList = (mutationsList) => mutationsList.map((mutation) => mutation.attributeName);
var script$2 = {
  name: "mcw-textfield",
  inheritAttrs: false,
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      default: "text",
      validator: function(value) {
        return [
          "text",
          "email",
          "search",
          "password",
          "tel",
          "url",
          "number"
        ].includes(value);
      }
    },
    label: String,
    outline: Boolean,
    disabled: Boolean,
    required: Boolean,
    valid: { type: Boolean, default: void 0 },
    multiline: Boolean,
    size: { type: [Number, String], default: 20 },
    minlength: { type: [Number, String], default: void 0 },
    maxlength: { type: [Number, String], default: void 0 },
    rows: { type: [Number, String], default: 8 },
    cols: { type: [Number, String], default: 40 },
    id: { type: String },
    helptext: String,
    helptextPersistent: Boolean,
    helptextValidation: Boolean,
    resizer: { type: Boolean, default: () => true },
    prefix: String,
    suffix: String,
    characterCounter: Boolean,
    characterCounterInternal: Boolean
  },
  setup(props, { emit, slots, attrs }) {
    const uiState = reactive({
      text: props.modelValue,
      classes: {
        "mdc-textfield": true,
        "mdc-text-field": true,
        "mdc-text-field--upgraded": true,
        "mdc-text-field--disabled": props.disabled,
        "mdc-text-field--textarea": props.multiline,
        "mdc-text-field--outlined": !props.fullwidth && props.outline,
        "mdc-text-field--with-leading-icon": Boolean(slots.leadingIcon || slots.leading),
        "mdc-text-field--with-trailing-icon": Boolean(slots.trailingIcon || slots.trailing),
        "mdc-text-field--filled": Boolean(!props.outline),
        "mdc-text-field--no-label": !props.label
      },
      inputClasses: {
        "mdc-text-field__input": true
      },
      inputAttrs: {},
      labelClasses: {
        "mdc-floating-label": true
      },
      lineRippleClasses: {
        "mdc-line-ripple": true
      },
      lineRippleStyles: {},
      outlineClasses: {},
      notchStyles: {},
      helpTextId: `mcw-help-${uid_++}`,
      labelId: `mcw-label-${uid_}`,
      root: void 0,
      wrapper: void 0,
      helpertext: void 0,
      input: void 0,
      labelEl: void 0,
      lineRippleEl: void 0,
      characterCounterEl: void 0,
      helpertextEl: void 0
    });
    let foundation;
    let rippleClasses;
    let rippleStyles;
    const icons = ref({});
    const addIconFoundation = ({ foundation: foundation2, trailing }) => {
      icons.value[trailing ? "trailing" : "leading"] = foundation2;
    };
    provide("addIconFoundation", addIconFoundation);
    if (!props.multiline && !props.outline) {
      const { classes, styles } = useRipplePlugin(toRef(uiState, "root"));
      rippleClasses = classes;
      rippleStyles = styles;
    }
    const inputAriaControls = computed(() => {
      return props.helptext ? uiState.helpTextId : void 0;
    });
    const hasLabel = computed(() => {
      return !props.outline && props.label;
    });
    const hasOutlineLabel = computed(() => {
      return props.outline && props.label;
    });
    const hasLineRipple = computed(() => {
      return !(props.outline || props.multiline);
    });
    const hasHelptext = computed(() => {
      return slots.helpText || props.helptext;
    });
    const internalCharacterCounter = computed(() => props.characterCounter && props.characterCounterInternal);
    const helperCharacterCounter = computed(() => props.characterCounter && !(props.multiline && props.characterCounterInternal));
    const hasHelpline = computed(() => {
      return props.helptext || helperCharacterCounter.value;
    });
    const rootClasses = computed(() => ({
      ...rippleClasses,
      ...uiState.classes
    }));
    const inputListeners = {
      input: ({ target: { value } }) => emit("update:modelValue", value)
    };
    const focus = () => {
      var _a;
      return (_a = uiState.input) == null ? void 0 : _a.focus();
    };
    const isValid = () => foundation.isValid();
    const inputAttributes = computed(() => {
      const { class: _, ...rest } = attrs;
      return {
        ...rest,
        ...uiState.inputAttrs
      };
    });
    const adapter = {
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      hasClass: (className) => Boolean(uiState.classes[className]),
      registerTextFieldInteractionHandler: (eventType, handler) => {
        uiState.root.addEventListener(eventType, handler);
      },
      deregisterTextFieldInteractionHandler: (eventType, handler) => {
        uiState.root.removeEventListener(eventType, handler);
      },
      isFocused: () => {
        return document.activeElement === uiState.input;
      },
      registerValidationAttributeChangeHandler: (handler) => {
        const observer = new MutationObserver((mutationsList) => handler(getAttributesList(mutationsList)));
        const targetNode = uiState.input;
        const config = { attributes: true };
        observer.observe(targetNode, config);
        return observer;
      },
      deregisterValidationAttributeChangeHandler: (observer) => {
        observer.disconnect();
      },
      registerInputInteractionHandler: (eventType, handler) => {
        uiState.input.addEventListener(eventType, handler, applyPassive());
      },
      deregisterInputInteractionHandler: (eventType, handler) => {
        uiState.input.removeEventListener(eventType, handler, applyPassive());
      },
      getNativeInput: () => {
        return uiState.input;
      },
      setInputAttr: (attribute, value) => {
        uiState.inputAttrs = { ...uiState.inputAttrs, [attribute]: value };
      },
      removeInputAttr: (attribute) => {
        const { [attribute]: removed, ...rest } = uiState.inputAttrs;
        uiState.inputAttrs = rest;
      },
      shakeLabel: (shouldShake) => {
        var _a;
        (_a = uiState.labelEl) == null ? void 0 : _a.shake(shouldShake);
      },
      floatLabel: (shouldFloat) => {
        var _a;
        (_a = uiState.labelEl) == null ? void 0 : _a.float(shouldFloat);
      },
      hasLabel: () => {
        return !!uiState.labelEl || !!uiState.notchedEl;
      },
      getLabelWidth: () => {
        return uiState.labelEl.getWidth();
      },
      deactivateLineRipple: () => {
        var _a;
        return (_a = uiState.lineRippleEl) == null ? void 0 : _a.deactivate();
      },
      activateLineRipple: () => {
        var _a;
        return (_a = uiState.lineRippleEl) == null ? void 0 : _a.activate();
      },
      setLineRippleTransformOrigin: (normalizedX) => {
        var _a;
        return (_a = uiState.lineRippleEl) == null ? void 0 : _a.setRippleCenter(normalizedX);
      },
      hasOutline: () => !!props.outline,
      notchOutline: (notchWidth, isRtl) => uiState.labelEl.notch(notchWidth, isRtl),
      closeOutline: () => uiState.labelEl.closeNotch()
    };
    watch(() => props.disabled, (nv) => foundation == null ? void 0 : foundation.setDisabled(nv));
    watch(() => props.required, (nv) => {
      uiState.input && (uiState.input.required = nv);
    });
    watch(() => props.valid, (nv) => {
      if (typeof nv !== "undefined") {
        foundation == null ? void 0 : foundation.setValid(nv);
      }
    });
    watch(() => props.modelValue, (nv) => {
      if (foundation && nv !== foundation.getValue()) {
        foundation.setValue(nv);
      }
    });
    onMounted(() => {
      var _a, _b, _c, _d;
      foundation = new MDCTextFieldFoundation({ ...adapter }, {
        characterCounter: (_a = uiState.characterCounterEl) == null ? void 0 : _a.foundation,
        helperText: (_b = uiState.helpertext) == null ? void 0 : _b.foundation,
        leadingIcon: (_c = icons.leading) == null ? void 0 : _c.foundation,
        trailingIcon: (_d = icons.trailing) == null ? void 0 : _d.foundation
      });
      foundation.init();
      foundation.setValue(props.modelValue);
      props.disabled && foundation.setDisabled(props.disabled);
      uiState.input && (uiState.input.required = props.required);
      if (typeof props.valid !== "undefined") {
        foundation.setValid(props.valid);
      }
    });
    onBeforeUnmount(() => {
      foundation.destroy();
    });
    return {
      ...toRefs(uiState),
      inputAriaControls,
      hasLabel,
      hasOutlineLabel,
      inputListeners,
      hasLineRipple,
      hasHelptext,
      hasHelpline,
      focus,
      helperCharacterCounter,
      internalCharacterCounter,
      rootClasses,
      rippleStyles,
      isValid,
      inputAttrs: inputAttributes
    };
  },
  components: { mcwLineRipple: script$q, mcwNotchedOutline: script$k }
};

const _hoisted_1 = {
  key: 0,
  class: "mdc-text-field__ripple"
};
const _hoisted_2 = {
  key: 3,
  class: "mdc-text-field__affix mdc-text-field__affix--prefix"
};
const _hoisted_3 = {
  key: 4,
  class: "mdc-text-field__affix mdc-text-field__affix--suffix"
};
const _hoisted_4 = {
  key: 1,
  class: "mdc-text-field__resizer"
};
const _hoisted_5 = {
  key: 2,
  class: "mdc-text-field-helper-line"
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mcw_floating_label = resolveComponent("mcw-floating-label");
  const _component_mcw_notched_outline = resolveComponent("mcw-notched-outline");
  const _component_mcw_line_ripple = resolveComponent("mcw-line-ripple");
  const _component_mcw_character_counter = resolveComponent("mcw-character-counter");
  const _component_mcw_textfield_helper_text = resolveComponent("mcw-textfield-helper-text");
  return openBlock(), createBlock("div", {
    ref: "wrapper",
    class: ["textfield-container", _ctx.$attrs.class]
  }, [
    !_ctx.multiline ? (openBlock(), createBlock("label", {
      key: 0,
      ref: "root",
      class: _ctx.rootClasses,
      style: _ctx.rippleStyles
    }, [
      !_ctx.outline ? (openBlock(), createBlock("span", _hoisted_1)) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "leading"),
      renderSlot(_ctx.$slots, "leadingIcon"),
      _ctx.hasLabel ? (openBlock(), createBlock(_component_mcw_floating_label, {
        key: 1,
        ref: "labelEl",
        id: _ctx.labelId,
        required: _ctx.required
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ]),
        _: 1
      }, 8, ["id", "required"])) : createCommentVNode("v-if", true),
      _ctx.outline ? (openBlock(), createBlock(_component_mcw_notched_outline, {
        key: 2,
        ref: "labelEl"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ]),
        _: 1
      }, 512)) : createCommentVNode("v-if", true),
      _ctx.prefix ? (openBlock(), createBlock("span", _hoisted_2, toDisplayString(_ctx.prefix), 1)) : createCommentVNode("v-if", true),
      createVNode("input", mergeProps({
        ref: "input",
        class: _ctx.inputClasses
      }, _ctx.inputAttrs, {
        type: _ctx.type,
        minlength: _ctx.minlength,
        maxlength: _ctx.maxlength,
        "aria-label": _ctx.label,
        "aria-controls": _ctx.inputAriaControls,
        "aria-labelledby": _ctx.labelId,
        "aria-describedby": _ctx.inputAriaControls
      }, toHandlers(_ctx.inputListeners)), null, 16, ["type", "minlength", "maxlength", "aria-label", "aria-controls", "aria-labelledby", "aria-describedby"]),
      _ctx.suffix ? (openBlock(), createBlock("span", _hoisted_3, toDisplayString(_ctx.suffix), 1)) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "trailingIcon"),
      renderSlot(_ctx.$slots, "trailing"),
      _ctx.hasLineRipple ? (openBlock(), createBlock(_component_mcw_line_ripple, {
        key: 5,
        ref: "lineRippleEl"
      }, null, 512)) : createCommentVNode("v-if", true)
    ], 6)) : (openBlock(), createBlock("label", {
      key: 1,
      ref: "root",
      class: _ctx.classes
    }, [
      _ctx.outline ? (openBlock(), createBlock(_component_mcw_notched_outline, {
        key: 0,
        ref: "labelEl"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ]),
        _: 1
      }, 512)) : createCommentVNode("v-if", true),
      _ctx.resizer ? (openBlock(), createBlock("span", _hoisted_4, [
        createVNode("textarea", mergeProps({
          ref: "input",
          class: _ctx.inputClasses
        }, _ctx.inputAttrs, {
          minlength: _ctx.minlength,
          maxlength: _ctx.maxlength,
          "aria-label": _ctx.label,
          "aria-controls": _ctx.inputAriaControls,
          cols: _ctx.cols,
          rows: _ctx.rows
        }, toHandlers(_ctx.inputListeners)), null, 16, ["minlength", "maxlength", "aria-label", "aria-controls", "cols", "rows"])
      ])) : (openBlock(), createBlock("textarea", mergeProps({
        key: 2,
        ref: "input",
        class: _ctx.inputClasses
      }, _ctx.inputAttrs, {
        minlength: _ctx.minlength,
        maxlength: _ctx.maxlength,
        "aria-label": _ctx.label,
        "aria-controls": _ctx.inputAriaControls,
        cols: _ctx.cols,
        rows: _ctx.rows
      }, toHandlers(_ctx.inputListeners)), null, 16, ["minlength", "maxlength", "aria-label", "aria-controls", "cols", "rows"])),
      _ctx.internalCharacterCounter ? (openBlock(), createBlock(_component_mcw_character_counter, {
        key: 3,
        ref: "characterCounterEl"
      }, null, 512)) : createCommentVNode("v-if", true)
    ], 2)),
    _ctx.hasHelpline ? (openBlock(), createBlock("div", _hoisted_5, [
      _ctx.helptext ? (openBlock(), createBlock(_component_mcw_textfield_helper_text, {
        key: 0,
        ref: "helpertext",
        id: _ctx.helpTextId,
        helptext: _ctx.helptext,
        persistent: _ctx.helptextPersistent,
        validation: _ctx.helptextValidation
      }, null, 8, ["id", "helptext", "persistent", "validation"])) : createCommentVNode("v-if", true),
      _ctx.helperCharacterCounter ? (openBlock(), createBlock(_component_mcw_character_counter, {
        key: 1,
        ref: "characterCounterEl"
      }, null, 512)) : createCommentVNode("v-if", true)
    ])) : createCommentVNode("v-if", true)
  ], 2);
}

script$2.render = render$2;
script$2.__file = "src/textfield/textfield.vue";

var textfield = BasePlugin({
  mcwTextfield: script$2,
  mcwTextfieldIcon: script$3,
  mcwCharacterCounter: script$5,
  mcwTextfieldHelperText: script$4,
  mcwLineRipple: script$q,
  mcwNotchedOutline: script$k,
  mcwFloatingLabel: script$v
});

var script$1 = {
  name: "mcw-tooltip",
  props: {
    position: { type: [Object, String] },
    boundaryType: { type: [String, Number] }
  },
  setup(props, { emit }) {
    const uiState = reactive({
      classes: {},
      styles: {},
      surfaceStyle: {},
      rootAttrs: { "aria-hidden": true },
      root: void 0,
      isTooltipPersistent: false,
      isTooltipRich: false
    });
    let foundation;
    let anchorElement;
    const adapter = {
      getAttribute: (name) => {
        return uiState.root.getAttribute(name);
      },
      setAttribute: (attributeName, value) => {
        uiState.rootAttrs = { ...uiState.rootAttrs, [attributeName]: value };
      },
      addClass: (className) => uiState.classes = { ...uiState.classes, [className]: true },
      hasClass: (className) => uiState.root.classList.contains(className),
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.classes;
        uiState.classes = rest;
      },
      getComputedStyleProperty: (propertyName) => {
        return window.getComputedStyle(uiState.root).getPropertyValue(propertyName);
      },
      setStyleProperty: (property, value) => uiState.styles = { ...uiState.styles, [property]: value },
      setSurfaceStyleProperty: (propertyName, value) => {
        uiState.surfaceStyle = {
          ...uiState.surfaceStyle,
          [propertyName]: value
        };
      },
      getViewportWidth: () => window.innerWidth,
      getViewportHeight: () => window.innerHeight,
      getTooltipSize: () => {
        return {
          width: uiState.root.offsetWidth,
          height: uiState.root.offsetHeight
        };
      },
      getAnchorBoundingRect: () => {
        return anchorElement ? anchorElement.getBoundingClientRect() : void 0;
      },
      getParentBoundingRect: () => {
        var _a, _b;
        return (_b = (_a = uiState.root.parentElement) == null ? void 0 : _a.getBoundingClientRect()) != null ? _b : void 0;
      },
      getAnchorAttribute: (attribute) => {
        return anchorElement ? anchorElement.getAttribute(attribute) : void 0;
      },
      setAnchorAttribute: (attribute, value) => {
        anchorElement == null ? void 0 : anchorElement.setAttribute(attribute, value);
      },
      isRTL: () => getComputedStyle(uiState.root).direction === "rtl",
      anchorContainsElement: (element) => {
        return !!(anchorElement == null ? void 0 : anchorElement.contains(element));
      },
      tooltipContainsElement: (element) => {
        return uiState.root.contains(element);
      },
      registerEventHandler: (event_, handler) => {
        uiState.root.addEventListener(event_, handler);
      },
      deregisterEventHandler: (event_, handler) => {
        uiState.root.removeEventListener(event_, handler);
      },
      registerDocumentEventHandler: (event_, handler) => {
        document.body.addEventListener(event_, handler);
      },
      deregisterDocumentEventHandler: (event_, handler) => {
        document.body.removeEventListener(event_, handler);
      },
      registerWindowEventHandler: (event_, handler) => {
        window.addEventListener(event_, handler);
      },
      deregisterWindowEventHandler: (event_, handler) => {
        window.removeEventListener(event_, handler);
      },
      notifyHidden: () => {
        emit(events$1.HIDDEN.toLowerCase(), {});
      }
    };
    const handleMouseEnter = () => {
      foundation.handleAnchorMouseEnter();
    };
    const handleFocus = (event_) => {
      foundation.handleAnchorFocus(event_);
    };
    const handleMouseLeave = () => {
      foundation.handleAnchorMouseLeave();
    };
    const handleBlur = (event_) => {
      foundation.handleAnchorBlur(event_);
    };
    const handleTransitionEnd = () => {
      foundation.handleTransitionEnd();
    };
    const handleClick = () => {
      foundation.handleAnchorClick();
    };
    const onPosition = (position) => {
      if (position) {
        let xPos;
        let yPos;
        if (typeof position == "string") {
          [xPos, yPos = xPos] = position.split(",");
        } else {
          ({ xPos, yPos } = position);
        }
        foundation.setTooltipPosition({
          xPos: toXposition(xPos),
          yPos: toYposition(yPos)
        });
      }
    };
    const onBoundaryType = (type) => {
      if (type != void 0) {
        foundation.setAnchorBoundaryType(toAnchorBoundaryType(type));
      }
    };
    onMounted(() => {
      const tooltipId = uiState.root.getAttribute("id");
      if (!tooltipId) {
        throw new Error("MDCTooltip: Tooltip component must have an id.");
      }
      anchorElement = document.querySelector(`[aria-describedby="${tooltipId}"]`) || document.querySelector(`[data-tooltip-id="${tooltipId}"]`);
      if (!anchorElement) {
        throw new Error("MDCTooltip: Tooltip component requires an anchor element annotated with [aria-describedby] or [data-tooltip-id] anchor element.");
      }
      foundation = new MDCTooltipFoundation(adapter);
      foundation.init();
      uiState.isTooltipRich = foundation.isRich();
      uiState.isTooltipPersistent = foundation.isPersistent();
      if (uiState.isTooltipRich && uiState.isTooltipPersistent) {
        anchorElement.addEventListener("click", handleClick);
      } else {
        anchorElement.addEventListener("mouseenter", handleMouseEnter);
        anchorElement.addEventListener("focus", handleFocus);
        anchorElement.addEventListener("mouseleave", handleMouseLeave);
      }
      anchorElement.addEventListener("blur", handleBlur);
      watchEffect(() => onPosition(props.position));
      watchEffect(() => onBoundaryType(props.boundaryType));
    });
    onBeforeUnmount(() => {
      if (anchorElement) {
        if (uiState.isTooltipRich && uiState.isTooltipPersistent) {
          anchorElement.removeEventListener("click", handleClick);
        } else {
          anchorElement.removeEventListener("mouseenter", handleMouseEnter);
          anchorElement.removeEventListener("focus", handleFocus);
          anchorElement.removeEventListener("mouseleave", handleMouseLeave);
          anchorElement.removeEventListener("blur", handleBlur);
        }
      }
      foundation == null ? void 0 : foundation.destroy();
    });
    return { ...toRefs(uiState), handleTransitionEnd };
  }
};
const XPosition_ = { detected: 0, start: 1, center: 2, end: 3 };
function toXposition(x) {
  var _a;
  return typeof x == "string" ? (_a = XPosition_[x]) != null ? _a : 0 : x;
}
const YPosition_ = { detected: 0, above: 1, below: 2 };
function toYposition(y) {
  var _a;
  return typeof y == "string" ? (_a = YPosition_[y]) != null ? _a : 0 : y;
}
const AnchorBoundaryType_ = { bounded: 0, unbounded: 1 };
function toAnchorBoundaryType(type) {
  var _a;
  return typeof type == "string" ? (_a = AnchorBoundaryType_[type]) != null ? _a : "0" : type;
}

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", mergeProps({
    ref: "root",
    class: ["mdc-tooltip", _ctx.classes]
  }, _ctx.rootAttrs, {
    style: _ctx.styles,
    role: "tooltip",
    onTransitionend: _cache[1] || (_cache[1] = (...args) => _ctx.handleTransitionEnd && _ctx.handleTransitionEnd(...args))
  }), [
    createVNode("div", {
      style: _ctx.surfaceStyle,
      class: "mdc-tooltip__surface"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 4)
  ], 16);
}

script$1.render = render$1;
script$1.__file = "src/tooltip/tooltip.vue";

var tooltip = BasePlugin({
  mcwTooltip: script$1
});

const { cssClasses, strings } = MDCTopAppBarFoundation;
var script = {
  name: "mcw-top-app-bar",
  props: {
    tag: { type: String, default: "header" },
    scrollTarget: HTMLElement
  },
  emits: ["nav"],
  setup(props, { emit }) {
    const uiState = reactive({
      rootStyles: {},
      rootClasses: {
        "mdc-top-app-bar": true
      },
      myScrollTarget: props.scrollTarget || window,
      root: void 0
    });
    let foundation;
    let navIcon;
    let iconRipples = [];
    const handleNavigationClick = (event) => foundation.handleNavigationClick(event);
    const handleTargetScroll = (event_) => foundation.handleTargetScroll(event_);
    const handleWindowResize = (event_) => foundation.handleWindowResize(event_);
    const adapter = {
      addClass: (className) => uiState.rootClasses = { ...uiState.rootClasses, [className]: true },
      removeClass: (className) => {
        const { [className]: removed, ...rest } = uiState.rootClasses;
        uiState.rootClasses = rest;
      },
      hasClass: (className) => Boolean(uiState.rootClasses[className]),
      setStyle: (property, value) => uiState.rootStyles = { ...uiState.rootStyles, [property]: value },
      getTopAppBarHeight: () => uiState.root.clientHeight,
      notifyNavigationIconClicked: () => {
        emit("nav", {});
        emitCustomEvent(uiState.root, strings.NAVIGATION_EVENT, {}, true);
      },
      getViewportScrollY: () => {
        const st = uiState.myScrollTarget;
        return st.pageYOffset !== void 0 ? st.pageYOffset : st.scrollTop;
      },
      getTotalActionItems: () => uiState.root.querySelectorAll(strings.ACTION_ITEM_SELECTOR).length
    };
    watch(() => props.scrollTarget, (nv, ov) => {
      if (nv !== ov) {
        uiState.myScrollTarget.removeEventListener("scroll", handleTargetScroll);
        uiState.myScrollTarget = nv;
        uiState.myScrollTarget.addEventListener("scroll", handleTargetScroll);
      }
    });
    const setScrollTarget = (nv) => {
      uiState.myScrollTarget.removeEventListener("scroll", handleTargetScroll);
      uiState.myScrollTarget = nv;
      uiState.myScrollTarget.addEventListener("scroll", handleTargetScroll);
    };
    onMounted(() => {
      const isFixed = uiState.root.classList.contains(cssClasses.FIXED_CLASS);
      const isShort = uiState.root.classList.contains(cssClasses.SHORT_CLASS);
      if (isShort) {
        foundation = new MDCShortTopAppBarFoundation(adapter);
      } else if (isFixed) {
        foundation = new MDCFixedTopAppBarFoundation(adapter);
      } else {
        foundation = new MDCTopAppBarFoundation(adapter);
      }
      navIcon = uiState.root.querySelector(strings.NAVIGATION_ICON_SELECTOR);
      const icons = Array.prototype.slice.call(uiState.root.querySelectorAll(strings.ACTION_ITEM_SELECTOR));
      if (navIcon) {
        navIcon.addEventListener("click", handleNavigationClick);
        icons.push(navIcon);
      }
      iconRipples = icons.map((icon) => {
        const ripple = new RippleElement(icon);
        ripple.init();
        ripple.unbounded = true;
        return ripple;
      });
      uiState.myScrollTarget.addEventListener("scroll", handleTargetScroll);
      if (!isShort && !isFixed) {
        window.addEventListener("resize", handleWindowResize);
      }
      foundation.init();
    });
    onBeforeUnmount(() => {
      var _a;
      if (navIcon) {
        navIcon.removeEventListener("click", handleNavigationClick);
      }
      for (const iconRipple of iconRipples)
        iconRipple.destroy();
      uiState.myScrollTarget.removeEventListener("scroll", handleTargetScroll);
      (_a = uiState.myScrollTarget) == null ? void 0 : _a.removeEventListener("scroll", foundation.handleTargetScroll);
      const isFixed = uiState.root.classList.contains(cssClasses.FIXED_CLASS);
      const isShort = uiState.root.classList.contains(cssClasses.SHORT_CLASS);
      if (!isShort && !isFixed) {
        window.removeEventListener("resize", handleWindowResize);
      }
      foundation.destroy();
    });
    return { ...toRefs(uiState), setScrollTarget };
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    ref: "root",
    class: _ctx.rootClasses,
    style: _ctx.rootStyles
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "style"]);
}

script.render = render;
script.__file = "src/top-app-bar/top-app-bar.vue";

var topAppBar = BasePlugin({
  mcwTopAppBar: script
});

var index = {
  install(vm) {
    vm.use(banner);
    vm.use(button);
    vm.use(card);
    vm.use(circularProgress);
    vm.use(checkbox);
    vm.use(chips);
    vm.use(dataTable);
    vm.use(dialog);
    vm.use(drawer);
    vm.use(fab);
    vm.use(floatingLabel);
    vm.use(iconButton);
    vm.use(layoutGrid);
    vm.use(lineRipple);
    vm.use(linearProgress);
    vm.use(list);
    vm.use(materialIcon);
    vm.use(menu);
    vm.use(notchedOutline);
    vm.use(radio);
    vm.use(segmentedButton);
    vm.use(select);
    vm.use(slider);
    vm.use(snackbar);
    vm.use(switchControl);
    vm.use(tabs);
    vm.use(textfield);
    vm.use(tooltip);
    vm.use(topAppBar);
  }
};

export default index;
export { banner, index$1 as base, button, card, checkbox, chips, circularProgress, dataTable, dialog, drawer, fab, floatingLabel, iconButton, layoutGrid, lineRipple, linearProgress, list, materialIcon, menu, notchedOutline, radio, segmentedButton, select, slider, snackbar, switchControl, tabs, textfield, tooltip, topAppBar };
