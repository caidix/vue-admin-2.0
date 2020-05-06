export class Fields {
  constructor(fields) {
    this.fields = fields
    this.container = []
    this.showCondition = () => true
  }
  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  setShowCondition(showCondition) {
    this.showCondition = showCondition;
    return this;
  }
  isShow(context) {
    return this.showCondition(context)
  }
  getFields(context) {
    const fields = this.isShow(context) ? this.fields : []
    return fields.filter(field => field.isShow(context))
  }
  getField(prop) {
    return this.fields.filter(field => field.prop === prop)
  }
}

export class Field {
  constructor({
    id,
    label,
    width,
    prop,
    props,
    type,
    enums,
    defaultValue,
    required,
    isExpand,
    isImage,
    inputClass
  }) {
    this.id = id
    this.label = label
    this.width = width
    this.prop = prop
    this.props = props
    this.type = type
    this.enums = enums
    this.defaultValue = defaultValue
    this.required = required
    this.inputClass = inputClass
    this.isExpand = isExpand
    this.isImage = isImage
    this.showCondition = () => true
  }
  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
  setShowCondition(showCondition) {
    this.showCondition = showCondition;
    return this;
  }
  isShow(context) {
    return this.showCondition(context)
  }
  setProp(prop) {
    this.prop = prop;
    return this;
  }
  setProps(props) {
    this.props = props;
    return this;
  }
  resetProps() {
    this.props = undefined;
    delete this.props;
    return this;
  }
  resetShowCondition() {
    this.showCondition = () => true;
  }
  setLabel(label) {
    this.label = label;
    return this;
  }
  resetLabel() {
    this.label = undefined;
    delete this.label;
    return this;
  }
  setWidth(width) {
    this.width = width;
    return this;
  }
  resetWidth() {
    this.width = undefined;
    delete this.width;
    return this;
  }
  setType(type) {
    this.type = type;
    return this;
  }
  resetType() {
    this.type = undefined;
    delete this.type;
    return this;
  }
  setEnums(enums) {
    this.enums = enums;
    return this;
  }
  resetEnums() {
    this.enums = undefined;
    delete this.enums;
    return this;
  }
  setDefaultValue(defaultValue) {
    this.defaultValue = defaultValue;
    return this;
  }
  resetDefaultValue() {
    this.defaultValue = undefined;
    delete this.defaultValue;
    return this;
  }
  setRequired(required) {
    this.required = required;
    return this;
  }
  resetRequired() {
    this.required = undefined;
    delete this.required;
    return this;
  }
  setIsExpand(isExpand) {
    this.isExpand = isExpand;
    return this;
  }
  resetIsExpand() {
    this.isExpand = undefined;
    delete this.isExpand;
    return this;
  }
  setIsImage(isImage) {
    this.isImage = isImage;
    return this;
  }
  resetIsEmage() {
    this.isImage = undefined;
    delete this.isImage;
    return this;
  }
}
