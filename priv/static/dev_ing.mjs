// build/dev/javascript/prelude.mjs
var CustomType = class {
  withFields(fields) {
    let properties = Object.keys(this).map(
      (label) => label in fields ? fields[label] : this[label]
    );
    return new this.constructor(...properties);
  }
};
var List = class {
  static fromArray(array3, tail) {
    let t = tail || new Empty();
    for (let i = array3.length - 1; i >= 0; --i) {
      t = new NonEmpty(array3[i], t);
    }
    return t;
  }
  [Symbol.iterator]() {
    return new ListIterator(this);
  }
  toArray() {
    return [...this];
  }
  // @internal
  atLeastLength(desired) {
    let current = this;
    while (desired-- > 0 && current) current = current.tail;
    return current !== void 0;
  }
  // @internal
  hasLength(desired) {
    let current = this;
    while (desired-- > 0 && current) current = current.tail;
    return desired === -1 && current instanceof Empty;
  }
  // @internal
  countLength() {
    let current = this;
    let length2 = 0;
    while (current) {
      current = current.tail;
      length2++;
    }
    return length2 - 1;
  }
};
function prepend(element4, tail) {
  return new NonEmpty(element4, tail);
}
function toList(elements, tail) {
  return List.fromArray(elements, tail);
}
var ListIterator = class {
  #current;
  constructor(current) {
    this.#current = current;
  }
  next() {
    if (this.#current instanceof Empty) {
      return { done: true };
    } else {
      let { head, tail } = this.#current;
      this.#current = tail;
      return { value: head, done: false };
    }
  }
};
var Empty = class extends List {
};
var NonEmpty = class extends List {
  constructor(head, tail) {
    super();
    this.head = head;
    this.tail = tail;
  }
};
var Result = class _Result extends CustomType {
  // @internal
  static isResult(data) {
    return data instanceof _Result;
  }
};
var Ok = class extends Result {
  constructor(value) {
    super();
    this[0] = value;
  }
  // @internal
  isOk() {
    return true;
  }
};
var Error = class extends Result {
  constructor(detail) {
    super();
    this[0] = detail;
  }
  // @internal
  isOk() {
    return false;
  }
};
function makeError(variant, file, module, line, fn, message, extra) {
  let error = new globalThis.Error(message);
  error.gleam_error = variant;
  error.file = file;
  error.module = module;
  error.line = line;
  error.function = fn;
  error.fn = fn;
  for (let k in extra) error[k] = extra[k];
  return error;
}

// build/dev/javascript/gleam_stdlib/gleam/option.mjs
var Some = class extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
};
var None = class extends CustomType {
};

// build/dev/javascript/gleam_stdlib/dict.mjs
var SHIFT = 5;
var BUCKET_SIZE = Math.pow(2, SHIFT);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

// build/dev/javascript/gleam_stdlib/gleam/order.mjs
var Lt = class extends CustomType {
};
var Eq = class extends CustomType {
};
var Gt = class extends CustomType {
};

// build/dev/javascript/gleam_stdlib/gleam/string.mjs
function concat_loop(loop$strings, loop$accumulator) {
  while (true) {
    let strings = loop$strings;
    let accumulator = loop$accumulator;
    if (strings instanceof Empty) {
      return accumulator;
    } else {
      let string5 = strings.head;
      let strings$1 = strings.tail;
      loop$strings = strings$1;
      loop$accumulator = accumulator + string5;
    }
  }
}
function concat2(strings) {
  return concat_loop(strings, "");
}

// build/dev/javascript/gleam_stdlib/gleam/dynamic/decode.mjs
var Decoder = class extends CustomType {
  constructor(function$) {
    super();
    this.function = function$;
  }
};
function run(data, decoder) {
  let $ = decoder.function(data);
  let maybe_invalid_data;
  let errors;
  maybe_invalid_data = $[0];
  errors = $[1];
  if (errors instanceof Empty) {
    return new Ok(maybe_invalid_data);
  } else {
    return new Error(errors);
  }
}
function success(data) {
  return new Decoder((_) => {
    return [data, toList([])];
  });
}
function map2(decoder, transformer) {
  return new Decoder(
    (d) => {
      let $ = decoder.function(d);
      let data;
      let errors;
      data = $[0];
      errors = $[1];
      return [transformer(data), errors];
    }
  );
}

// build/dev/javascript/gleam_stdlib/gleam_stdlib.mjs
function to_string(term) {
  return term.toString();
}
function contains_string(haystack, needle) {
  return haystack.indexOf(needle) >= 0;
}
function starts_with(haystack, needle) {
  return haystack.startsWith(needle);
}
var unicode_whitespaces = [
  " ",
  // Space
  "	",
  // Horizontal tab
  "\n",
  // Line feed
  "\v",
  // Vertical tab
  "\f",
  // Form feed
  "\r",
  // Carriage return
  "\x85",
  // Next line
  "\u2028",
  // Line separator
  "\u2029"
  // Paragraph separator
].join("");
var trim_start_regex = /* @__PURE__ */ new RegExp(
  `^[${unicode_whitespaces}]*`
);
var trim_end_regex = /* @__PURE__ */ new RegExp(`[${unicode_whitespaces}]*$`);

// build/dev/javascript/gleam_stdlib/gleam/list.mjs
var Ascending = class extends CustomType {
};
var Descending = class extends CustomType {
};
function reverse_and_prepend(loop$prefix, loop$suffix) {
  while (true) {
    let prefix = loop$prefix;
    let suffix = loop$suffix;
    if (prefix instanceof Empty) {
      return suffix;
    } else {
      let first$1 = prefix.head;
      let rest$1 = prefix.tail;
      loop$prefix = rest$1;
      loop$suffix = prepend(first$1, suffix);
    }
  }
}
function reverse(list4) {
  return reverse_and_prepend(list4, toList([]));
}
function append_loop(loop$first, loop$second) {
  while (true) {
    let first = loop$first;
    let second = loop$second;
    if (first instanceof Empty) {
      return second;
    } else {
      let first$1 = first.head;
      let rest$1 = first.tail;
      loop$first = rest$1;
      loop$second = prepend(first$1, second);
    }
  }
}
function append2(first, second) {
  return append_loop(reverse(first), second);
}
function fold2(loop$list, loop$initial, loop$fun) {
  while (true) {
    let list4 = loop$list;
    let initial = loop$initial;
    let fun = loop$fun;
    if (list4 instanceof Empty) {
      return initial;
    } else {
      let first$1 = list4.head;
      let rest$1 = list4.tail;
      loop$list = rest$1;
      loop$initial = fun(initial, first$1);
      loop$fun = fun;
    }
  }
}
function any(loop$list, loop$predicate) {
  while (true) {
    let list4 = loop$list;
    let predicate = loop$predicate;
    if (list4 instanceof Empty) {
      return false;
    } else {
      let first$1 = list4.head;
      let rest$1 = list4.tail;
      let $ = predicate(first$1);
      if ($) {
        return $;
      } else {
        loop$list = rest$1;
        loop$predicate = predicate;
      }
    }
  }
}
function sequences(loop$list, loop$compare, loop$growing, loop$direction, loop$prev, loop$acc) {
  while (true) {
    let list4 = loop$list;
    let compare4 = loop$compare;
    let growing = loop$growing;
    let direction = loop$direction;
    let prev = loop$prev;
    let acc = loop$acc;
    let growing$1 = prepend(prev, growing);
    if (list4 instanceof Empty) {
      if (direction instanceof Ascending) {
        return prepend(reverse(growing$1), acc);
      } else {
        return prepend(growing$1, acc);
      }
    } else {
      let new$1 = list4.head;
      let rest$1 = list4.tail;
      let $ = compare4(prev, new$1);
      if (direction instanceof Ascending) {
        if ($ instanceof Lt) {
          loop$list = rest$1;
          loop$compare = compare4;
          loop$growing = growing$1;
          loop$direction = direction;
          loop$prev = new$1;
          loop$acc = acc;
        } else if ($ instanceof Eq) {
          loop$list = rest$1;
          loop$compare = compare4;
          loop$growing = growing$1;
          loop$direction = direction;
          loop$prev = new$1;
          loop$acc = acc;
        } else {
          let _block;
          if (direction instanceof Ascending) {
            _block = prepend(reverse(growing$1), acc);
          } else {
            _block = prepend(growing$1, acc);
          }
          let acc$1 = _block;
          if (rest$1 instanceof Empty) {
            return prepend(toList([new$1]), acc$1);
          } else {
            let next = rest$1.head;
            let rest$2 = rest$1.tail;
            let _block$1;
            let $1 = compare4(new$1, next);
            if ($1 instanceof Lt) {
              _block$1 = new Ascending();
            } else if ($1 instanceof Eq) {
              _block$1 = new Ascending();
            } else {
              _block$1 = new Descending();
            }
            let direction$1 = _block$1;
            loop$list = rest$2;
            loop$compare = compare4;
            loop$growing = toList([new$1]);
            loop$direction = direction$1;
            loop$prev = next;
            loop$acc = acc$1;
          }
        }
      } else if ($ instanceof Lt) {
        let _block;
        if (direction instanceof Ascending) {
          _block = prepend(reverse(growing$1), acc);
        } else {
          _block = prepend(growing$1, acc);
        }
        let acc$1 = _block;
        if (rest$1 instanceof Empty) {
          return prepend(toList([new$1]), acc$1);
        } else {
          let next = rest$1.head;
          let rest$2 = rest$1.tail;
          let _block$1;
          let $1 = compare4(new$1, next);
          if ($1 instanceof Lt) {
            _block$1 = new Ascending();
          } else if ($1 instanceof Eq) {
            _block$1 = new Ascending();
          } else {
            _block$1 = new Descending();
          }
          let direction$1 = _block$1;
          loop$list = rest$2;
          loop$compare = compare4;
          loop$growing = toList([new$1]);
          loop$direction = direction$1;
          loop$prev = next;
          loop$acc = acc$1;
        }
      } else if ($ instanceof Eq) {
        let _block;
        if (direction instanceof Ascending) {
          _block = prepend(reverse(growing$1), acc);
        } else {
          _block = prepend(growing$1, acc);
        }
        let acc$1 = _block;
        if (rest$1 instanceof Empty) {
          return prepend(toList([new$1]), acc$1);
        } else {
          let next = rest$1.head;
          let rest$2 = rest$1.tail;
          let _block$1;
          let $1 = compare4(new$1, next);
          if ($1 instanceof Lt) {
            _block$1 = new Ascending();
          } else if ($1 instanceof Eq) {
            _block$1 = new Ascending();
          } else {
            _block$1 = new Descending();
          }
          let direction$1 = _block$1;
          loop$list = rest$2;
          loop$compare = compare4;
          loop$growing = toList([new$1]);
          loop$direction = direction$1;
          loop$prev = next;
          loop$acc = acc$1;
        }
      } else {
        loop$list = rest$1;
        loop$compare = compare4;
        loop$growing = growing$1;
        loop$direction = direction;
        loop$prev = new$1;
        loop$acc = acc;
      }
    }
  }
}
function merge_ascendings(loop$list1, loop$list2, loop$compare, loop$acc) {
  while (true) {
    let list1 = loop$list1;
    let list22 = loop$list2;
    let compare4 = loop$compare;
    let acc = loop$acc;
    if (list1 instanceof Empty) {
      let list4 = list22;
      return reverse_and_prepend(list4, acc);
    } else if (list22 instanceof Empty) {
      let list4 = list1;
      return reverse_and_prepend(list4, acc);
    } else {
      let first1 = list1.head;
      let rest1 = list1.tail;
      let first2 = list22.head;
      let rest2 = list22.tail;
      let $ = compare4(first1, first2);
      if ($ instanceof Lt) {
        loop$list1 = rest1;
        loop$list2 = list22;
        loop$compare = compare4;
        loop$acc = prepend(first1, acc);
      } else if ($ instanceof Eq) {
        loop$list1 = list1;
        loop$list2 = rest2;
        loop$compare = compare4;
        loop$acc = prepend(first2, acc);
      } else {
        loop$list1 = list1;
        loop$list2 = rest2;
        loop$compare = compare4;
        loop$acc = prepend(first2, acc);
      }
    }
  }
}
function merge_ascending_pairs(loop$sequences, loop$compare, loop$acc) {
  while (true) {
    let sequences2 = loop$sequences;
    let compare4 = loop$compare;
    let acc = loop$acc;
    if (sequences2 instanceof Empty) {
      return reverse(acc);
    } else {
      let $ = sequences2.tail;
      if ($ instanceof Empty) {
        let sequence = sequences2.head;
        return reverse(prepend(reverse(sequence), acc));
      } else {
        let ascending1 = sequences2.head;
        let ascending2 = $.head;
        let rest$1 = $.tail;
        let descending = merge_ascendings(
          ascending1,
          ascending2,
          compare4,
          toList([])
        );
        loop$sequences = rest$1;
        loop$compare = compare4;
        loop$acc = prepend(descending, acc);
      }
    }
  }
}
function merge_descendings(loop$list1, loop$list2, loop$compare, loop$acc) {
  while (true) {
    let list1 = loop$list1;
    let list22 = loop$list2;
    let compare4 = loop$compare;
    let acc = loop$acc;
    if (list1 instanceof Empty) {
      let list4 = list22;
      return reverse_and_prepend(list4, acc);
    } else if (list22 instanceof Empty) {
      let list4 = list1;
      return reverse_and_prepend(list4, acc);
    } else {
      let first1 = list1.head;
      let rest1 = list1.tail;
      let first2 = list22.head;
      let rest2 = list22.tail;
      let $ = compare4(first1, first2);
      if ($ instanceof Lt) {
        loop$list1 = list1;
        loop$list2 = rest2;
        loop$compare = compare4;
        loop$acc = prepend(first2, acc);
      } else if ($ instanceof Eq) {
        loop$list1 = rest1;
        loop$list2 = list22;
        loop$compare = compare4;
        loop$acc = prepend(first1, acc);
      } else {
        loop$list1 = rest1;
        loop$list2 = list22;
        loop$compare = compare4;
        loop$acc = prepend(first1, acc);
      }
    }
  }
}
function merge_descending_pairs(loop$sequences, loop$compare, loop$acc) {
  while (true) {
    let sequences2 = loop$sequences;
    let compare4 = loop$compare;
    let acc = loop$acc;
    if (sequences2 instanceof Empty) {
      return reverse(acc);
    } else {
      let $ = sequences2.tail;
      if ($ instanceof Empty) {
        let sequence = sequences2.head;
        return reverse(prepend(reverse(sequence), acc));
      } else {
        let descending1 = sequences2.head;
        let descending2 = $.head;
        let rest$1 = $.tail;
        let ascending = merge_descendings(
          descending1,
          descending2,
          compare4,
          toList([])
        );
        loop$sequences = rest$1;
        loop$compare = compare4;
        loop$acc = prepend(ascending, acc);
      }
    }
  }
}
function merge_all(loop$sequences, loop$direction, loop$compare) {
  while (true) {
    let sequences2 = loop$sequences;
    let direction = loop$direction;
    let compare4 = loop$compare;
    if (sequences2 instanceof Empty) {
      return sequences2;
    } else if (direction instanceof Ascending) {
      let $ = sequences2.tail;
      if ($ instanceof Empty) {
        let sequence = sequences2.head;
        return sequence;
      } else {
        let sequences$1 = merge_ascending_pairs(sequences2, compare4, toList([]));
        loop$sequences = sequences$1;
        loop$direction = new Descending();
        loop$compare = compare4;
      }
    } else {
      let $ = sequences2.tail;
      if ($ instanceof Empty) {
        let sequence = sequences2.head;
        return reverse(sequence);
      } else {
        let sequences$1 = merge_descending_pairs(sequences2, compare4, toList([]));
        loop$sequences = sequences$1;
        loop$direction = new Ascending();
        loop$compare = compare4;
      }
    }
  }
}
function sort(list4, compare4) {
  if (list4 instanceof Empty) {
    return list4;
  } else {
    let $ = list4.tail;
    if ($ instanceof Empty) {
      return list4;
    } else {
      let x = list4.head;
      let y = $.head;
      let rest$1 = $.tail;
      let _block;
      let $1 = compare4(x, y);
      if ($1 instanceof Lt) {
        _block = new Ascending();
      } else if ($1 instanceof Eq) {
        _block = new Ascending();
      } else {
        _block = new Descending();
      }
      let direction = _block;
      let sequences$1 = sequences(
        rest$1,
        compare4,
        toList([x]),
        direction,
        y,
        toList([])
      );
      return merge_all(sequences$1, new Ascending(), compare4);
    }
  }
}

// build/dev/javascript/lustre/lustre/internals/constants.ffi.mjs
var document2 = () => globalThis?.document;
var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var SUPPORTS_MOVE_BEFORE = !!globalThis.HTMLElement?.prototype?.moveBefore;

// build/dev/javascript/lustre/lustre/internals/constants.mjs
var empty_list = /* @__PURE__ */ toList([]);
var option_none = /* @__PURE__ */ new None();

// build/dev/javascript/lustre/lustre/vdom/vattr.ffi.mjs
var GT = /* @__PURE__ */ new Gt();
var LT = /* @__PURE__ */ new Lt();
var EQ = /* @__PURE__ */ new Eq();
function compare3(a2, b) {
  if (a2.name === b.name) {
    return EQ;
  } else if (a2.name < b.name) {
    return LT;
  } else {
    return GT;
  }
}

// build/dev/javascript/lustre/lustre/vdom/vattr.mjs
var Attribute = class extends CustomType {
  constructor(kind, name, value) {
    super();
    this.kind = kind;
    this.name = name;
    this.value = value;
  }
};
var Property = class extends CustomType {
  constructor(kind, name, value) {
    super();
    this.kind = kind;
    this.name = name;
    this.value = value;
  }
};
var Event2 = class extends CustomType {
  constructor(kind, name, handler, include, prevent_default, stop_propagation, immediate, debounce, throttle) {
    super();
    this.kind = kind;
    this.name = name;
    this.handler = handler;
    this.include = include;
    this.prevent_default = prevent_default;
    this.stop_propagation = stop_propagation;
    this.immediate = immediate;
    this.debounce = debounce;
    this.throttle = throttle;
  }
};
var Handler = class extends CustomType {
  constructor(prevent_default, stop_propagation, message) {
    super();
    this.prevent_default = prevent_default;
    this.stop_propagation = stop_propagation;
    this.message = message;
  }
};
var Never = class extends CustomType {
  constructor(kind) {
    super();
    this.kind = kind;
  }
};
function merge(loop$attributes, loop$merged) {
  while (true) {
    let attributes = loop$attributes;
    let merged = loop$merged;
    if (attributes instanceof Empty) {
      return merged;
    } else {
      let $ = attributes.head;
      if ($ instanceof Attribute) {
        let $1 = $.name;
        if ($1 === "") {
          let rest = attributes.tail;
          loop$attributes = rest;
          loop$merged = merged;
        } else if ($1 === "class") {
          let $2 = $.value;
          if ($2 === "") {
            let rest = attributes.tail;
            loop$attributes = rest;
            loop$merged = merged;
          } else {
            let $3 = attributes.tail;
            if ($3 instanceof Empty) {
              let attribute$1 = $;
              let rest = $3;
              loop$attributes = rest;
              loop$merged = prepend(attribute$1, merged);
            } else {
              let $4 = $3.head;
              if ($4 instanceof Attribute) {
                let $5 = $4.name;
                if ($5 === "class") {
                  let kind = $.kind;
                  let class1 = $2;
                  let rest = $3.tail;
                  let class2 = $4.value;
                  let value = class1 + " " + class2;
                  let attribute$1 = new Attribute(kind, "class", value);
                  loop$attributes = prepend(attribute$1, rest);
                  loop$merged = merged;
                } else {
                  let attribute$1 = $;
                  let rest = $3;
                  loop$attributes = rest;
                  loop$merged = prepend(attribute$1, merged);
                }
              } else {
                let attribute$1 = $;
                let rest = $3;
                loop$attributes = rest;
                loop$merged = prepend(attribute$1, merged);
              }
            }
          }
        } else if ($1 === "style") {
          let $2 = $.value;
          if ($2 === "") {
            let rest = attributes.tail;
            loop$attributes = rest;
            loop$merged = merged;
          } else {
            let $3 = attributes.tail;
            if ($3 instanceof Empty) {
              let attribute$1 = $;
              let rest = $3;
              loop$attributes = rest;
              loop$merged = prepend(attribute$1, merged);
            } else {
              let $4 = $3.head;
              if ($4 instanceof Attribute) {
                let $5 = $4.name;
                if ($5 === "style") {
                  let kind = $.kind;
                  let style1 = $2;
                  let rest = $3.tail;
                  let style2 = $4.value;
                  let value = style1 + ";" + style2;
                  let attribute$1 = new Attribute(kind, "style", value);
                  loop$attributes = prepend(attribute$1, rest);
                  loop$merged = merged;
                } else {
                  let attribute$1 = $;
                  let rest = $3;
                  loop$attributes = rest;
                  loop$merged = prepend(attribute$1, merged);
                }
              } else {
                let attribute$1 = $;
                let rest = $3;
                loop$attributes = rest;
                loop$merged = prepend(attribute$1, merged);
              }
            }
          }
        } else {
          let attribute$1 = $;
          let rest = attributes.tail;
          loop$attributes = rest;
          loop$merged = prepend(attribute$1, merged);
        }
      } else {
        let attribute$1 = $;
        let rest = attributes.tail;
        loop$attributes = rest;
        loop$merged = prepend(attribute$1, merged);
      }
    }
  }
}
function prepare(attributes) {
  if (attributes instanceof Empty) {
    return attributes;
  } else {
    let $ = attributes.tail;
    if ($ instanceof Empty) {
      return attributes;
    } else {
      let _pipe = attributes;
      let _pipe$1 = sort(_pipe, (a2, b) => {
        return compare3(b, a2);
      });
      return merge(_pipe$1, empty_list);
    }
  }
}
var attribute_kind = 0;
function attribute(name, value) {
  return new Attribute(attribute_kind, name, value);
}
var property_kind = 1;
var event_kind = 2;
function event(name, handler, include, prevent_default, stop_propagation, immediate, debounce, throttle) {
  return new Event2(
    event_kind,
    name,
    handler,
    include,
    prevent_default,
    stop_propagation,
    immediate,
    debounce,
    throttle
  );
}
var never_kind = 0;
var never = /* @__PURE__ */ new Never(never_kind);
var always_kind = 2;

// build/dev/javascript/lustre/lustre/attribute.mjs
function attribute2(name, value) {
  return attribute(name, value);
}
function class$(name) {
  return attribute2("class", name);
}
function href(url) {
  return attribute2("href", url);
}
function role(name) {
  return attribute2("role", name);
}

// build/dev/javascript/gleam_stdlib/gleam/function.mjs
function identity3(x) {
  return x;
}

// build/dev/javascript/lustre/lustre/internals/mutable_map.ffi.mjs
function empty() {
  return null;
}
function get(map4, key) {
  const value = map4?.get(key);
  if (value != null) {
    return new Ok(value);
  } else {
    return new Error(void 0);
  }
}
function has_key2(map4, key) {
  return map4 && map4.has(key);
}
function insert2(map4, key, value) {
  map4 ??= /* @__PURE__ */ new Map();
  map4.set(key, value);
  return map4;
}
function remove(map4, key) {
  map4?.delete(key);
  return map4;
}

// build/dev/javascript/lustre/lustre/vdom/path.mjs
var Root = class extends CustomType {
};
var Key = class extends CustomType {
  constructor(key, parent) {
    super();
    this.key = key;
    this.parent = parent;
  }
};
var Index = class extends CustomType {
  constructor(index2, parent) {
    super();
    this.index = index2;
    this.parent = parent;
  }
};
function do_matches(loop$path, loop$candidates) {
  while (true) {
    let path2 = loop$path;
    let candidates = loop$candidates;
    if (candidates instanceof Empty) {
      return false;
    } else {
      let candidate = candidates.head;
      let rest = candidates.tail;
      let $ = starts_with(path2, candidate);
      if ($) {
        return $;
      } else {
        loop$path = path2;
        loop$candidates = rest;
      }
    }
  }
}
function add2(parent, index2, key) {
  if (key === "") {
    return new Index(index2, parent);
  } else {
    return new Key(key, parent);
  }
}
var root2 = /* @__PURE__ */ new Root();
var separator_element = "	";
function do_to_string(loop$path, loop$acc) {
  while (true) {
    let path2 = loop$path;
    let acc = loop$acc;
    if (path2 instanceof Root) {
      if (acc instanceof Empty) {
        return "";
      } else {
        let segments = acc.tail;
        return concat2(segments);
      }
    } else if (path2 instanceof Key) {
      let key = path2.key;
      let parent = path2.parent;
      loop$path = parent;
      loop$acc = prepend(separator_element, prepend(key, acc));
    } else {
      let index2 = path2.index;
      let parent = path2.parent;
      loop$path = parent;
      loop$acc = prepend(
        separator_element,
        prepend(to_string(index2), acc)
      );
    }
  }
}
function to_string2(path2) {
  return do_to_string(path2, toList([]));
}
function matches(path2, candidates) {
  if (candidates instanceof Empty) {
    return false;
  } else {
    return do_matches(to_string2(path2), candidates);
  }
}
var separator_event = "\n";
function event2(path2, event4) {
  return do_to_string(path2, toList([separator_event, event4]));
}

// build/dev/javascript/lustre/lustre/vdom/vnode.mjs
var Fragment = class extends CustomType {
  constructor(kind, key, mapper, children, keyed_children) {
    super();
    this.kind = kind;
    this.key = key;
    this.mapper = mapper;
    this.children = children;
    this.keyed_children = keyed_children;
  }
};
var Element = class extends CustomType {
  constructor(kind, key, mapper, namespace2, tag, attributes, children, keyed_children, self_closing, void$) {
    super();
    this.kind = kind;
    this.key = key;
    this.mapper = mapper;
    this.namespace = namespace2;
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.keyed_children = keyed_children;
    this.self_closing = self_closing;
    this.void = void$;
  }
};
var Text = class extends CustomType {
  constructor(kind, key, mapper, content2) {
    super();
    this.kind = kind;
    this.key = key;
    this.mapper = mapper;
    this.content = content2;
  }
};
var UnsafeInnerHtml = class extends CustomType {
  constructor(kind, key, mapper, namespace2, tag, attributes, inner_html) {
    super();
    this.kind = kind;
    this.key = key;
    this.mapper = mapper;
    this.namespace = namespace2;
    this.tag = tag;
    this.attributes = attributes;
    this.inner_html = inner_html;
  }
};
function is_void_element(tag, namespace2) {
  if (namespace2 === "") {
    if (tag === "area") {
      return true;
    } else if (tag === "base") {
      return true;
    } else if (tag === "br") {
      return true;
    } else if (tag === "col") {
      return true;
    } else if (tag === "embed") {
      return true;
    } else if (tag === "hr") {
      return true;
    } else if (tag === "img") {
      return true;
    } else if (tag === "input") {
      return true;
    } else if (tag === "link") {
      return true;
    } else if (tag === "meta") {
      return true;
    } else if (tag === "param") {
      return true;
    } else if (tag === "source") {
      return true;
    } else if (tag === "track") {
      return true;
    } else if (tag === "wbr") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function to_keyed(key, node) {
  if (node instanceof Fragment) {
    return new Fragment(
      node.kind,
      key,
      node.mapper,
      node.children,
      node.keyed_children
    );
  } else if (node instanceof Element) {
    return new Element(
      node.kind,
      key,
      node.mapper,
      node.namespace,
      node.tag,
      node.attributes,
      node.children,
      node.keyed_children,
      node.self_closing,
      node.void
    );
  } else if (node instanceof Text) {
    return new Text(node.kind, key, node.mapper, node.content);
  } else {
    return new UnsafeInnerHtml(
      node.kind,
      key,
      node.mapper,
      node.namespace,
      node.tag,
      node.attributes,
      node.inner_html
    );
  }
}
var fragment_kind = 0;
function fragment(key, mapper, children, keyed_children) {
  return new Fragment(fragment_kind, key, mapper, children, keyed_children);
}
var element_kind = 1;
function element(key, mapper, namespace2, tag, attributes, children, keyed_children, self_closing, void$) {
  return new Element(
    element_kind,
    key,
    mapper,
    namespace2,
    tag,
    prepare(attributes),
    children,
    keyed_children,
    self_closing,
    void$ || is_void_element(tag, namespace2)
  );
}
var text_kind = 2;
function text(key, mapper, content2) {
  return new Text(text_kind, key, mapper, content2);
}
var unsafe_inner_html_kind = 3;

// build/dev/javascript/lustre/lustre/internals/equals.ffi.mjs
var isReferenceEqual = (a2, b) => a2 === b;
var isEqual2 = (a2, b) => {
  if (a2 === b) {
    return true;
  }
  if (a2 == null || b == null) {
    return false;
  }
  const type = typeof a2;
  if (type !== typeof b) {
    return false;
  }
  if (type !== "object") {
    return false;
  }
  const ctor = a2.constructor;
  if (ctor !== b.constructor) {
    return false;
  }
  if (Array.isArray(a2)) {
    return areArraysEqual(a2, b);
  }
  return areObjectsEqual(a2, b);
};
var areArraysEqual = (a2, b) => {
  let index2 = a2.length;
  if (index2 !== b.length) {
    return false;
  }
  while (index2--) {
    if (!isEqual2(a2[index2], b[index2])) {
      return false;
    }
  }
  return true;
};
var areObjectsEqual = (a2, b) => {
  const properties = Object.keys(a2);
  let index2 = properties.length;
  if (Object.keys(b).length !== index2) {
    return false;
  }
  while (index2--) {
    const property3 = properties[index2];
    if (!Object.hasOwn(b, property3)) {
      return false;
    }
    if (!isEqual2(a2[property3], b[property3])) {
      return false;
    }
  }
  return true;
};

// build/dev/javascript/lustre/lustre/vdom/events.mjs
var Events = class extends CustomType {
  constructor(handlers, dispatched_paths, next_dispatched_paths) {
    super();
    this.handlers = handlers;
    this.dispatched_paths = dispatched_paths;
    this.next_dispatched_paths = next_dispatched_paths;
  }
};
function new$3() {
  return new Events(
    empty(),
    empty_list,
    empty_list
  );
}
function tick(events) {
  return new Events(
    events.handlers,
    events.next_dispatched_paths,
    empty_list
  );
}
function do_remove_event(handlers, path2, name) {
  return remove(handlers, event2(path2, name));
}
function remove_event(events, path2, name) {
  let handlers = do_remove_event(events.handlers, path2, name);
  return new Events(
    handlers,
    events.dispatched_paths,
    events.next_dispatched_paths
  );
}
function remove_attributes(handlers, path2, attributes) {
  return fold2(
    attributes,
    handlers,
    (events, attribute3) => {
      if (attribute3 instanceof Event2) {
        let name = attribute3.name;
        return do_remove_event(events, path2, name);
      } else {
        return events;
      }
    }
  );
}
function handle(events, path2, name, event4) {
  let next_dispatched_paths = prepend(path2, events.next_dispatched_paths);
  let events$1 = new Events(
    events.handlers,
    events.dispatched_paths,
    next_dispatched_paths
  );
  let $ = get(
    events$1.handlers,
    path2 + separator_event + name
  );
  if ($ instanceof Ok) {
    let handler = $[0];
    return [events$1, run(event4, handler)];
  } else {
    return [events$1, new Error(toList([]))];
  }
}
function has_dispatched_events(events, path2) {
  return matches(path2, events.dispatched_paths);
}
function do_add_event(handlers, mapper, path2, name, handler) {
  return insert2(
    handlers,
    event2(path2, name),
    map2(
      handler,
      (handler2) => {
        return new Handler(
          handler2.prevent_default,
          handler2.stop_propagation,
          identity3(mapper)(handler2.message)
        );
      }
    )
  );
}
function add_event(events, mapper, path2, name, handler) {
  let handlers = do_add_event(events.handlers, mapper, path2, name, handler);
  return new Events(
    handlers,
    events.dispatched_paths,
    events.next_dispatched_paths
  );
}
function add_attributes(handlers, mapper, path2, attributes) {
  return fold2(
    attributes,
    handlers,
    (events, attribute3) => {
      if (attribute3 instanceof Event2) {
        let name = attribute3.name;
        let handler = attribute3.handler;
        return do_add_event(events, mapper, path2, name, handler);
      } else {
        return events;
      }
    }
  );
}
function compose_mapper(mapper, child_mapper) {
  let $ = isReferenceEqual(mapper, identity3);
  let $1 = isReferenceEqual(child_mapper, identity3);
  if ($1) {
    return mapper;
  } else if ($) {
    return child_mapper;
  } else {
    return (msg) => {
      return mapper(child_mapper(msg));
    };
  }
}
function do_remove_children(loop$handlers, loop$path, loop$child_index, loop$children) {
  while (true) {
    let handlers = loop$handlers;
    let path2 = loop$path;
    let child_index = loop$child_index;
    let children = loop$children;
    if (children instanceof Empty) {
      return handlers;
    } else {
      let child = children.head;
      let rest = children.tail;
      let _pipe = handlers;
      let _pipe$1 = do_remove_child(_pipe, path2, child_index, child);
      loop$handlers = _pipe$1;
      loop$path = path2;
      loop$child_index = child_index + 1;
      loop$children = rest;
    }
  }
}
function do_remove_child(handlers, parent, child_index, child) {
  if (child instanceof Fragment) {
    let children = child.children;
    let path2 = add2(parent, child_index, child.key);
    return do_remove_children(handlers, path2, 0, children);
  } else if (child instanceof Element) {
    let attributes = child.attributes;
    let children = child.children;
    let path2 = add2(parent, child_index, child.key);
    let _pipe = handlers;
    let _pipe$1 = remove_attributes(_pipe, path2, attributes);
    return do_remove_children(_pipe$1, path2, 0, children);
  } else if (child instanceof Text) {
    return handlers;
  } else {
    let attributes = child.attributes;
    let path2 = add2(parent, child_index, child.key);
    return remove_attributes(handlers, path2, attributes);
  }
}
function remove_child(events, parent, child_index, child) {
  let handlers = do_remove_child(events.handlers, parent, child_index, child);
  return new Events(
    handlers,
    events.dispatched_paths,
    events.next_dispatched_paths
  );
}
function do_add_children(loop$handlers, loop$mapper, loop$path, loop$child_index, loop$children) {
  while (true) {
    let handlers = loop$handlers;
    let mapper = loop$mapper;
    let path2 = loop$path;
    let child_index = loop$child_index;
    let children = loop$children;
    if (children instanceof Empty) {
      return handlers;
    } else {
      let child = children.head;
      let rest = children.tail;
      let _pipe = handlers;
      let _pipe$1 = do_add_child(_pipe, mapper, path2, child_index, child);
      loop$handlers = _pipe$1;
      loop$mapper = mapper;
      loop$path = path2;
      loop$child_index = child_index + 1;
      loop$children = rest;
    }
  }
}
function do_add_child(handlers, mapper, parent, child_index, child) {
  if (child instanceof Fragment) {
    let children = child.children;
    let path2 = add2(parent, child_index, child.key);
    let composed_mapper = compose_mapper(mapper, child.mapper);
    return do_add_children(handlers, composed_mapper, path2, 0, children);
  } else if (child instanceof Element) {
    let attributes = child.attributes;
    let children = child.children;
    let path2 = add2(parent, child_index, child.key);
    let composed_mapper = compose_mapper(mapper, child.mapper);
    let _pipe = handlers;
    let _pipe$1 = add_attributes(_pipe, composed_mapper, path2, attributes);
    return do_add_children(_pipe$1, composed_mapper, path2, 0, children);
  } else if (child instanceof Text) {
    return handlers;
  } else {
    let attributes = child.attributes;
    let path2 = add2(parent, child_index, child.key);
    let composed_mapper = compose_mapper(mapper, child.mapper);
    return add_attributes(handlers, composed_mapper, path2, attributes);
  }
}
function add_child(events, mapper, parent, index2, child) {
  let handlers = do_add_child(events.handlers, mapper, parent, index2, child);
  return new Events(
    handlers,
    events.dispatched_paths,
    events.next_dispatched_paths
  );
}
function add_children(events, mapper, path2, child_index, children) {
  let handlers = do_add_children(
    events.handlers,
    mapper,
    path2,
    child_index,
    children
  );
  return new Events(
    handlers,
    events.dispatched_paths,
    events.next_dispatched_paths
  );
}

// build/dev/javascript/lustre/lustre/element.mjs
function element2(tag, attributes, children) {
  return element(
    "",
    identity3,
    "",
    tag,
    attributes,
    children,
    empty(),
    false,
    false
  );
}
function namespaced(namespace2, tag, attributes, children) {
  return element(
    "",
    identity3,
    namespace2,
    tag,
    attributes,
    children,
    empty(),
    false,
    false
  );
}
function text2(content2) {
  return text("", identity3, content2);
}
function none() {
  return text("", identity3, "");
}
function fragment2(children) {
  return fragment("", identity3, children, empty());
}

// build/dev/javascript/lustre/lustre/element/html.mjs
function aside(attrs, children) {
  return element2("aside", attrs, children);
}
function footer(attrs, children) {
  return element2("footer", attrs, children);
}
function header(attrs, children) {
  return element2("header", attrs, children);
}
function h1(attrs, children) {
  return element2("h1", attrs, children);
}
function h2(attrs, children) {
  return element2("h2", attrs, children);
}
function main(attrs, children) {
  return element2("main", attrs, children);
}
function div(attrs, children) {
  return element2("div", attrs, children);
}
function li(attrs, children) {
  return element2("li", attrs, children);
}
function p(attrs, children) {
  return element2("p", attrs, children);
}
function ul(attrs, children) {
  return element2("ul", attrs, children);
}
function a(attrs, children) {
  return element2("a", attrs, children);
}
function span(attrs, children) {
  return element2("span", attrs, children);
}
function svg(attrs, children) {
  return namespaced("http://www.w3.org/2000/svg", "svg", attrs, children);
}
function button(attrs, children) {
  return element2("button", attrs, children);
}

// build/dev/javascript/glelements/glelements/color.mjs
var Primary = class extends CustomType {
};
var Secondary = class extends CustomType {
};
var Success = class extends CustomType {
};
var Warn = class extends CustomType {
};
var Err = class extends CustomType {
};
var Info = class extends CustomType {
};
var Surface = class extends CustomType {
};
var Background = class extends CustomType {
};
var Border = class extends CustomType {
};
var Outline = class extends CustomType {
};
var W50 = class extends CustomType {
};
var W100 = class extends CustomType {
};
var W200 = class extends CustomType {
};
var W300 = class extends CustomType {
};
var W400 = class extends CustomType {
};
var W500 = class extends CustomType {
};
var W600 = class extends CustomType {
};
var W700 = class extends CustomType {
};
var W800 = class extends CustomType {
};
var W900 = class extends CustomType {
};
var W950 = class extends CustomType {
};
var Preferred = class extends CustomType {
};
var Light = class extends CustomType {
};
function invert_weight(weight) {
  if (weight instanceof W50) {
    return new W950();
  } else if (weight instanceof W100) {
    return new W900();
  } else if (weight instanceof W200) {
    return new W800();
  } else if (weight instanceof W300) {
    return new W700();
  } else if (weight instanceof W400) {
    return new W600();
  } else if (weight instanceof W500) {
    return weight;
  } else if (weight instanceof W600) {
    return new W400();
  } else if (weight instanceof W700) {
    return new W300();
  } else if (weight instanceof W800) {
    return new W200();
  } else if (weight instanceof W900) {
    return new W100();
  } else {
    return new W50();
  }
}

// build/dev/javascript/lustre/lustre/element/svg.mjs
var namespace = "http://www.w3.org/2000/svg";
function path(attrs) {
  return namespaced(namespace, "path", attrs, empty_list);
}

// build/dev/javascript/glelements/glelements/icon.mjs
function icon(attrs, path2) {
  return svg(
    prepend(
      attribute2("viewBox", "0 0 15 15"),
      prepend(
        attribute2("fill", "none"),
        prepend(class$("h-4 w-4"), attrs)
      )
    ),
    toList([
      path(
        toList([
          attribute2("d", path2),
          attribute2("fill", "currentColor"),
          attribute2("fill-rule", "evenodd"),
          attribute2("clip-rule", "evenodd")
        ])
      )
    ])
  );
}
function sun(attrs) {
  return icon(
    attrs,
    "M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z"
  );
}
function moon(attrs) {
  return icon(
    attrs,
    "M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z"
  );
}

// build/dev/javascript/glelements/glelements/internal/tailwind_maps.mjs
function background_class(color, weight) {
  if (weight instanceof W50) {
    if (color instanceof Primary) {
      return "bg-primary-50";
    } else if (color instanceof Secondary) {
      return "bg-secondary-50";
    } else if (color instanceof Success) {
      return "bg-success-50";
    } else if (color instanceof Warn) {
      return "bg-warn-50";
    } else if (color instanceof Err) {
      return "bg-error-50";
    } else if (color instanceof Info) {
      return "bg-info-50";
    } else if (color instanceof Surface) {
      return "bg-surface-50";
    } else {
      return "bg-on-surface-50";
    }
  } else if (weight instanceof W100) {
    if (color instanceof Primary) {
      return "bg-primary-100";
    } else if (color instanceof Secondary) {
      return "bg-secondary-100";
    } else if (color instanceof Success) {
      return "bg-success-100";
    } else if (color instanceof Warn) {
      return "bg-warn-100";
    } else if (color instanceof Err) {
      return "bg-error-100";
    } else if (color instanceof Info) {
      return "bg-info-100";
    } else if (color instanceof Surface) {
      return "bg-surface-100";
    } else {
      return "bg-on-surface-100";
    }
  } else if (weight instanceof W200) {
    if (color instanceof Primary) {
      return "bg-primary-200";
    } else if (color instanceof Secondary) {
      return "bg-secondary-200";
    } else if (color instanceof Success) {
      return "bg-success-200";
    } else if (color instanceof Warn) {
      return "bg-warn-200";
    } else if (color instanceof Err) {
      return "bg-error-200";
    } else if (color instanceof Info) {
      return "bg-info-200";
    } else if (color instanceof Surface) {
      return "bg-surface-200";
    } else {
      return "bg-on-surface-200";
    }
  } else if (weight instanceof W300) {
    if (color instanceof Primary) {
      return "bg-primary-300";
    } else if (color instanceof Secondary) {
      return "bg-secondary-300";
    } else if (color instanceof Success) {
      return "bg-success-300";
    } else if (color instanceof Warn) {
      return "bg-warn-300";
    } else if (color instanceof Err) {
      return "bg-error-300";
    } else if (color instanceof Info) {
      return "bg-info-300";
    } else if (color instanceof Surface) {
      return "bg-surface-300";
    } else {
      return "bg-on-surface-300";
    }
  } else if (weight instanceof W400) {
    if (color instanceof Primary) {
      return "bg-primary-400";
    } else if (color instanceof Secondary) {
      return "bg-secondary-400";
    } else if (color instanceof Success) {
      return "bg-success-400";
    } else if (color instanceof Warn) {
      return "bg-warn-400";
    } else if (color instanceof Err) {
      return "bg-error-400";
    } else if (color instanceof Info) {
      return "bg-info-400";
    } else if (color instanceof Surface) {
      return "bg-surface-400";
    } else {
      return "bg-on-surface-400";
    }
  } else if (weight instanceof W500) {
    if (color instanceof Primary) {
      return "bg-primary-500";
    } else if (color instanceof Secondary) {
      return "bg-secondary-500";
    } else if (color instanceof Success) {
      return "bg-success-500";
    } else if (color instanceof Warn) {
      return "bg-warn-500";
    } else if (color instanceof Err) {
      return "bg-error-500";
    } else if (color instanceof Info) {
      return "bg-info-500";
    } else if (color instanceof Surface) {
      return "bg-surface-500";
    } else {
      return "bg-on-surface-500";
    }
  } else if (weight instanceof W600) {
    if (color instanceof Primary) {
      return "bg-primary-600";
    } else if (color instanceof Secondary) {
      return "bg-secondary-600";
    } else if (color instanceof Success) {
      return "bg-success-600";
    } else if (color instanceof Warn) {
      return "bg-warn-600";
    } else if (color instanceof Err) {
      return "bg-error-600";
    } else if (color instanceof Info) {
      return "bg-info-600";
    } else if (color instanceof Surface) {
      return "bg-surface-600";
    } else {
      return "bg-on-surface-600";
    }
  } else if (weight instanceof W700) {
    if (color instanceof Primary) {
      return "bg-primary-700";
    } else if (color instanceof Secondary) {
      return "bg-secondary-700";
    } else if (color instanceof Success) {
      return "bg-success-700";
    } else if (color instanceof Warn) {
      return "bg-warn-700";
    } else if (color instanceof Err) {
      return "bg-error-700";
    } else if (color instanceof Info) {
      return "bg-info-700";
    } else if (color instanceof Surface) {
      return "bg-surface-700";
    } else {
      return "bg-on-surface-700";
    }
  } else if (weight instanceof W800) {
    if (color instanceof Primary) {
      return "bg-primary-800";
    } else if (color instanceof Secondary) {
      return "bg-secondary-800";
    } else if (color instanceof Success) {
      return "bg-success-800";
    } else if (color instanceof Warn) {
      return "bg-warn-800";
    } else if (color instanceof Err) {
      return "bg-error-800";
    } else if (color instanceof Info) {
      return "bg-info-800";
    } else if (color instanceof Surface) {
      return "bg-surface-800";
    } else {
      return "bg-on-surface-800";
    }
  } else if (weight instanceof W900) {
    if (color instanceof Primary) {
      return "bg-primary-900";
    } else if (color instanceof Secondary) {
      return "bg-secondary-900";
    } else if (color instanceof Success) {
      return "bg-success-900";
    } else if (color instanceof Warn) {
      return "bg-warn-900";
    } else if (color instanceof Err) {
      return "bg-error-900";
    } else if (color instanceof Info) {
      return "bg-info-900";
    } else if (color instanceof Surface) {
      return "bg-surface-900";
    } else {
      return "bg-on-surface-900";
    }
  } else if (color instanceof Primary) {
    return "bg-primary-950";
  } else if (color instanceof Secondary) {
    return "bg-secondary-950";
  } else if (color instanceof Success) {
    return "bg-success-950";
  } else if (color instanceof Warn) {
    return "bg-warn-950";
  } else if (color instanceof Err) {
    return "bg-error-950";
  } else if (color instanceof Info) {
    return "bg-info-950";
  } else if (color instanceof Surface) {
    return "bg-surface-950";
  } else {
    return "bg-on-surface-950";
  }
}
function dark_background_class(color, weight) {
  if (weight instanceof W50) {
    if (color instanceof Primary) {
      return "dark:bg-primary-50";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-50";
    } else if (color instanceof Success) {
      return "dark:bg-success-50";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-50";
    } else if (color instanceof Err) {
      return "dark:bg-error-50";
    } else if (color instanceof Info) {
      return "dark:bg-info-50";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-50";
    } else {
      return "dark:bg-on-surface-50";
    }
  } else if (weight instanceof W100) {
    if (color instanceof Primary) {
      return "dark:bg-primary-100";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-100";
    } else if (color instanceof Success) {
      return "dark:bg-success-100";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-100";
    } else if (color instanceof Err) {
      return "dark:bg-error-100";
    } else if (color instanceof Info) {
      return "dark:bg-info-100";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-100";
    } else {
      return "dark:bg-on-surface-100";
    }
  } else if (weight instanceof W200) {
    if (color instanceof Primary) {
      return "dark:bg-primary-200";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-200";
    } else if (color instanceof Success) {
      return "dark:bg-success-200";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-200";
    } else if (color instanceof Err) {
      return "dark:bg-error-200";
    } else if (color instanceof Info) {
      return "dark:bg-info-200";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-200";
    } else {
      return "dark:bg-on-surface-200";
    }
  } else if (weight instanceof W300) {
    if (color instanceof Primary) {
      return "dark:bg-primary-300";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-300";
    } else if (color instanceof Success) {
      return "dark:bg-success-300";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-300";
    } else if (color instanceof Err) {
      return "dark:bg-error-300";
    } else if (color instanceof Info) {
      return "dark:bg-info-300";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-300";
    } else {
      return "dark:bg-on-surface-300";
    }
  } else if (weight instanceof W400) {
    if (color instanceof Primary) {
      return "dark:bg-primary-400";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-400";
    } else if (color instanceof Success) {
      return "dark:bg-success-400";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-400";
    } else if (color instanceof Err) {
      return "dark:bg-error-400";
    } else if (color instanceof Info) {
      return "dark:bg-info-400";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-400";
    } else {
      return "dark:bg-on-surface-400";
    }
  } else if (weight instanceof W500) {
    if (color instanceof Primary) {
      return "dark:bg-primary-500";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-500";
    } else if (color instanceof Success) {
      return "dark:bg-success-500";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-500";
    } else if (color instanceof Err) {
      return "dark:bg-error-500";
    } else if (color instanceof Info) {
      return "dark:bg-info-500";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-500";
    } else {
      return "dark:bg-on-surface-500";
    }
  } else if (weight instanceof W600) {
    if (color instanceof Primary) {
      return "dark:bg-primary-600";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-600";
    } else if (color instanceof Success) {
      return "dark:bg-success-600";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-600";
    } else if (color instanceof Err) {
      return "dark:bg-error-600";
    } else if (color instanceof Info) {
      return "dark:bg-info-600";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-600";
    } else {
      return "dark:bg-on-surface-600";
    }
  } else if (weight instanceof W700) {
    if (color instanceof Primary) {
      return "dark:bg-primary-700";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-700";
    } else if (color instanceof Success) {
      return "dark:bg-success-700";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-700";
    } else if (color instanceof Err) {
      return "dark:bg-error-700";
    } else if (color instanceof Info) {
      return "dark:bg-info-700";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-700";
    } else {
      return "dark:bg-on-surface-700";
    }
  } else if (weight instanceof W800) {
    if (color instanceof Primary) {
      return "dark:bg-primary-800";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-800";
    } else if (color instanceof Success) {
      return "dark:bg-success-800";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-800";
    } else if (color instanceof Err) {
      return "dark:bg-error-800";
    } else if (color instanceof Info) {
      return "dark:bg-info-800";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-800";
    } else {
      return "dark:bg-on-surface-800";
    }
  } else if (weight instanceof W900) {
    if (color instanceof Primary) {
      return "dark:bg-primary-900";
    } else if (color instanceof Secondary) {
      return "dark:bg-secondary-900";
    } else if (color instanceof Success) {
      return "dark:bg-success-900";
    } else if (color instanceof Warn) {
      return "dark:bg-warn-900";
    } else if (color instanceof Err) {
      return "dark:bg-error-900";
    } else if (color instanceof Info) {
      return "dark:bg-info-900";
    } else if (color instanceof Surface) {
      return "dark:bg-surface-900";
    } else {
      return "dark:bg-on-surface-900";
    }
  } else if (color instanceof Primary) {
    return "dark:bg-primary-950";
  } else if (color instanceof Secondary) {
    return "dark:bg-secondary-950";
  } else if (color instanceof Success) {
    return "dark:bg-success-950";
  } else if (color instanceof Warn) {
    return "dark:bg-warn-950";
  } else if (color instanceof Err) {
    return "dark:bg-error-950";
  } else if (color instanceof Info) {
    return "dark:bg-info-950";
  } else if (color instanceof Surface) {
    return "dark:bg-surface-950";
  } else {
    return "dark:bg-on-surface-950";
  }
}
function text_class(color, weight) {
  if (weight instanceof W50) {
    if (color instanceof Primary) {
      return "text-primary-50";
    } else if (color instanceof Secondary) {
      return "text-secondary-50";
    } else if (color instanceof Success) {
      return "text-success-50";
    } else if (color instanceof Warn) {
      return "text-warn-50";
    } else if (color instanceof Err) {
      return "text-error-50";
    } else if (color instanceof Info) {
      return "text-info-50";
    } else if (color instanceof Surface) {
      return "text-surface-50";
    } else {
      return "text-on-surface-50";
    }
  } else if (weight instanceof W100) {
    if (color instanceof Primary) {
      return "text-primary-100";
    } else if (color instanceof Secondary) {
      return "text-secondary-100";
    } else if (color instanceof Success) {
      return "text-success-100";
    } else if (color instanceof Warn) {
      return "text-warn-100";
    } else if (color instanceof Err) {
      return "text-error-100";
    } else if (color instanceof Info) {
      return "text-info-100";
    } else if (color instanceof Surface) {
      return "text-surface-100";
    } else {
      return "text-on-surface-100";
    }
  } else if (weight instanceof W200) {
    if (color instanceof Primary) {
      return "text-primary-200";
    } else if (color instanceof Secondary) {
      return "text-secondary-200";
    } else if (color instanceof Success) {
      return "text-success-200";
    } else if (color instanceof Warn) {
      return "text-warn-200";
    } else if (color instanceof Err) {
      return "text-error-200";
    } else if (color instanceof Info) {
      return "text-info-200";
    } else if (color instanceof Surface) {
      return "text-surface-200";
    } else {
      return "text-on-surface-200";
    }
  } else if (weight instanceof W300) {
    if (color instanceof Primary) {
      return "text-primary-300";
    } else if (color instanceof Secondary) {
      return "text-secondary-300";
    } else if (color instanceof Success) {
      return "text-success-300";
    } else if (color instanceof Warn) {
      return "text-warn-300";
    } else if (color instanceof Err) {
      return "text-error-300";
    } else if (color instanceof Info) {
      return "text-info-300";
    } else if (color instanceof Surface) {
      return "text-surface-300";
    } else {
      return "text-on-surface-300";
    }
  } else if (weight instanceof W400) {
    if (color instanceof Primary) {
      return "text-primary-400";
    } else if (color instanceof Secondary) {
      return "text-secondary-400";
    } else if (color instanceof Success) {
      return "text-success-400";
    } else if (color instanceof Warn) {
      return "text-warn-400";
    } else if (color instanceof Err) {
      return "text-error-400";
    } else if (color instanceof Info) {
      return "text-info-400";
    } else if (color instanceof Surface) {
      return "text-surface-400";
    } else {
      return "text-on-surface-400";
    }
  } else if (weight instanceof W500) {
    if (color instanceof Primary) {
      return "text-primary-500";
    } else if (color instanceof Secondary) {
      return "text-secondary-500";
    } else if (color instanceof Success) {
      return "text-success-500";
    } else if (color instanceof Warn) {
      return "text-warn-500";
    } else if (color instanceof Err) {
      return "text-error-500";
    } else if (color instanceof Info) {
      return "text-info-500";
    } else if (color instanceof Surface) {
      return "text-surface-500";
    } else {
      return "text-on-surface-500";
    }
  } else if (weight instanceof W600) {
    if (color instanceof Primary) {
      return "text-primary-600";
    } else if (color instanceof Secondary) {
      return "text-secondary-600";
    } else if (color instanceof Success) {
      return "text-success-600";
    } else if (color instanceof Warn) {
      return "text-warn-600";
    } else if (color instanceof Err) {
      return "text-error-600";
    } else if (color instanceof Info) {
      return "text-info-600";
    } else if (color instanceof Surface) {
      return "text-surface-600";
    } else {
      return "text-on-surface-600";
    }
  } else if (weight instanceof W700) {
    if (color instanceof Primary) {
      return "text-primary-700";
    } else if (color instanceof Secondary) {
      return "text-secondary-700";
    } else if (color instanceof Success) {
      return "text-success-700";
    } else if (color instanceof Warn) {
      return "text-warn-700";
    } else if (color instanceof Err) {
      return "text-error-700";
    } else if (color instanceof Info) {
      return "text-info-700";
    } else if (color instanceof Surface) {
      return "text-surface-700";
    } else {
      return "text-on-surface-700";
    }
  } else if (weight instanceof W800) {
    if (color instanceof Primary) {
      return "text-primary-800";
    } else if (color instanceof Secondary) {
      return "text-secondary-800";
    } else if (color instanceof Success) {
      return "text-success-800";
    } else if (color instanceof Warn) {
      return "text-warn-800";
    } else if (color instanceof Err) {
      return "text-error-800";
    } else if (color instanceof Info) {
      return "text-info-800";
    } else if (color instanceof Surface) {
      return "text-surface-800";
    } else {
      return "text-on-surface-800";
    }
  } else if (weight instanceof W900) {
    if (color instanceof Primary) {
      return "text-primary-900";
    } else if (color instanceof Secondary) {
      return "text-secondary-900";
    } else if (color instanceof Success) {
      return "text-success-900";
    } else if (color instanceof Warn) {
      return "text-warn-900";
    } else if (color instanceof Err) {
      return "text-error-900";
    } else if (color instanceof Info) {
      return "text-info-900";
    } else if (color instanceof Surface) {
      return "text-surface-900";
    } else {
      return "text-on-surface-900";
    }
  } else if (color instanceof Primary) {
    return "text-primary-950";
  } else if (color instanceof Secondary) {
    return "text-secondary-950";
  } else if (color instanceof Success) {
    return "text-success-950";
  } else if (color instanceof Warn) {
    return "text-warn-950";
  } else if (color instanceof Err) {
    return "text-error-950";
  } else if (color instanceof Info) {
    return "text-info-950";
  } else if (color instanceof Surface) {
    return "text-surface-950";
  } else {
    return "text-on-surface-950";
  }
}
function dark_text_class(color, weight) {
  if (weight instanceof W50) {
    if (color instanceof Primary) {
      return "dark:text-primary-50";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-50";
    } else if (color instanceof Success) {
      return "dark:text-success-50";
    } else if (color instanceof Warn) {
      return "dark:text-warn-50";
    } else if (color instanceof Err) {
      return "dark:text-error-50";
    } else if (color instanceof Info) {
      return "dark:text-info-50";
    } else if (color instanceof Surface) {
      return "dark:text-surface-50";
    } else {
      return "dark:text-on-surface-50";
    }
  } else if (weight instanceof W100) {
    if (color instanceof Primary) {
      return "dark:text-primary-100";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-100";
    } else if (color instanceof Success) {
      return "dark:text-success-100";
    } else if (color instanceof Warn) {
      return "dark:text-warn-100";
    } else if (color instanceof Err) {
      return "dark:text-error-100";
    } else if (color instanceof Info) {
      return "dark:text-info-100";
    } else if (color instanceof Surface) {
      return "dark:text-surface-100";
    } else {
      return "dark:text-on-surface-100";
    }
  } else if (weight instanceof W200) {
    if (color instanceof Primary) {
      return "dark:text-primary-200";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-200";
    } else if (color instanceof Success) {
      return "dark:text-success-200";
    } else if (color instanceof Warn) {
      return "dark:text-warn-200";
    } else if (color instanceof Err) {
      return "dark:text-error-200";
    } else if (color instanceof Info) {
      return "dark:text-info-200";
    } else if (color instanceof Surface) {
      return "dark:text-surface-200";
    } else {
      return "dark:text-on-surface-200";
    }
  } else if (weight instanceof W300) {
    if (color instanceof Primary) {
      return "dark:text-primary-300";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-300";
    } else if (color instanceof Success) {
      return "dark:text-success-300";
    } else if (color instanceof Warn) {
      return "dark:text-warn-300";
    } else if (color instanceof Err) {
      return "dark:text-error-300";
    } else if (color instanceof Info) {
      return "dark:text-info-300";
    } else if (color instanceof Surface) {
      return "dark:text-surface-300";
    } else {
      return "dark:text-on-surface-300";
    }
  } else if (weight instanceof W400) {
    if (color instanceof Primary) {
      return "dark:text-primary-400";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-400";
    } else if (color instanceof Success) {
      return "dark:text-success-400";
    } else if (color instanceof Warn) {
      return "dark:text-warn-400";
    } else if (color instanceof Err) {
      return "dark:text-error-400";
    } else if (color instanceof Info) {
      return "dark:text-info-400";
    } else if (color instanceof Surface) {
      return "dark:text-surface-400";
    } else {
      return "dark:text-on-surface-400";
    }
  } else if (weight instanceof W500) {
    if (color instanceof Primary) {
      return "dark:text-primary-500";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-500";
    } else if (color instanceof Success) {
      return "dark:text-success-500";
    } else if (color instanceof Warn) {
      return "dark:text-warn-500";
    } else if (color instanceof Err) {
      return "dark:text-error-500";
    } else if (color instanceof Info) {
      return "dark:text-info-500";
    } else if (color instanceof Surface) {
      return "dark:text-surface-500";
    } else {
      return "dark:text-on-surface-500";
    }
  } else if (weight instanceof W600) {
    if (color instanceof Primary) {
      return "dark:text-primary-600";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-600";
    } else if (color instanceof Success) {
      return "dark:text-success-600";
    } else if (color instanceof Warn) {
      return "dark:text-warn-600";
    } else if (color instanceof Err) {
      return "dark:text-error-600";
    } else if (color instanceof Info) {
      return "dark:text-info-600";
    } else if (color instanceof Surface) {
      return "dark:text-surface-600";
    } else {
      return "dark:text-on-surface-600";
    }
  } else if (weight instanceof W700) {
    if (color instanceof Primary) {
      return "dark:text-primary-700";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-700";
    } else if (color instanceof Success) {
      return "dark:text-success-700";
    } else if (color instanceof Warn) {
      return "dark:text-warn-700";
    } else if (color instanceof Err) {
      return "dark:text-error-700";
    } else if (color instanceof Info) {
      return "dark:text-info-700";
    } else if (color instanceof Surface) {
      return "dark:text-surface-700";
    } else {
      return "dark:text-on-surface-700";
    }
  } else if (weight instanceof W800) {
    if (color instanceof Primary) {
      return "dark:text-primary-800";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-800";
    } else if (color instanceof Success) {
      return "dark:text-success-800";
    } else if (color instanceof Warn) {
      return "dark:text-warn-800";
    } else if (color instanceof Err) {
      return "dark:text-error-800";
    } else if (color instanceof Info) {
      return "dark:text-info-800";
    } else if (color instanceof Surface) {
      return "dark:text-surface-800";
    } else {
      return "dark:text-on-surface-800";
    }
  } else if (weight instanceof W900) {
    if (color instanceof Primary) {
      return "dark:text-primary-900";
    } else if (color instanceof Secondary) {
      return "dark:text-secondary-900";
    } else if (color instanceof Success) {
      return "dark:text-success-900";
    } else if (color instanceof Warn) {
      return "dark:text-warn-900";
    } else if (color instanceof Err) {
      return "dark:text-error-900";
    } else if (color instanceof Info) {
      return "dark:text-info-900";
    } else if (color instanceof Surface) {
      return "dark:text-surface-900";
    } else {
      return "dark:text-on-surface-900";
    }
  } else if (color instanceof Primary) {
    return "dark:text-primary-950";
  } else if (color instanceof Secondary) {
    return "dark:text-secondary-950";
  } else if (color instanceof Success) {
    return "dark:text-success-950";
  } else if (color instanceof Warn) {
    return "dark:text-warn-950";
  } else if (color instanceof Err) {
    return "dark:text-error-950";
  } else if (color instanceof Info) {
    return "dark:text-info-950";
  } else if (color instanceof Surface) {
    return "dark:text-surface-950";
  } else {
    return "dark:text-on-surface-950";
  }
}
function border_class(color, weight) {
  if (weight instanceof W50) {
    if (color instanceof Primary) {
      return "border-primary-50";
    } else if (color instanceof Secondary) {
      return "border-secondary-50";
    } else if (color instanceof Success) {
      return "border-success-50";
    } else if (color instanceof Warn) {
      return "border-warn-50";
    } else if (color instanceof Err) {
      return "border-error-50";
    } else if (color instanceof Info) {
      return "border-info-50";
    } else if (color instanceof Surface) {
      return "border-surface-50";
    } else {
      return "border-on-surface-50";
    }
  } else if (weight instanceof W100) {
    if (color instanceof Primary) {
      return "border-primary-100";
    } else if (color instanceof Secondary) {
      return "border-secondary-100";
    } else if (color instanceof Success) {
      return "border-success-100";
    } else if (color instanceof Warn) {
      return "border-warn-100";
    } else if (color instanceof Err) {
      return "border-error-100";
    } else if (color instanceof Info) {
      return "border-info-100";
    } else if (color instanceof Surface) {
      return "border-surface-100";
    } else {
      return "border-on-surface-100";
    }
  } else if (weight instanceof W200) {
    if (color instanceof Primary) {
      return "border-primary-200";
    } else if (color instanceof Secondary) {
      return "border-secondary-200";
    } else if (color instanceof Success) {
      return "border-success-200";
    } else if (color instanceof Warn) {
      return "border-warn-200";
    } else if (color instanceof Err) {
      return "border-error-200";
    } else if (color instanceof Info) {
      return "border-info-200";
    } else if (color instanceof Surface) {
      return "border-surface-200";
    } else {
      return "border-on-surface-200";
    }
  } else if (weight instanceof W300) {
    if (color instanceof Primary) {
      return "border-primary-300";
    } else if (color instanceof Secondary) {
      return "border-secondary-300";
    } else if (color instanceof Success) {
      return "border-success-300";
    } else if (color instanceof Warn) {
      return "border-warn-300";
    } else if (color instanceof Err) {
      return "border-error-300";
    } else if (color instanceof Info) {
      return "border-info-300";
    } else if (color instanceof Surface) {
      return "border-surface-300";
    } else {
      return "border-on-surface-300";
    }
  } else if (weight instanceof W400) {
    if (color instanceof Primary) {
      return "border-primary-400";
    } else if (color instanceof Secondary) {
      return "border-secondary-400";
    } else if (color instanceof Success) {
      return "border-success-400";
    } else if (color instanceof Warn) {
      return "border-warn-400";
    } else if (color instanceof Err) {
      return "border-error-400";
    } else if (color instanceof Info) {
      return "border-info-400";
    } else if (color instanceof Surface) {
      return "border-surface-400";
    } else {
      return "border-on-surface-400";
    }
  } else if (weight instanceof W500) {
    if (color instanceof Primary) {
      return "border-primary-500";
    } else if (color instanceof Secondary) {
      return "border-secondary-500";
    } else if (color instanceof Success) {
      return "border-success-500";
    } else if (color instanceof Warn) {
      return "border-warn-500";
    } else if (color instanceof Err) {
      return "border-error-500";
    } else if (color instanceof Info) {
      return "border-info-500";
    } else if (color instanceof Surface) {
      return "border-surface-500";
    } else {
      return "border-on-surface-500";
    }
  } else if (weight instanceof W600) {
    if (color instanceof Primary) {
      return "border-primary-600";
    } else if (color instanceof Secondary) {
      return "border-secondary-600";
    } else if (color instanceof Success) {
      return "border-success-600";
    } else if (color instanceof Warn) {
      return "border-warn-600";
    } else if (color instanceof Err) {
      return "border-error-600";
    } else if (color instanceof Info) {
      return "border-info-600";
    } else if (color instanceof Surface) {
      return "border-surface-600";
    } else {
      return "border-on-surface-600";
    }
  } else if (weight instanceof W700) {
    if (color instanceof Primary) {
      return "border-primary-700";
    } else if (color instanceof Secondary) {
      return "border-secondary-700";
    } else if (color instanceof Success) {
      return "border-success-700";
    } else if (color instanceof Warn) {
      return "border-warn-700";
    } else if (color instanceof Err) {
      return "border-error-700";
    } else if (color instanceof Info) {
      return "border-info-700";
    } else if (color instanceof Surface) {
      return "border-surface-700";
    } else {
      return "border-on-surface-700";
    }
  } else if (weight instanceof W800) {
    if (color instanceof Primary) {
      return "border-primary-800";
    } else if (color instanceof Secondary) {
      return "border-secondary-800";
    } else if (color instanceof Success) {
      return "border-success-800";
    } else if (color instanceof Warn) {
      return "border-warn-800";
    } else if (color instanceof Err) {
      return "border-error-800";
    } else if (color instanceof Info) {
      return "border-info-800";
    } else if (color instanceof Surface) {
      return "border-surface-800";
    } else {
      return "border-on-surface-800";
    }
  } else if (weight instanceof W900) {
    if (color instanceof Primary) {
      return "border-primary-900";
    } else if (color instanceof Secondary) {
      return "border-secondary-900";
    } else if (color instanceof Success) {
      return "border-success-900";
    } else if (color instanceof Warn) {
      return "border-warn-900";
    } else if (color instanceof Err) {
      return "border-error-900";
    } else if (color instanceof Info) {
      return "border-info-900";
    } else if (color instanceof Surface) {
      return "border-surface-900";
    } else {
      return "border-on-surface-900";
    }
  } else if (color instanceof Primary) {
    return "border-primary-950";
  } else if (color instanceof Secondary) {
    return "border-secondary-950";
  } else if (color instanceof Success) {
    return "border-success-950";
  } else if (color instanceof Warn) {
    return "border-warn-950";
  } else if (color instanceof Err) {
    return "border-error-950";
  } else if (color instanceof Info) {
    return "border-info-950";
  } else if (color instanceof Surface) {
    return "border-surface-950";
  } else {
    return "border-on-surface-950";
  }
}
function dark_border_class(color, weight) {
  if (weight instanceof W50) {
    if (color instanceof Primary) {
      return "dark:border-primary-50";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-50";
    } else if (color instanceof Success) {
      return "dark:border-success-50";
    } else if (color instanceof Warn) {
      return "dark:border-warn-50";
    } else if (color instanceof Err) {
      return "dark:border-error-50";
    } else if (color instanceof Info) {
      return "dark:border-info-50";
    } else if (color instanceof Surface) {
      return "dark:border-surface-50";
    } else {
      return "dark:border-on-surface-50";
    }
  } else if (weight instanceof W100) {
    if (color instanceof Primary) {
      return "dark:border-primary-100";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-100";
    } else if (color instanceof Success) {
      return "dark:border-success-100";
    } else if (color instanceof Warn) {
      return "dark:border-warn-100";
    } else if (color instanceof Err) {
      return "dark:border-error-100";
    } else if (color instanceof Info) {
      return "dark:border-info-100";
    } else if (color instanceof Surface) {
      return "dark:border-surface-100";
    } else {
      return "dark:border-on-surface-100";
    }
  } else if (weight instanceof W200) {
    if (color instanceof Primary) {
      return "dark:border-primary-200";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-200";
    } else if (color instanceof Success) {
      return "dark:border-success-200";
    } else if (color instanceof Warn) {
      return "dark:border-warn-200";
    } else if (color instanceof Err) {
      return "dark:border-error-200";
    } else if (color instanceof Info) {
      return "dark:border-info-200";
    } else if (color instanceof Surface) {
      return "dark:border-surface-200";
    } else {
      return "dark:border-on-surface-200";
    }
  } else if (weight instanceof W300) {
    if (color instanceof Primary) {
      return "dark:border-primary-300";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-300";
    } else if (color instanceof Success) {
      return "dark:border-success-300";
    } else if (color instanceof Warn) {
      return "dark:border-warn-300";
    } else if (color instanceof Err) {
      return "dark:border-error-300";
    } else if (color instanceof Info) {
      return "dark:border-info-300";
    } else if (color instanceof Surface) {
      return "dark:border-surface-300";
    } else {
      return "dark:border-on-surface-300";
    }
  } else if (weight instanceof W400) {
    if (color instanceof Primary) {
      return "dark:border-primary-400";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-400";
    } else if (color instanceof Success) {
      return "dark:border-success-400";
    } else if (color instanceof Warn) {
      return "dark:border-warn-400";
    } else if (color instanceof Err) {
      return "dark:border-error-400";
    } else if (color instanceof Info) {
      return "dark:border-info-400";
    } else if (color instanceof Surface) {
      return "dark:border-surface-400";
    } else {
      return "dark:border-on-surface-400";
    }
  } else if (weight instanceof W500) {
    if (color instanceof Primary) {
      return "dark:border-primary-500";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-500";
    } else if (color instanceof Success) {
      return "dark:border-success-500";
    } else if (color instanceof Warn) {
      return "dark:border-warn-500";
    } else if (color instanceof Err) {
      return "dark:border-error-500";
    } else if (color instanceof Info) {
      return "dark:border-info-500";
    } else if (color instanceof Surface) {
      return "dark:border-surface-500";
    } else {
      return "dark:border-on-surface-500";
    }
  } else if (weight instanceof W600) {
    if (color instanceof Primary) {
      return "dark:border-primary-600";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-600";
    } else if (color instanceof Success) {
      return "dark:border-success-600";
    } else if (color instanceof Warn) {
      return "dark:border-warn-600";
    } else if (color instanceof Err) {
      return "dark:border-error-600";
    } else if (color instanceof Info) {
      return "dark:border-info-600";
    } else if (color instanceof Surface) {
      return "dark:border-surface-600";
    } else {
      return "dark:border-on-surface-600";
    }
  } else if (weight instanceof W700) {
    if (color instanceof Primary) {
      return "dark:border-primary-700";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-700";
    } else if (color instanceof Success) {
      return "dark:border-success-700";
    } else if (color instanceof Warn) {
      return "dark:border-warn-700";
    } else if (color instanceof Err) {
      return "dark:border-error-700";
    } else if (color instanceof Info) {
      return "dark:border-info-700";
    } else if (color instanceof Surface) {
      return "dark:border-surface-700";
    } else {
      return "dark:border-on-surface-700";
    }
  } else if (weight instanceof W800) {
    if (color instanceof Primary) {
      return "dark:border-primary-800";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-800";
    } else if (color instanceof Success) {
      return "dark:border-success-800";
    } else if (color instanceof Warn) {
      return "dark:border-warn-800";
    } else if (color instanceof Err) {
      return "dark:border-error-800";
    } else if (color instanceof Info) {
      return "dark:border-info-800";
    } else if (color instanceof Surface) {
      return "dark:border-surface-800";
    } else {
      return "dark:border-on-surface-800";
    }
  } else if (weight instanceof W900) {
    if (color instanceof Primary) {
      return "dark:border-primary-900";
    } else if (color instanceof Secondary) {
      return "dark:border-secondary-900";
    } else if (color instanceof Success) {
      return "dark:border-success-900";
    } else if (color instanceof Warn) {
      return "dark:border-warn-900";
    } else if (color instanceof Err) {
      return "dark:border-error-900";
    } else if (color instanceof Info) {
      return "dark:border-info-900";
    } else if (color instanceof Surface) {
      return "dark:border-surface-900";
    } else {
      return "dark:border-on-surface-900";
    }
  } else if (color instanceof Primary) {
    return "dark:border-primary-950";
  } else if (color instanceof Secondary) {
    return "dark:border-secondary-950";
  } else if (color instanceof Success) {
    return "dark:border-success-950";
  } else if (color instanceof Warn) {
    return "dark:border-warn-950";
  } else if (color instanceof Err) {
    return "dark:border-error-950";
  } else if (color instanceof Info) {
    return "dark:border-info-950";
  } else if (color instanceof Surface) {
    return "dark:border-surface-950";
  } else {
    return "dark:border-on-surface-950";
  }
}
function outline_class(color, weight) {
  if (weight instanceof W50) {
    if (color instanceof Primary) {
      return "outline-primary-50";
    } else if (color instanceof Secondary) {
      return "outline-secondary-50";
    } else if (color instanceof Success) {
      return "outline-success-50";
    } else if (color instanceof Warn) {
      return "outline-warn-50";
    } else if (color instanceof Err) {
      return "outline-error-50";
    } else if (color instanceof Info) {
      return "outline-info-50";
    } else if (color instanceof Surface) {
      return "outline-surface-50";
    } else {
      return "outline-on-surface-50";
    }
  } else if (weight instanceof W100) {
    if (color instanceof Primary) {
      return "outline-primary-100";
    } else if (color instanceof Secondary) {
      return "outline-secondary-100";
    } else if (color instanceof Success) {
      return "outline-success-100";
    } else if (color instanceof Warn) {
      return "outline-warn-100";
    } else if (color instanceof Err) {
      return "outline-error-100";
    } else if (color instanceof Info) {
      return "outline-info-100";
    } else if (color instanceof Surface) {
      return "outline-surface-100";
    } else {
      return "outline-on-surface-100";
    }
  } else if (weight instanceof W200) {
    if (color instanceof Primary) {
      return "outline-primary-200";
    } else if (color instanceof Secondary) {
      return "outline-secondary-200";
    } else if (color instanceof Success) {
      return "outline-success-200";
    } else if (color instanceof Warn) {
      return "outline-warn-200";
    } else if (color instanceof Err) {
      return "outline-error-200";
    } else if (color instanceof Info) {
      return "outline-info-200";
    } else if (color instanceof Surface) {
      return "outline-surface-200";
    } else {
      return "outline-on-surface-200";
    }
  } else if (weight instanceof W300) {
    if (color instanceof Primary) {
      return "outline-primary-300";
    } else if (color instanceof Secondary) {
      return "outline-secondary-300";
    } else if (color instanceof Success) {
      return "outline-success-300";
    } else if (color instanceof Warn) {
      return "outline-warn-300";
    } else if (color instanceof Err) {
      return "outline-error-300";
    } else if (color instanceof Info) {
      return "outline-info-300";
    } else if (color instanceof Surface) {
      return "outline-surface-300";
    } else {
      return "outline-on-surface-300";
    }
  } else if (weight instanceof W400) {
    if (color instanceof Primary) {
      return "outline-primary-400";
    } else if (color instanceof Secondary) {
      return "outline-secondary-400";
    } else if (color instanceof Success) {
      return "outline-success-400";
    } else if (color instanceof Warn) {
      return "outline-warn-400";
    } else if (color instanceof Err) {
      return "outline-error-400";
    } else if (color instanceof Info) {
      return "outline-info-400";
    } else if (color instanceof Surface) {
      return "outline-surface-400";
    } else {
      return "outline-on-surface-400";
    }
  } else if (weight instanceof W500) {
    if (color instanceof Primary) {
      return "outline-primary-500";
    } else if (color instanceof Secondary) {
      return "outline-secondary-500";
    } else if (color instanceof Success) {
      return "outline-success-500";
    } else if (color instanceof Warn) {
      return "outline-warn-500";
    } else if (color instanceof Err) {
      return "outline-error-500";
    } else if (color instanceof Info) {
      return "outline-info-500";
    } else if (color instanceof Surface) {
      return "outline-surface-500";
    } else {
      return "outline-on-surface-500";
    }
  } else if (weight instanceof W600) {
    if (color instanceof Primary) {
      return "outline-primary-600";
    } else if (color instanceof Secondary) {
      return "outline-secondary-600";
    } else if (color instanceof Success) {
      return "outline-success-600";
    } else if (color instanceof Warn) {
      return "outline-warn-600";
    } else if (color instanceof Err) {
      return "outline-error-600";
    } else if (color instanceof Info) {
      return "outline-info-600";
    } else if (color instanceof Surface) {
      return "outline-surface-600";
    } else {
      return "outline-on-surface-600";
    }
  } else if (weight instanceof W700) {
    if (color instanceof Primary) {
      return "outline-primary-700";
    } else if (color instanceof Secondary) {
      return "outline-secondary-700";
    } else if (color instanceof Success) {
      return "outline-success-700";
    } else if (color instanceof Warn) {
      return "outline-warn-700";
    } else if (color instanceof Err) {
      return "outline-error-700";
    } else if (color instanceof Info) {
      return "outline-info-700";
    } else if (color instanceof Surface) {
      return "outline-surface-700";
    } else {
      return "outline-on-surface-700";
    }
  } else if (weight instanceof W800) {
    if (color instanceof Primary) {
      return "outline-primary-800";
    } else if (color instanceof Secondary) {
      return "outline-secondary-800";
    } else if (color instanceof Success) {
      return "outline-success-800";
    } else if (color instanceof Warn) {
      return "outline-warn-800";
    } else if (color instanceof Err) {
      return "outline-error-800";
    } else if (color instanceof Info) {
      return "outline-info-800";
    } else if (color instanceof Surface) {
      return "outline-surface-800";
    } else {
      return "outline-on-surface-800";
    }
  } else if (weight instanceof W900) {
    if (color instanceof Primary) {
      return "outline-primary-900";
    } else if (color instanceof Secondary) {
      return "outline-secondary-900";
    } else if (color instanceof Success) {
      return "outline-success-900";
    } else if (color instanceof Warn) {
      return "outline-warn-900";
    } else if (color instanceof Err) {
      return "outline-error-900";
    } else if (color instanceof Info) {
      return "outline-info-900";
    } else if (color instanceof Surface) {
      return "outline-surface-900";
    } else {
      return "outline-on-surface-900";
    }
  } else if (color instanceof Primary) {
    return "outline-primary-950";
  } else if (color instanceof Secondary) {
    return "outline-secondary-950";
  } else if (color instanceof Success) {
    return "outline-success-950";
  } else if (color instanceof Warn) {
    return "outline-warn-950";
  } else if (color instanceof Err) {
    return "outline-error-950";
  } else if (color instanceof Info) {
    return "outline-info-950";
  } else if (color instanceof Surface) {
    return "outline-surface-950";
  } else {
    return "outline-on-surface-950";
  }
}
function dark_outline_class(color, weight) {
  if (weight instanceof W50) {
    if (color instanceof Primary) {
      return "dark:outline-primary-50";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-50";
    } else if (color instanceof Success) {
      return "dark:outline-success-50";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-50";
    } else if (color instanceof Err) {
      return "dark:outline-error-50";
    } else if (color instanceof Info) {
      return "dark:outline-info-50";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-50";
    } else {
      return "dark:outline-on-surface-50";
    }
  } else if (weight instanceof W100) {
    if (color instanceof Primary) {
      return "dark:outline-primary-100";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-100";
    } else if (color instanceof Success) {
      return "dark:outline-success-100";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-100";
    } else if (color instanceof Err) {
      return "dark:outline-error-100";
    } else if (color instanceof Info) {
      return "dark:outline-info-100";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-100";
    } else {
      return "dark:outline-on-surface-100";
    }
  } else if (weight instanceof W200) {
    if (color instanceof Primary) {
      return "dark:outline-primary-200";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-200";
    } else if (color instanceof Success) {
      return "dark:outline-success-200";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-200";
    } else if (color instanceof Err) {
      return "dark:outline-error-200";
    } else if (color instanceof Info) {
      return "dark:outline-info-200";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-200";
    } else {
      return "dark:outline-on-surface-200";
    }
  } else if (weight instanceof W300) {
    if (color instanceof Primary) {
      return "dark:outline-primary-300";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-300";
    } else if (color instanceof Success) {
      return "dark:outline-success-300";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-300";
    } else if (color instanceof Err) {
      return "dark:outline-error-300";
    } else if (color instanceof Info) {
      return "dark:outline-info-300";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-300";
    } else {
      return "dark:outline-on-surface-300";
    }
  } else if (weight instanceof W400) {
    if (color instanceof Primary) {
      return "dark:outline-primary-400";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-400";
    } else if (color instanceof Success) {
      return "dark:outline-success-400";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-400";
    } else if (color instanceof Err) {
      return "dark:outline-error-400";
    } else if (color instanceof Info) {
      return "dark:outline-info-400";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-400";
    } else {
      return "dark:outline-on-surface-400";
    }
  } else if (weight instanceof W500) {
    if (color instanceof Primary) {
      return "dark:outline-primary-500";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-500";
    } else if (color instanceof Success) {
      return "dark:outline-success-500";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-500";
    } else if (color instanceof Err) {
      return "dark:outline-error-500";
    } else if (color instanceof Info) {
      return "dark:outline-info-500";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-500";
    } else {
      return "dark:outline-on-surface-500";
    }
  } else if (weight instanceof W600) {
    if (color instanceof Primary) {
      return "dark:outline-primary-600";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-600";
    } else if (color instanceof Success) {
      return "dark:outline-success-600";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-600";
    } else if (color instanceof Err) {
      return "dark:outline-error-600";
    } else if (color instanceof Info) {
      return "dark:outline-info-600";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-600";
    } else {
      return "dark:outline-on-surface-600";
    }
  } else if (weight instanceof W700) {
    if (color instanceof Primary) {
      return "dark:outline-primary-700";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-700";
    } else if (color instanceof Success) {
      return "dark:outline-success-700";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-700";
    } else if (color instanceof Err) {
      return "dark:outline-error-700";
    } else if (color instanceof Info) {
      return "dark:outline-info-700";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-700";
    } else {
      return "dark:outline-on-surface-700";
    }
  } else if (weight instanceof W800) {
    if (color instanceof Primary) {
      return "dark:outline-primary-800";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-800";
    } else if (color instanceof Success) {
      return "dark:outline-success-800";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-800";
    } else if (color instanceof Err) {
      return "dark:outline-error-800";
    } else if (color instanceof Info) {
      return "dark:outline-info-800";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-800";
    } else {
      return "dark:outline-on-surface-800";
    }
  } else if (weight instanceof W900) {
    if (color instanceof Primary) {
      return "dark:outline-primary-900";
    } else if (color instanceof Secondary) {
      return "dark:outline-secondary-900";
    } else if (color instanceof Success) {
      return "dark:outline-success-900";
    } else if (color instanceof Warn) {
      return "dark:outline-warn-900";
    } else if (color instanceof Err) {
      return "dark:outline-error-900";
    } else if (color instanceof Info) {
      return "dark:outline-info-900";
    } else if (color instanceof Surface) {
      return "dark:outline-surface-900";
    } else {
      return "dark:outline-on-surface-900";
    }
  } else if (color instanceof Primary) {
    return "dark:outline-primary-950";
  } else if (color instanceof Secondary) {
    return "dark:outline-secondary-950";
  } else if (color instanceof Success) {
    return "dark:outline-success-950";
  } else if (color instanceof Warn) {
    return "dark:outline-warn-950";
  } else if (color instanceof Err) {
    return "dark:outline-error-950";
  } else if (color instanceof Info) {
    return "dark:outline-info-950";
  } else if (color instanceof Surface) {
    return "dark:outline-surface-950";
  } else {
    return "dark:outline-on-surface-950";
  }
}

// build/dev/javascript/glelements/glelements/tailwind.mjs
function color_class(property3, color, weight, theme) {
  if (theme instanceof Some) {
    let $ = theme[0];
    if ($ instanceof Preferred) {
      let _block;
      if (property3 instanceof Background) {
        _block = background_class(color, weight);
      } else if (property3 instanceof Border) {
        _block = border_class(color, weight);
      } else if (property3 instanceof Outline) {
        _block = outline_class(color, weight);
      } else {
        _block = text_class(color, weight);
      }
      let light_class = _block;
      let dark_weight = invert_weight(weight);
      let _block$1;
      if (property3 instanceof Background) {
        _block$1 = dark_background_class(color, dark_weight);
      } else if (property3 instanceof Border) {
        _block$1 = dark_border_class(color, dark_weight);
      } else if (property3 instanceof Outline) {
        _block$1 = dark_outline_class(color, dark_weight);
      } else {
        _block$1 = dark_text_class(color, dark_weight);
      }
      let dark_class = _block$1;
      return light_class + " " + dark_class;
    } else if ($ instanceof Light) {
      if (property3 instanceof Background) {
        return background_class(color, weight);
      } else if (property3 instanceof Border) {
        return border_class(color, weight);
      } else if (property3 instanceof Outline) {
        return outline_class(color, weight);
      } else {
        return text_class(color, weight);
      }
    } else {
      let _block;
      if (property3 instanceof Background) {
        _block = background_class(color, weight);
      } else if (property3 instanceof Border) {
        _block = border_class(color, weight);
      } else if (property3 instanceof Outline) {
        _block = outline_class(color, weight);
      } else {
        _block = text_class(color, weight);
      }
      let light_class = _block;
      let dark_weight = invert_weight(weight);
      let _block$1;
      if (property3 instanceof Background) {
        _block$1 = dark_background_class(color, dark_weight);
      } else if (property3 instanceof Border) {
        _block$1 = dark_border_class(color, dark_weight);
      } else if (property3 instanceof Outline) {
        _block$1 = dark_outline_class(color, dark_weight);
      } else {
        _block$1 = dark_text_class(color, dark_weight);
      }
      let dark_class = _block$1;
      return light_class + " " + dark_class;
    }
  } else {
    if (property3 instanceof Background) {
      return background_class(color, weight);
    } else if (property3 instanceof Border) {
      return border_class(color, weight);
    } else if (property3 instanceof Outline) {
      return outline_class(color, weight);
    } else {
      return text_class(color, weight);
    }
  }
}
function color_attr(property3, color, weight, theme) {
  return class$(color_class(property3, color, weight, theme));
}
function background(color, weight, theme) {
  return color_attr(new Background(), color, weight, theme);
}

// build/dev/javascript/glelements/glelements/button.mjs
var Outline2 = class extends CustomType {
};
var BgLight = class extends CustomType {
};
function of(element4, attributes, children) {
  return element4(prepend(role("button"), attributes), children);
}
function rounded() {
  return class$("rounded-md");
}
function padding(value) {
  if (value === "sm") {
    return class$("px-2 py-1");
  } else if (value === "md") {
    return class$("px-4 py-2");
  } else if (value === "lg") {
    return class$("px-8 py-4");
  } else {
    return class$("p-0");
  }
}
function hover(value) {
  if (value instanceof Outline2) {
    return class$(
      "outline outline-transparent outline-2 hover:outline-on-surface-500 dark:hover:outline-on-surface-200"
    );
  } else if (value instanceof BgLight) {
    return background(
      new Primary(),
      new W400(),
      new Some(new Preferred())
    );
  } else {
    return background(
      new Primary(),
      new W600(),
      new Some(new Preferred())
    );
  }
}
function transition() {
  return class$("transition ease-in-out");
}
function ensure_default_background(attributes) {
  let _block;
  let _pipe = attributes;
  _block = any(
    _pipe,
    (attr) => {
      if (attr instanceof Attribute) {
        let value = attr.value;
        return attr.name === "class" && contains_string(value, "bg-");
      } else {
        return false;
      }
    }
  );
  let has_bg_attr = _block;
  if (has_bg_attr) {
    return toList([]);
  } else {
    return toList([
      background(
        new Primary(),
        new W400(),
        new Some(new Preferred())
      )
    ]);
  }
}
function basic(attributes, children) {
  let basic_attributes = toList([
    hover(new Outline2()),
    padding("md"),
    rounded(),
    transition()
  ]);
  let _block;
  let _pipe = attributes;
  let _pipe$1 = ensure_default_background(_pipe);
  let _pipe$2 = append2(_pipe$1, basic_attributes);
  _block = append2(_pipe$2, attributes);
  let attr = _block;
  return of(button, attr, children);
}
function theme_toggle(attributes, children) {
  let children$1 = prepend(
    span(
      toList([
        class$("grid grid-cols-1 grid-rows-1 place-items-center")
      ]),
      toList([
        sun(
          toList([
            class$(
              "col-start-1 row-start-1 dark:opacity-0 duration-300"
            ),
            transition()
          ])
        ),
        moon(
          toList([
            class$(
              "col-start-1 row-start-1 opacity-0 dark:opacity-100 duration-300"
            ),
            transition()
          ])
        )
      ])
    ),
    children
  );
  return basic(attributes, children$1);
}

// build/dev/javascript/glelements/theme.ffi.mjs
function toggleColorScheme() {
  const toColorScheme = localStorage.theme === "light" ? "dark" : "light";
  setLocalStorageColorScheme(toColorScheme);
  toggleDarkClass();
}
function initializeColorScheme() {
  if (!("theme" in localStorage)) {
    localStorage.theme = "light";
  }
  toggleDarkClass();
}
function toggleDarkClass() {
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark"
  );
}
function setLocalStorageColorScheme(scheme) {
  localStorage.theme = scheme === "dark" ? "dark" : "light";
}

// build/dev/javascript/glelements/glelements/theme.mjs
function toggle_color_scheme() {
  return toggleColorScheme();
}
function initialize_color_scheme() {
  return initializeColorScheme();
}

// build/dev/javascript/gleam_stdlib/gleam/bool.mjs
function guard(requirement, consequence, alternative) {
  if (requirement) {
    return consequence;
  } else {
    return alternative();
  }
}

// build/dev/javascript/lustre/lustre/effect.mjs
var Effect = class extends CustomType {
  constructor(synchronous, before_paint2, after_paint) {
    super();
    this.synchronous = synchronous;
    this.before_paint = before_paint2;
    this.after_paint = after_paint;
  }
};
var empty2 = /* @__PURE__ */ new Effect(
  /* @__PURE__ */ toList([]),
  /* @__PURE__ */ toList([]),
  /* @__PURE__ */ toList([])
);
function none2() {
  return empty2;
}

// build/dev/javascript/lustre/lustre/vdom/patch.mjs
var Patch = class extends CustomType {
  constructor(index2, removed, changes, children) {
    super();
    this.index = index2;
    this.removed = removed;
    this.changes = changes;
    this.children = children;
  }
};
var ReplaceText = class extends CustomType {
  constructor(kind, content2) {
    super();
    this.kind = kind;
    this.content = content2;
  }
};
var ReplaceInnerHtml = class extends CustomType {
  constructor(kind, inner_html) {
    super();
    this.kind = kind;
    this.inner_html = inner_html;
  }
};
var Update = class extends CustomType {
  constructor(kind, added, removed) {
    super();
    this.kind = kind;
    this.added = added;
    this.removed = removed;
  }
};
var Move = class extends CustomType {
  constructor(kind, key, before) {
    super();
    this.kind = kind;
    this.key = key;
    this.before = before;
  }
};
var Replace = class extends CustomType {
  constructor(kind, index2, with$) {
    super();
    this.kind = kind;
    this.index = index2;
    this.with = with$;
  }
};
var Remove = class extends CustomType {
  constructor(kind, index2) {
    super();
    this.kind = kind;
    this.index = index2;
  }
};
var Insert = class extends CustomType {
  constructor(kind, children, before) {
    super();
    this.kind = kind;
    this.children = children;
    this.before = before;
  }
};
function new$5(index2, removed, changes, children) {
  return new Patch(index2, removed, changes, children);
}
var replace_text_kind = 0;
function replace_text(content2) {
  return new ReplaceText(replace_text_kind, content2);
}
var replace_inner_html_kind = 1;
function replace_inner_html(inner_html) {
  return new ReplaceInnerHtml(replace_inner_html_kind, inner_html);
}
var update_kind = 2;
function update(added, removed) {
  return new Update(update_kind, added, removed);
}
var move_kind = 3;
function move(key, before) {
  return new Move(move_kind, key, before);
}
var remove_kind = 4;
function remove2(index2) {
  return new Remove(remove_kind, index2);
}
var replace_kind = 5;
function replace2(index2, with$) {
  return new Replace(replace_kind, index2, with$);
}
var insert_kind = 6;
function insert3(children, before) {
  return new Insert(insert_kind, children, before);
}

// build/dev/javascript/lustre/lustre/vdom/diff.mjs
var Diff = class extends CustomType {
  constructor(patch, events) {
    super();
    this.patch = patch;
    this.events = events;
  }
};
var AttributeChange = class extends CustomType {
  constructor(added, removed, events) {
    super();
    this.added = added;
    this.removed = removed;
    this.events = events;
  }
};
function is_controlled(events, namespace2, tag, path2) {
  if (tag === "input" && namespace2 === "") {
    return has_dispatched_events(events, path2);
  } else if (tag === "select" && namespace2 === "") {
    return has_dispatched_events(events, path2);
  } else if (tag === "textarea" && namespace2 === "") {
    return has_dispatched_events(events, path2);
  } else {
    return false;
  }
}
function diff_attributes(loop$controlled, loop$path, loop$mapper, loop$events, loop$old, loop$new, loop$added, loop$removed) {
  while (true) {
    let controlled = loop$controlled;
    let path2 = loop$path;
    let mapper = loop$mapper;
    let events = loop$events;
    let old = loop$old;
    let new$8 = loop$new;
    let added = loop$added;
    let removed = loop$removed;
    if (new$8 instanceof Empty) {
      if (old instanceof Empty) {
        return new AttributeChange(added, removed, events);
      } else {
        let $ = old.head;
        if ($ instanceof Event2) {
          let prev = $;
          let old$1 = old.tail;
          let name = $.name;
          let removed$1 = prepend(prev, removed);
          let events$1 = remove_event(events, path2, name);
          loop$controlled = controlled;
          loop$path = path2;
          loop$mapper = mapper;
          loop$events = events$1;
          loop$old = old$1;
          loop$new = new$8;
          loop$added = added;
          loop$removed = removed$1;
        } else {
          let prev = $;
          let old$1 = old.tail;
          let removed$1 = prepend(prev, removed);
          loop$controlled = controlled;
          loop$path = path2;
          loop$mapper = mapper;
          loop$events = events;
          loop$old = old$1;
          loop$new = new$8;
          loop$added = added;
          loop$removed = removed$1;
        }
      }
    } else if (old instanceof Empty) {
      let $ = new$8.head;
      if ($ instanceof Event2) {
        let next = $;
        let new$1 = new$8.tail;
        let name = $.name;
        let handler = $.handler;
        let added$1 = prepend(next, added);
        let events$1 = add_event(events, mapper, path2, name, handler);
        loop$controlled = controlled;
        loop$path = path2;
        loop$mapper = mapper;
        loop$events = events$1;
        loop$old = old;
        loop$new = new$1;
        loop$added = added$1;
        loop$removed = removed;
      } else {
        let next = $;
        let new$1 = new$8.tail;
        let added$1 = prepend(next, added);
        loop$controlled = controlled;
        loop$path = path2;
        loop$mapper = mapper;
        loop$events = events;
        loop$old = old;
        loop$new = new$1;
        loop$added = added$1;
        loop$removed = removed;
      }
    } else {
      let next = new$8.head;
      let remaining_new = new$8.tail;
      let prev = old.head;
      let remaining_old = old.tail;
      let $ = compare3(prev, next);
      if ($ instanceof Lt) {
        if (prev instanceof Event2) {
          let name = prev.name;
          let removed$1 = prepend(prev, removed);
          let events$1 = remove_event(events, path2, name);
          loop$controlled = controlled;
          loop$path = path2;
          loop$mapper = mapper;
          loop$events = events$1;
          loop$old = remaining_old;
          loop$new = new$8;
          loop$added = added;
          loop$removed = removed$1;
        } else {
          let removed$1 = prepend(prev, removed);
          loop$controlled = controlled;
          loop$path = path2;
          loop$mapper = mapper;
          loop$events = events;
          loop$old = remaining_old;
          loop$new = new$8;
          loop$added = added;
          loop$removed = removed$1;
        }
      } else if ($ instanceof Eq) {
        if (next instanceof Attribute) {
          if (prev instanceof Attribute) {
            let _block;
            let $1 = next.name;
            if ($1 === "value") {
              _block = controlled || prev.value !== next.value;
            } else if ($1 === "checked") {
              _block = controlled || prev.value !== next.value;
            } else if ($1 === "selected") {
              _block = controlled || prev.value !== next.value;
            } else {
              _block = prev.value !== next.value;
            }
            let has_changes = _block;
            let _block$1;
            if (has_changes) {
              _block$1 = prepend(next, added);
            } else {
              _block$1 = added;
            }
            let added$1 = _block$1;
            loop$controlled = controlled;
            loop$path = path2;
            loop$mapper = mapper;
            loop$events = events;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = added$1;
            loop$removed = removed;
          } else if (prev instanceof Event2) {
            let name = prev.name;
            let added$1 = prepend(next, added);
            let removed$1 = prepend(prev, removed);
            let events$1 = remove_event(events, path2, name);
            loop$controlled = controlled;
            loop$path = path2;
            loop$mapper = mapper;
            loop$events = events$1;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = added$1;
            loop$removed = removed$1;
          } else {
            let added$1 = prepend(next, added);
            let removed$1 = prepend(prev, removed);
            loop$controlled = controlled;
            loop$path = path2;
            loop$mapper = mapper;
            loop$events = events;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = added$1;
            loop$removed = removed$1;
          }
        } else if (next instanceof Property) {
          if (prev instanceof Property) {
            let _block;
            let $1 = next.name;
            if ($1 === "scrollLeft") {
              _block = true;
            } else if ($1 === "scrollRight") {
              _block = true;
            } else if ($1 === "value") {
              _block = controlled || !isEqual2(
                prev.value,
                next.value
              );
            } else if ($1 === "checked") {
              _block = controlled || !isEqual2(
                prev.value,
                next.value
              );
            } else if ($1 === "selected") {
              _block = controlled || !isEqual2(
                prev.value,
                next.value
              );
            } else {
              _block = !isEqual2(prev.value, next.value);
            }
            let has_changes = _block;
            let _block$1;
            if (has_changes) {
              _block$1 = prepend(next, added);
            } else {
              _block$1 = added;
            }
            let added$1 = _block$1;
            loop$controlled = controlled;
            loop$path = path2;
            loop$mapper = mapper;
            loop$events = events;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = added$1;
            loop$removed = removed;
          } else if (prev instanceof Event2) {
            let name = prev.name;
            let added$1 = prepend(next, added);
            let removed$1 = prepend(prev, removed);
            let events$1 = remove_event(events, path2, name);
            loop$controlled = controlled;
            loop$path = path2;
            loop$mapper = mapper;
            loop$events = events$1;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = added$1;
            loop$removed = removed$1;
          } else {
            let added$1 = prepend(next, added);
            let removed$1 = prepend(prev, removed);
            loop$controlled = controlled;
            loop$path = path2;
            loop$mapper = mapper;
            loop$events = events;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = added$1;
            loop$removed = removed$1;
          }
        } else if (prev instanceof Event2) {
          let name = next.name;
          let handler = next.handler;
          let has_changes = prev.prevent_default.kind !== next.prevent_default.kind || prev.stop_propagation.kind !== next.stop_propagation.kind || prev.immediate !== next.immediate || prev.debounce !== next.debounce || prev.throttle !== next.throttle;
          let _block;
          if (has_changes) {
            _block = prepend(next, added);
          } else {
            _block = added;
          }
          let added$1 = _block;
          let events$1 = add_event(events, mapper, path2, name, handler);
          loop$controlled = controlled;
          loop$path = path2;
          loop$mapper = mapper;
          loop$events = events$1;
          loop$old = remaining_old;
          loop$new = remaining_new;
          loop$added = added$1;
          loop$removed = removed;
        } else {
          let name = next.name;
          let handler = next.handler;
          let added$1 = prepend(next, added);
          let removed$1 = prepend(prev, removed);
          let events$1 = add_event(events, mapper, path2, name, handler);
          loop$controlled = controlled;
          loop$path = path2;
          loop$mapper = mapper;
          loop$events = events$1;
          loop$old = remaining_old;
          loop$new = remaining_new;
          loop$added = added$1;
          loop$removed = removed$1;
        }
      } else if (next instanceof Event2) {
        let name = next.name;
        let handler = next.handler;
        let added$1 = prepend(next, added);
        let events$1 = add_event(events, mapper, path2, name, handler);
        loop$controlled = controlled;
        loop$path = path2;
        loop$mapper = mapper;
        loop$events = events$1;
        loop$old = old;
        loop$new = remaining_new;
        loop$added = added$1;
        loop$removed = removed;
      } else {
        let added$1 = prepend(next, added);
        loop$controlled = controlled;
        loop$path = path2;
        loop$mapper = mapper;
        loop$events = events;
        loop$old = old;
        loop$new = remaining_new;
        loop$added = added$1;
        loop$removed = removed;
      }
    }
  }
}
function do_diff(loop$old, loop$old_keyed, loop$new, loop$new_keyed, loop$moved, loop$moved_offset, loop$removed, loop$node_index, loop$patch_index, loop$path, loop$changes, loop$children, loop$mapper, loop$events) {
  while (true) {
    let old = loop$old;
    let old_keyed = loop$old_keyed;
    let new$8 = loop$new;
    let new_keyed = loop$new_keyed;
    let moved = loop$moved;
    let moved_offset = loop$moved_offset;
    let removed = loop$removed;
    let node_index = loop$node_index;
    let patch_index = loop$patch_index;
    let path2 = loop$path;
    let changes = loop$changes;
    let children = loop$children;
    let mapper = loop$mapper;
    let events = loop$events;
    if (new$8 instanceof Empty) {
      if (old instanceof Empty) {
        return new Diff(
          new Patch(patch_index, removed, changes, children),
          events
        );
      } else {
        let prev = old.head;
        let old$1 = old.tail;
        let _block;
        let $ = prev.key === "" || !has_key2(moved, prev.key);
        if ($) {
          _block = removed + 1;
        } else {
          _block = removed;
        }
        let removed$1 = _block;
        let events$1 = remove_child(events, path2, node_index, prev);
        loop$old = old$1;
        loop$old_keyed = old_keyed;
        loop$new = new$8;
        loop$new_keyed = new_keyed;
        loop$moved = moved;
        loop$moved_offset = moved_offset;
        loop$removed = removed$1;
        loop$node_index = node_index;
        loop$patch_index = patch_index;
        loop$path = path2;
        loop$changes = changes;
        loop$children = children;
        loop$mapper = mapper;
        loop$events = events$1;
      }
    } else if (old instanceof Empty) {
      let events$1 = add_children(
        events,
        mapper,
        path2,
        node_index,
        new$8
      );
      let insert4 = insert3(new$8, node_index - moved_offset);
      let changes$1 = prepend(insert4, changes);
      return new Diff(
        new Patch(patch_index, removed, changes$1, children),
        events$1
      );
    } else {
      let next = new$8.head;
      let prev = old.head;
      if (prev.key !== next.key) {
        let new_remaining = new$8.tail;
        let old_remaining = old.tail;
        let next_did_exist = get(old_keyed, next.key);
        let prev_does_exist = has_key2(new_keyed, prev.key);
        if (next_did_exist instanceof Ok) {
          if (prev_does_exist) {
            let match = next_did_exist[0];
            let $ = has_key2(moved, prev.key);
            if ($) {
              loop$old = old_remaining;
              loop$old_keyed = old_keyed;
              loop$new = new$8;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset - 1;
              loop$removed = removed;
              loop$node_index = node_index;
              loop$patch_index = patch_index;
              loop$path = path2;
              loop$changes = changes;
              loop$children = children;
              loop$mapper = mapper;
              loop$events = events;
            } else {
              let before = node_index - moved_offset;
              let changes$1 = prepend(
                move(next.key, before),
                changes
              );
              let moved$1 = insert2(moved, next.key, void 0);
              let moved_offset$1 = moved_offset + 1;
              loop$old = prepend(match, old);
              loop$old_keyed = old_keyed;
              loop$new = new$8;
              loop$new_keyed = new_keyed;
              loop$moved = moved$1;
              loop$moved_offset = moved_offset$1;
              loop$removed = removed;
              loop$node_index = node_index;
              loop$patch_index = patch_index;
              loop$path = path2;
              loop$changes = changes$1;
              loop$children = children;
              loop$mapper = mapper;
              loop$events = events;
            }
          } else {
            let index2 = node_index - moved_offset;
            let changes$1 = prepend(remove2(index2), changes);
            let events$1 = remove_child(events, path2, node_index, prev);
            let moved_offset$1 = moved_offset - 1;
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new$8;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset$1;
            loop$removed = removed;
            loop$node_index = node_index;
            loop$patch_index = patch_index;
            loop$path = path2;
            loop$changes = changes$1;
            loop$children = children;
            loop$mapper = mapper;
            loop$events = events$1;
          }
        } else if (prev_does_exist) {
          let before = node_index - moved_offset;
          let events$1 = add_child(
            events,
            mapper,
            path2,
            node_index,
            next
          );
          let insert4 = insert3(toList([next]), before);
          let changes$1 = prepend(insert4, changes);
          loop$old = old;
          loop$old_keyed = old_keyed;
          loop$new = new_remaining;
          loop$new_keyed = new_keyed;
          loop$moved = moved;
          loop$moved_offset = moved_offset + 1;
          loop$removed = removed;
          loop$node_index = node_index + 1;
          loop$patch_index = patch_index;
          loop$path = path2;
          loop$changes = changes$1;
          loop$children = children;
          loop$mapper = mapper;
          loop$events = events$1;
        } else {
          let change = replace2(node_index - moved_offset, next);
          let _block;
          let _pipe = events;
          let _pipe$1 = remove_child(_pipe, path2, node_index, prev);
          _block = add_child(_pipe$1, mapper, path2, node_index, next);
          let events$1 = _block;
          loop$old = old_remaining;
          loop$old_keyed = old_keyed;
          loop$new = new_remaining;
          loop$new_keyed = new_keyed;
          loop$moved = moved;
          loop$moved_offset = moved_offset;
          loop$removed = removed;
          loop$node_index = node_index + 1;
          loop$patch_index = patch_index;
          loop$path = path2;
          loop$changes = prepend(change, changes);
          loop$children = children;
          loop$mapper = mapper;
          loop$events = events$1;
        }
      } else {
        let $ = old.head;
        if ($ instanceof Fragment) {
          let $1 = new$8.head;
          if ($1 instanceof Fragment) {
            let next$1 = $1;
            let new$1 = new$8.tail;
            let prev$1 = $;
            let old$1 = old.tail;
            let composed_mapper = compose_mapper(mapper, next$1.mapper);
            let child_path = add2(path2, node_index, next$1.key);
            let child = do_diff(
              prev$1.children,
              prev$1.keyed_children,
              next$1.children,
              next$1.keyed_children,
              empty(),
              0,
              0,
              0,
              node_index,
              child_path,
              empty_list,
              empty_list,
              composed_mapper,
              events
            );
            let _block;
            let $2 = child.patch;
            let $3 = $2.children;
            if ($3 instanceof Empty) {
              let $4 = $2.changes;
              if ($4 instanceof Empty) {
                let $5 = $2.removed;
                if ($5 === 0) {
                  _block = children;
                } else {
                  _block = prepend(child.patch, children);
                }
              } else {
                _block = prepend(child.patch, children);
              }
            } else {
              _block = prepend(child.patch, children);
            }
            let children$1 = _block;
            loop$old = old$1;
            loop$old_keyed = old_keyed;
            loop$new = new$1;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$path = path2;
            loop$changes = changes;
            loop$children = children$1;
            loop$mapper = mapper;
            loop$events = child.events;
          } else {
            let next$1 = $1;
            let new_remaining = new$8.tail;
            let prev$1 = $;
            let old_remaining = old.tail;
            let change = replace2(node_index - moved_offset, next$1);
            let _block;
            let _pipe = events;
            let _pipe$1 = remove_child(_pipe, path2, node_index, prev$1);
            _block = add_child(
              _pipe$1,
              mapper,
              path2,
              node_index,
              next$1
            );
            let events$1 = _block;
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$path = path2;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$mapper = mapper;
            loop$events = events$1;
          }
        } else if ($ instanceof Element) {
          let $1 = new$8.head;
          if ($1 instanceof Element) {
            let next$1 = $1;
            let prev$1 = $;
            if (prev$1.namespace === next$1.namespace && prev$1.tag === next$1.tag) {
              let new$1 = new$8.tail;
              let old$1 = old.tail;
              let composed_mapper = compose_mapper(
                mapper,
                next$1.mapper
              );
              let child_path = add2(path2, node_index, next$1.key);
              let controlled = is_controlled(
                events,
                next$1.namespace,
                next$1.tag,
                child_path
              );
              let $2 = diff_attributes(
                controlled,
                child_path,
                composed_mapper,
                events,
                prev$1.attributes,
                next$1.attributes,
                empty_list,
                empty_list
              );
              let added_attrs;
              let removed_attrs;
              let events$1;
              added_attrs = $2.added;
              removed_attrs = $2.removed;
              events$1 = $2.events;
              let _block;
              if (removed_attrs instanceof Empty && added_attrs instanceof Empty) {
                _block = empty_list;
              } else {
                _block = toList([update(added_attrs, removed_attrs)]);
              }
              let initial_child_changes = _block;
              let child = do_diff(
                prev$1.children,
                prev$1.keyed_children,
                next$1.children,
                next$1.keyed_children,
                empty(),
                0,
                0,
                0,
                node_index,
                child_path,
                initial_child_changes,
                empty_list,
                composed_mapper,
                events$1
              );
              let _block$1;
              let $3 = child.patch;
              let $4 = $3.children;
              if ($4 instanceof Empty) {
                let $5 = $3.changes;
                if ($5 instanceof Empty) {
                  let $6 = $3.removed;
                  if ($6 === 0) {
                    _block$1 = children;
                  } else {
                    _block$1 = prepend(child.patch, children);
                  }
                } else {
                  _block$1 = prepend(child.patch, children);
                }
              } else {
                _block$1 = prepend(child.patch, children);
              }
              let children$1 = _block$1;
              loop$old = old$1;
              loop$old_keyed = old_keyed;
              loop$new = new$1;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$path = path2;
              loop$changes = changes;
              loop$children = children$1;
              loop$mapper = mapper;
              loop$events = child.events;
            } else {
              let next$2 = $1;
              let new_remaining = new$8.tail;
              let prev$2 = $;
              let old_remaining = old.tail;
              let change = replace2(node_index - moved_offset, next$2);
              let _block;
              let _pipe = events;
              let _pipe$1 = remove_child(
                _pipe,
                path2,
                node_index,
                prev$2
              );
              _block = add_child(
                _pipe$1,
                mapper,
                path2,
                node_index,
                next$2
              );
              let events$1 = _block;
              loop$old = old_remaining;
              loop$old_keyed = old_keyed;
              loop$new = new_remaining;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$path = path2;
              loop$changes = prepend(change, changes);
              loop$children = children;
              loop$mapper = mapper;
              loop$events = events$1;
            }
          } else {
            let next$1 = $1;
            let new_remaining = new$8.tail;
            let prev$1 = $;
            let old_remaining = old.tail;
            let change = replace2(node_index - moved_offset, next$1);
            let _block;
            let _pipe = events;
            let _pipe$1 = remove_child(_pipe, path2, node_index, prev$1);
            _block = add_child(
              _pipe$1,
              mapper,
              path2,
              node_index,
              next$1
            );
            let events$1 = _block;
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$path = path2;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$mapper = mapper;
            loop$events = events$1;
          }
        } else if ($ instanceof Text) {
          let $1 = new$8.head;
          if ($1 instanceof Text) {
            let next$1 = $1;
            let prev$1 = $;
            if (prev$1.content === next$1.content) {
              let new$1 = new$8.tail;
              let old$1 = old.tail;
              loop$old = old$1;
              loop$old_keyed = old_keyed;
              loop$new = new$1;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$path = path2;
              loop$changes = changes;
              loop$children = children;
              loop$mapper = mapper;
              loop$events = events;
            } else {
              let next$2 = $1;
              let new$1 = new$8.tail;
              let old$1 = old.tail;
              let child = new$5(
                node_index,
                0,
                toList([replace_text(next$2.content)]),
                empty_list
              );
              loop$old = old$1;
              loop$old_keyed = old_keyed;
              loop$new = new$1;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$path = path2;
              loop$changes = changes;
              loop$children = prepend(child, children);
              loop$mapper = mapper;
              loop$events = events;
            }
          } else {
            let next$1 = $1;
            let new_remaining = new$8.tail;
            let prev$1 = $;
            let old_remaining = old.tail;
            let change = replace2(node_index - moved_offset, next$1);
            let _block;
            let _pipe = events;
            let _pipe$1 = remove_child(_pipe, path2, node_index, prev$1);
            _block = add_child(
              _pipe$1,
              mapper,
              path2,
              node_index,
              next$1
            );
            let events$1 = _block;
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$path = path2;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$mapper = mapper;
            loop$events = events$1;
          }
        } else {
          let $1 = new$8.head;
          if ($1 instanceof UnsafeInnerHtml) {
            let next$1 = $1;
            let new$1 = new$8.tail;
            let prev$1 = $;
            let old$1 = old.tail;
            let composed_mapper = compose_mapper(mapper, next$1.mapper);
            let child_path = add2(path2, node_index, next$1.key);
            let $2 = diff_attributes(
              false,
              child_path,
              composed_mapper,
              events,
              prev$1.attributes,
              next$1.attributes,
              empty_list,
              empty_list
            );
            let added_attrs;
            let removed_attrs;
            let events$1;
            added_attrs = $2.added;
            removed_attrs = $2.removed;
            events$1 = $2.events;
            let _block;
            if (removed_attrs instanceof Empty && added_attrs instanceof Empty) {
              _block = empty_list;
            } else {
              _block = toList([update(added_attrs, removed_attrs)]);
            }
            let child_changes = _block;
            let _block$1;
            let $3 = prev$1.inner_html === next$1.inner_html;
            if ($3) {
              _block$1 = child_changes;
            } else {
              _block$1 = prepend(
                replace_inner_html(next$1.inner_html),
                child_changes
              );
            }
            let child_changes$1 = _block$1;
            let _block$2;
            if (child_changes$1 instanceof Empty) {
              _block$2 = children;
            } else {
              _block$2 = prepend(
                new$5(node_index, 0, child_changes$1, toList([])),
                children
              );
            }
            let children$1 = _block$2;
            loop$old = old$1;
            loop$old_keyed = old_keyed;
            loop$new = new$1;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$path = path2;
            loop$changes = changes;
            loop$children = children$1;
            loop$mapper = mapper;
            loop$events = events$1;
          } else {
            let next$1 = $1;
            let new_remaining = new$8.tail;
            let prev$1 = $;
            let old_remaining = old.tail;
            let change = replace2(node_index - moved_offset, next$1);
            let _block;
            let _pipe = events;
            let _pipe$1 = remove_child(_pipe, path2, node_index, prev$1);
            _block = add_child(
              _pipe$1,
              mapper,
              path2,
              node_index,
              next$1
            );
            let events$1 = _block;
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$path = path2;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$mapper = mapper;
            loop$events = events$1;
          }
        }
      }
    }
  }
}
function diff(events, old, new$8) {
  return do_diff(
    toList([old]),
    empty(),
    toList([new$8]),
    empty(),
    empty(),
    0,
    0,
    0,
    0,
    root2,
    empty_list,
    empty_list,
    identity3,
    tick(events)
  );
}

// build/dev/javascript/lustre/lustre/vdom/reconciler.ffi.mjs
var setTimeout = globalThis.setTimeout;
var clearTimeout = globalThis.clearTimeout;
var createElementNS = (ns, name) => document2().createElementNS(ns, name);
var createTextNode = (data) => document2().createTextNode(data);
var createDocumentFragment = () => document2().createDocumentFragment();
var insertBefore = (parent, node, reference) => parent.insertBefore(node, reference);
var moveBefore = SUPPORTS_MOVE_BEFORE ? (parent, node, reference) => parent.moveBefore(node, reference) : insertBefore;
var removeChild = (parent, child) => parent.removeChild(child);
var getAttribute = (node, name) => node.getAttribute(name);
var setAttribute = (node, name, value) => node.setAttribute(name, value);
var removeAttribute = (node, name) => node.removeAttribute(name);
var addEventListener = (node, name, handler, options) => node.addEventListener(name, handler, options);
var removeEventListener = (node, name, handler) => node.removeEventListener(name, handler);
var setInnerHtml = (node, innerHtml) => node.innerHTML = innerHtml;
var setData = (node, data) => node.data = data;
var meta = Symbol("lustre");
var MetadataNode = class {
  constructor(kind, parent, node, key) {
    this.kind = kind;
    this.key = key;
    this.parent = parent;
    this.children = [];
    this.node = node;
    this.handlers = /* @__PURE__ */ new Map();
    this.throttles = /* @__PURE__ */ new Map();
    this.debouncers = /* @__PURE__ */ new Map();
  }
  get parentNode() {
    return this.kind === fragment_kind ? this.node.parentNode : this.node;
  }
};
var insertMetadataChild = (kind, parent, node, index2, key) => {
  const child = new MetadataNode(kind, parent, node, key);
  node[meta] = child;
  parent?.children.splice(index2, 0, child);
  return child;
};
var getPath = (node) => {
  let path2 = "";
  for (let current = node[meta]; current.parent; current = current.parent) {
    if (current.key) {
      path2 = `${separator_element}${current.key}${path2}`;
    } else {
      const index2 = current.parent.children.indexOf(current);
      path2 = `${separator_element}${index2}${path2}`;
    }
  }
  return path2.slice(1);
};
var Reconciler = class {
  #root = null;
  #dispatch = () => {
  };
  #useServerEvents = false;
  #exposeKeys = false;
  constructor(root3, dispatch, { useServerEvents = false, exposeKeys = false } = {}) {
    this.#root = root3;
    this.#dispatch = dispatch;
    this.#useServerEvents = useServerEvents;
    this.#exposeKeys = exposeKeys;
  }
  mount(vdom) {
    insertMetadataChild(element_kind, null, this.#root, 0, null);
    this.#insertChild(this.#root, null, this.#root[meta], 0, vdom);
  }
  push(patch) {
    this.#stack.push({ node: this.#root[meta], patch });
    this.#reconcile();
  }
  // PATCHING ------------------------------------------------------------------
  #stack = [];
  #reconcile() {
    const stack = this.#stack;
    while (stack.length) {
      const { node, patch } = stack.pop();
      const { children: childNodes } = node;
      const { changes, removed, children: childPatches } = patch;
      iterate(changes, (change) => this.#patch(node, change));
      if (removed) {
        this.#removeChildren(node, childNodes.length - removed, removed);
      }
      iterate(childPatches, (childPatch) => {
        const child = childNodes[childPatch.index | 0];
        this.#stack.push({ node: child, patch: childPatch });
      });
    }
  }
  #patch(node, change) {
    switch (change.kind) {
      case replace_text_kind:
        this.#replaceText(node, change);
        break;
      case replace_inner_html_kind:
        this.#replaceInnerHtml(node, change);
        break;
      case update_kind:
        this.#update(node, change);
        break;
      case move_kind:
        this.#move(node, change);
        break;
      case remove_kind:
        this.#remove(node, change);
        break;
      case replace_kind:
        this.#replace(node, change);
        break;
      case insert_kind:
        this.#insert(node, change);
        break;
    }
  }
  // CHANGES -------------------------------------------------------------------
  #insert(parent, { children, before }) {
    const fragment4 = createDocumentFragment();
    const beforeEl = this.#getReference(parent, before);
    this.#insertChildren(fragment4, null, parent, before | 0, children);
    insertBefore(parent.parentNode, fragment4, beforeEl);
  }
  #replace(parent, { index: index2, with: child }) {
    this.#removeChildren(parent, index2 | 0, 1);
    const beforeEl = this.#getReference(parent, index2);
    this.#insertChild(parent.parentNode, beforeEl, parent, index2 | 0, child);
  }
  #getReference(node, index2) {
    index2 = index2 | 0;
    const { children } = node;
    const childCount = children.length;
    if (index2 < childCount) {
      return children[index2].node;
    }
    let lastChild = children[childCount - 1];
    if (!lastChild && node.kind !== fragment_kind) return null;
    if (!lastChild) lastChild = node;
    while (lastChild.kind === fragment_kind && lastChild.children.length) {
      lastChild = lastChild.children[lastChild.children.length - 1];
    }
    return lastChild.node.nextSibling;
  }
  #move(parent, { key, before }) {
    before = before | 0;
    const { children, parentNode } = parent;
    const beforeEl = children[before].node;
    let prev = children[before];
    for (let i = before + 1; i < children.length; ++i) {
      const next = children[i];
      children[i] = prev;
      prev = next;
      if (next.key === key) {
        children[before] = next;
        break;
      }
    }
    const { kind, node, children: prevChildren } = prev;
    moveBefore(parentNode, node, beforeEl);
    if (kind === fragment_kind) {
      this.#moveChildren(parentNode, prevChildren, beforeEl);
    }
  }
  #moveChildren(domParent, children, beforeEl) {
    for (let i = 0; i < children.length; ++i) {
      const { kind, node, children: nestedChildren } = children[i];
      moveBefore(domParent, node, beforeEl);
      if (kind === fragment_kind) {
        this.#moveChildren(domParent, nestedChildren, beforeEl);
      }
    }
  }
  #remove(parent, { index: index2 }) {
    this.#removeChildren(parent, index2, 1);
  }
  #removeChildren(parent, index2, count) {
    const { children, parentNode } = parent;
    const deleted = children.splice(index2, count);
    for (let i = 0; i < deleted.length; ++i) {
      const { kind, node, children: nestedChildren } = deleted[i];
      removeChild(parentNode, node);
      this.#removeDebouncers(deleted[i]);
      if (kind === fragment_kind) {
        deleted.push(...nestedChildren);
      }
    }
  }
  #removeDebouncers(node) {
    const { debouncers, children } = node;
    for (const { timeout } of debouncers.values()) {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
    debouncers.clear();
    iterate(children, (child) => this.#removeDebouncers(child));
  }
  #update({ node, handlers, throttles, debouncers }, { added, removed }) {
    iterate(removed, ({ name }) => {
      if (handlers.delete(name)) {
        removeEventListener(node, name, handleEvent);
        this.#updateDebounceThrottle(throttles, name, 0);
        this.#updateDebounceThrottle(debouncers, name, 0);
      } else {
        removeAttribute(node, name);
        SYNCED_ATTRIBUTES[name]?.removed?.(node, name);
      }
    });
    iterate(added, (attribute3) => this.#createAttribute(node, attribute3));
  }
  #replaceText({ node }, { content: content2 }) {
    setData(node, content2 ?? "");
  }
  #replaceInnerHtml({ node }, { inner_html }) {
    setInnerHtml(node, inner_html ?? "");
  }
  // INSERT --------------------------------------------------------------------
  #insertChildren(domParent, beforeEl, metaParent, index2, children) {
    iterate(
      children,
      (child) => this.#insertChild(domParent, beforeEl, metaParent, index2++, child)
    );
  }
  #insertChild(domParent, beforeEl, metaParent, index2, vnode) {
    switch (vnode.kind) {
      case element_kind: {
        const node = this.#createElement(metaParent, index2, vnode);
        this.#insertChildren(node, null, node[meta], 0, vnode.children);
        insertBefore(domParent, node, beforeEl);
        break;
      }
      case text_kind: {
        const node = this.#createTextNode(metaParent, index2, vnode);
        insertBefore(domParent, node, beforeEl);
        break;
      }
      case fragment_kind: {
        const head = this.#createTextNode(metaParent, index2, vnode);
        insertBefore(domParent, head, beforeEl);
        this.#insertChildren(
          domParent,
          beforeEl,
          head[meta],
          0,
          vnode.children
        );
        break;
      }
      case unsafe_inner_html_kind: {
        const node = this.#createElement(metaParent, index2, vnode);
        this.#replaceInnerHtml({ node }, vnode);
        insertBefore(domParent, node, beforeEl);
        break;
      }
    }
  }
  #createElement(parent, index2, { kind, key, tag, namespace: namespace2, attributes }) {
    const node = createElementNS(namespace2 || NAMESPACE_HTML, tag);
    insertMetadataChild(kind, parent, node, index2, key);
    if (this.#exposeKeys && key) {
      setAttribute(node, "data-lustre-key", key);
    }
    iterate(attributes, (attribute3) => this.#createAttribute(node, attribute3));
    return node;
  }
  #createTextNode(parent, index2, { kind, key, content: content2 }) {
    const node = createTextNode(content2 ?? "");
    insertMetadataChild(kind, parent, node, index2, key);
    return node;
  }
  #createAttribute(node, attribute3) {
    const { debouncers, handlers, throttles } = node[meta];
    const {
      kind,
      name,
      value,
      prevent_default: prevent,
      debounce: debounceDelay,
      throttle: throttleDelay
    } = attribute3;
    switch (kind) {
      case attribute_kind: {
        const valueOrDefault = value ?? "";
        if (name === "virtual:defaultValue") {
          node.defaultValue = valueOrDefault;
          return;
        }
        if (valueOrDefault !== getAttribute(node, name)) {
          setAttribute(node, name, valueOrDefault);
        }
        SYNCED_ATTRIBUTES[name]?.added?.(node, valueOrDefault);
        break;
      }
      case property_kind:
        node[name] = value;
        break;
      case event_kind: {
        if (handlers.has(name)) {
          removeEventListener(node, name, handleEvent);
        }
        const passive = prevent.kind === never_kind;
        addEventListener(node, name, handleEvent, { passive });
        this.#updateDebounceThrottle(throttles, name, throttleDelay);
        this.#updateDebounceThrottle(debouncers, name, debounceDelay);
        handlers.set(name, (event4) => this.#handleEvent(attribute3, event4));
        break;
      }
    }
  }
  #updateDebounceThrottle(map4, name, delay) {
    const debounceOrThrottle = map4.get(name);
    if (delay > 0) {
      if (debounceOrThrottle) {
        debounceOrThrottle.delay = delay;
      } else {
        map4.set(name, { delay });
      }
    } else if (debounceOrThrottle) {
      const { timeout } = debounceOrThrottle;
      if (timeout) {
        clearTimeout(timeout);
      }
      map4.delete(name);
    }
  }
  #handleEvent(attribute3, event4) {
    const { currentTarget, type } = event4;
    const { debouncers, throttles } = currentTarget[meta];
    const path2 = getPath(currentTarget);
    const {
      prevent_default: prevent,
      stop_propagation: stop,
      include,
      immediate
    } = attribute3;
    if (prevent.kind === always_kind) event4.preventDefault();
    if (stop.kind === always_kind) event4.stopPropagation();
    if (type === "submit") {
      event4.detail ??= {};
      event4.detail.formData = [
        ...new FormData(event4.target, event4.submitter).entries()
      ];
    }
    const data = this.#useServerEvents ? createServerEvent(event4, include ?? []) : event4;
    const throttle = throttles.get(type);
    if (throttle) {
      const now = Date.now();
      const last = throttle.last || 0;
      if (now > last + throttle.delay) {
        throttle.last = now;
        throttle.lastEvent = event4;
        this.#dispatch(data, path2, type, immediate);
      }
    }
    const debounce = debouncers.get(type);
    if (debounce) {
      clearTimeout(debounce.timeout);
      debounce.timeout = setTimeout(() => {
        if (event4 === throttles.get(type)?.lastEvent) return;
        this.#dispatch(data, path2, type, immediate);
      }, debounce.delay);
    }
    if (!throttle && !debounce) {
      this.#dispatch(data, path2, type, immediate);
    }
  }
};
var iterate = (list4, callback) => {
  if (Array.isArray(list4)) {
    for (let i = 0; i < list4.length; i++) {
      callback(list4[i]);
    }
  } else if (list4) {
    for (list4; list4.head; list4 = list4.tail) {
      callback(list4.head);
    }
  }
};
var handleEvent = (event4) => {
  const { currentTarget, type } = event4;
  const handler = currentTarget[meta].handlers.get(type);
  handler(event4);
};
var createServerEvent = (event4, include = []) => {
  const data = {};
  if (event4.type === "input" || event4.type === "change") {
    include.push("target.value");
  }
  if (event4.type === "submit") {
    include.push("detail.formData");
  }
  for (const property3 of include) {
    const path2 = property3.split(".");
    for (let i = 0, input = event4, output = data; i < path2.length; i++) {
      if (i === path2.length - 1) {
        output[path2[i]] = input[path2[i]];
        break;
      }
      output = output[path2[i]] ??= {};
      input = input[path2[i]];
    }
  }
  return data;
};
var syncedBooleanAttribute = /* @__NO_SIDE_EFFECTS__ */ (name) => {
  return {
    added(node) {
      node[name] = true;
    },
    removed(node) {
      node[name] = false;
    }
  };
};
var syncedAttribute = /* @__NO_SIDE_EFFECTS__ */ (name) => {
  return {
    added(node, value) {
      node[name] = value;
    }
  };
};
var SYNCED_ATTRIBUTES = {
  checked: /* @__PURE__ */ syncedBooleanAttribute("checked"),
  selected: /* @__PURE__ */ syncedBooleanAttribute("selected"),
  value: /* @__PURE__ */ syncedAttribute("value"),
  autofocus: {
    added(node) {
      queueMicrotask(() => {
        node.focus?.();
      });
    }
  },
  autoplay: {
    added(node) {
      try {
        node.play?.();
      } catch (e) {
        console.error(e);
      }
    }
  }
};

// build/dev/javascript/lustre/lustre/element/keyed.mjs
function do_extract_keyed_children(loop$key_children_pairs, loop$keyed_children, loop$children) {
  while (true) {
    let key_children_pairs = loop$key_children_pairs;
    let keyed_children = loop$keyed_children;
    let children = loop$children;
    if (key_children_pairs instanceof Empty) {
      return [keyed_children, reverse(children)];
    } else {
      let rest = key_children_pairs.tail;
      let key = key_children_pairs.head[0];
      let element$1 = key_children_pairs.head[1];
      let keyed_element = to_keyed(key, element$1);
      let _block;
      if (key === "") {
        _block = keyed_children;
      } else {
        _block = insert2(keyed_children, key, keyed_element);
      }
      let keyed_children$1 = _block;
      let children$1 = prepend(keyed_element, children);
      loop$key_children_pairs = rest;
      loop$keyed_children = keyed_children$1;
      loop$children = children$1;
    }
  }
}
function extract_keyed_children(children) {
  return do_extract_keyed_children(
    children,
    empty(),
    empty_list
  );
}
function element3(tag, attributes, children) {
  let $ = extract_keyed_children(children);
  let keyed_children;
  let children$1;
  keyed_children = $[0];
  children$1 = $[1];
  return element(
    "",
    identity3,
    "",
    tag,
    attributes,
    children$1,
    keyed_children,
    false,
    false
  );
}
function namespaced2(namespace2, tag, attributes, children) {
  let $ = extract_keyed_children(children);
  let keyed_children;
  let children$1;
  keyed_children = $[0];
  children$1 = $[1];
  return element(
    "",
    identity3,
    namespace2,
    tag,
    attributes,
    children$1,
    keyed_children,
    false,
    false
  );
}
function fragment3(children) {
  let $ = extract_keyed_children(children);
  let keyed_children;
  let children$1;
  keyed_children = $[0];
  children$1 = $[1];
  return fragment("", identity3, children$1, keyed_children);
}

// build/dev/javascript/lustre/lustre/vdom/virtualise.ffi.mjs
var virtualise = (root3) => {
  const rootMeta = insertMetadataChild(element_kind, null, root3, 0, null);
  let virtualisableRootChildren = 0;
  for (let child = root3.firstChild; child; child = child.nextSibling) {
    if (canVirtualiseNode(child)) virtualisableRootChildren += 1;
  }
  if (virtualisableRootChildren === 0) {
    const placeholder = document2().createTextNode("");
    insertMetadataChild(text_kind, rootMeta, placeholder, 0, null);
    root3.replaceChildren(placeholder);
    return none();
  }
  if (virtualisableRootChildren === 1) {
    const children2 = virtualiseChildNodes(rootMeta, root3);
    return children2.head[1];
  }
  const fragmentHead = document2().createTextNode("");
  const fragmentMeta = insertMetadataChild(fragment_kind, rootMeta, fragmentHead, 0, null);
  const children = virtualiseChildNodes(fragmentMeta, root3);
  root3.insertBefore(fragmentHead, root3.firstChild);
  return fragment3(children);
};
var canVirtualiseNode = (node) => {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      return true;
    case TEXT_NODE:
      return !!node.data;
    default:
      return false;
  }
};
var virtualiseNode = (meta2, node, key, index2) => {
  if (!canVirtualiseNode(node)) {
    return null;
  }
  switch (node.nodeType) {
    case ELEMENT_NODE: {
      const childMeta = insertMetadataChild(element_kind, meta2, node, index2, key);
      const tag = node.localName;
      const namespace2 = node.namespaceURI;
      const isHtmlElement = !namespace2 || namespace2 === NAMESPACE_HTML;
      if (isHtmlElement && INPUT_ELEMENTS.includes(tag)) {
        virtualiseInputEvents(tag, node);
      }
      const attributes = virtualiseAttributes(node);
      const children = virtualiseChildNodes(childMeta, node);
      const vnode = isHtmlElement ? element3(tag, attributes, children) : namespaced2(namespace2, tag, attributes, children);
      return vnode;
    }
    case TEXT_NODE:
      insertMetadataChild(text_kind, meta2, node, index2, null);
      return text2(node.data);
    default:
      return null;
  }
};
var INPUT_ELEMENTS = ["input", "select", "textarea"];
var virtualiseInputEvents = (tag, node) => {
  const value = node.value;
  const checked = node.checked;
  if (tag === "input" && node.type === "checkbox" && !checked) return;
  if (tag === "input" && node.type === "radio" && !checked) return;
  if (node.type !== "checkbox" && node.type !== "radio" && !value) return;
  queueMicrotask(() => {
    node.value = value;
    node.checked = checked;
    node.dispatchEvent(new Event("input", { bubbles: true }));
    node.dispatchEvent(new Event("change", { bubbles: true }));
    if (document2().activeElement !== node) {
      node.dispatchEvent(new Event("blur", { bubbles: true }));
    }
  });
};
var virtualiseChildNodes = (meta2, node) => {
  let children = null;
  let child = node.firstChild;
  let ptr = null;
  let index2 = 0;
  while (child) {
    const key = child.nodeType === ELEMENT_NODE ? child.getAttribute("data-lustre-key") : null;
    if (key != null) {
      child.removeAttribute("data-lustre-key");
    }
    const vnode = virtualiseNode(meta2, child, key, index2);
    const next = child.nextSibling;
    if (vnode) {
      const list_node = new NonEmpty([key ?? "", vnode], null);
      if (ptr) {
        ptr = ptr.tail = list_node;
      } else {
        ptr = children = list_node;
      }
      index2 += 1;
    } else {
      node.removeChild(child);
    }
    child = next;
  }
  if (!ptr) return empty_list;
  ptr.tail = empty_list;
  return children;
};
var virtualiseAttributes = (node) => {
  let index2 = node.attributes.length;
  let attributes = empty_list;
  while (index2-- > 0) {
    const attr = node.attributes[index2];
    if (attr.name === "xmlns") {
      continue;
    }
    attributes = new NonEmpty(virtualiseAttribute(attr), attributes);
  }
  return attributes;
};
var virtualiseAttribute = (attr) => {
  const name = attr.localName;
  const value = attr.value;
  return attribute2(name, value);
};

// build/dev/javascript/lustre/lustre/runtime/client/runtime.ffi.mjs
var is_browser = () => !!document2();
var Runtime = class {
  constructor(root3, [model, effects], view2, update3) {
    this.root = root3;
    this.#model = model;
    this.#view = view2;
    this.#update = update3;
    this.root.addEventListener("context-request", (event4) => {
      if (!(event4.context && event4.callback)) return;
      if (!this.#contexts.has(event4.context)) return;
      event4.stopImmediatePropagation();
      const context = this.#contexts.get(event4.context);
      if (event4.subscribe) {
        const unsubscribe = () => {
          context.subscribers = context.subscribers.filter(
            (subscriber) => subscriber !== event4.callback
          );
        };
        context.subscribers.push([event4.callback, unsubscribe]);
        event4.callback(context.value, unsubscribe);
      } else {
        event4.callback(context.value);
      }
    });
    this.#reconciler = new Reconciler(this.root, (event4, path2, name) => {
      const [events, result] = handle(this.#events, path2, name, event4);
      this.#events = events;
      if (result.isOk()) {
        const handler = result[0];
        if (handler.stop_propagation) event4.stopPropagation();
        if (handler.prevent_default) event4.preventDefault();
        this.dispatch(handler.message, false);
      }
    });
    this.#vdom = virtualise(this.root);
    this.#events = new$3();
    this.#shouldFlush = true;
    this.#tick(effects);
  }
  // PUBLIC API ----------------------------------------------------------------
  root = null;
  dispatch(msg, immediate = false) {
    this.#shouldFlush ||= immediate;
    if (this.#shouldQueue) {
      this.#queue.push(msg);
    } else {
      const [model, effects] = this.#update(this.#model, msg);
      this.#model = model;
      this.#tick(effects);
    }
  }
  emit(event4, data) {
    const target = this.root.host ?? this.root;
    target.dispatchEvent(
      new CustomEvent(event4, {
        detail: data,
        bubbles: true,
        composed: true
      })
    );
  }
  // Provide a context value for any child nodes that request it using the given
  // key. If the key already exists, any existing subscribers will be notified
  // of the change. Otherwise, we store the value and wait for any `context-request`
  // events to come in.
  provide(key, value) {
    if (!this.#contexts.has(key)) {
      this.#contexts.set(key, { value, subscribers: [] });
    } else {
      const context = this.#contexts.get(key);
      context.value = value;
      for (let i = context.subscribers.length - 1; i >= 0; i--) {
        const [subscriber, unsubscribe] = context.subscribers[i];
        if (!subscriber) {
          context.subscribers.splice(i, 1);
          continue;
        }
        subscriber(value, unsubscribe);
      }
    }
  }
  // PRIVATE API ---------------------------------------------------------------
  #model;
  #view;
  #update;
  #vdom;
  #events;
  #reconciler;
  #contexts = /* @__PURE__ */ new Map();
  #shouldQueue = false;
  #queue = [];
  #beforePaint = empty_list;
  #afterPaint = empty_list;
  #renderTimer = null;
  #shouldFlush = false;
  #actions = {
    dispatch: (msg, immediate) => this.dispatch(msg, immediate),
    emit: (event4, data) => this.emit(event4, data),
    select: () => {
    },
    root: () => this.root,
    provide: (key, value) => this.provide(key, value)
  };
  // A `#tick` is where we process effects and trigger any synchronous updates.
  // Once a tick has been processed a render will be scheduled if none is already.
  // p0
  #tick(effects) {
    this.#shouldQueue = true;
    while (true) {
      for (let list4 = effects.synchronous; list4.tail; list4 = list4.tail) {
        list4.head(this.#actions);
      }
      this.#beforePaint = listAppend(this.#beforePaint, effects.before_paint);
      this.#afterPaint = listAppend(this.#afterPaint, effects.after_paint);
      if (!this.#queue.length) break;
      [this.#model, effects] = this.#update(this.#model, this.#queue.shift());
    }
    this.#shouldQueue = false;
    if (this.#shouldFlush) {
      cancelAnimationFrame(this.#renderTimer);
      this.#render();
    } else if (!this.#renderTimer) {
      this.#renderTimer = requestAnimationFrame(() => {
        this.#render();
      });
    }
  }
  #render() {
    this.#shouldFlush = false;
    this.#renderTimer = null;
    const next = this.#view(this.#model);
    const { patch, events } = diff(this.#events, this.#vdom, next);
    this.#events = events;
    this.#vdom = next;
    this.#reconciler.push(patch);
    if (this.#beforePaint instanceof NonEmpty) {
      const effects = makeEffect(this.#beforePaint);
      this.#beforePaint = empty_list;
      queueMicrotask(() => {
        this.#shouldFlush = true;
        this.#tick(effects);
      });
    }
    if (this.#afterPaint instanceof NonEmpty) {
      const effects = makeEffect(this.#afterPaint);
      this.#afterPaint = empty_list;
      requestAnimationFrame(() => {
        this.#shouldFlush = true;
        this.#tick(effects);
      });
    }
  }
};
function makeEffect(synchronous) {
  return {
    synchronous,
    after_paint: empty_list,
    before_paint: empty_list
  };
}
function listAppend(a2, b) {
  if (a2 instanceof Empty) {
    return b;
  } else if (b instanceof Empty) {
    return a2;
  } else {
    return append2(a2, b);
  }
}

// build/dev/javascript/lustre/lustre/runtime/server/runtime.mjs
var EffectDispatchedMessage = class extends CustomType {
  constructor(message) {
    super();
    this.message = message;
  }
};
var EffectEmitEvent = class extends CustomType {
  constructor(name, data) {
    super();
    this.name = name;
    this.data = data;
  }
};
var SystemRequestedShutdown = class extends CustomType {
};

// build/dev/javascript/lustre/lustre/component.mjs
var Config2 = class extends CustomType {
  constructor(open_shadow_root, adopt_styles, delegates_focus, attributes, properties, contexts, is_form_associated, on_form_autofill, on_form_reset, on_form_restore) {
    super();
    this.open_shadow_root = open_shadow_root;
    this.adopt_styles = adopt_styles;
    this.delegates_focus = delegates_focus;
    this.attributes = attributes;
    this.properties = properties;
    this.contexts = contexts;
    this.is_form_associated = is_form_associated;
    this.on_form_autofill = on_form_autofill;
    this.on_form_reset = on_form_reset;
    this.on_form_restore = on_form_restore;
  }
};
function new$6(options) {
  let init2 = new Config2(
    true,
    true,
    false,
    empty_list,
    empty_list,
    empty_list,
    false,
    option_none,
    option_none,
    option_none
  );
  return fold2(
    options,
    init2,
    (config, option) => {
      return option.apply(config);
    }
  );
}

// build/dev/javascript/lustre/lustre/runtime/client/spa.ffi.mjs
var Spa = class {
  #runtime;
  constructor(root3, [init2, effects], update3, view2) {
    this.#runtime = new Runtime(root3, [init2, effects], view2, update3);
  }
  send(message) {
    switch (message.constructor) {
      case EffectDispatchedMessage: {
        this.dispatch(message.message, false);
        break;
      }
      case EffectEmitEvent: {
        this.emit(message.name, message.data);
        break;
      }
      case SystemRequestedShutdown:
        break;
    }
  }
  dispatch(msg, immediate) {
    this.#runtime.dispatch(msg, immediate);
  }
  emit(event4, data) {
    this.#runtime.emit(event4, data);
  }
};
var start = ({ init: init2, update: update3, view: view2 }, selector, flags) => {
  if (!is_browser()) return new Error(new NotABrowser());
  const root3 = selector instanceof HTMLElement ? selector : document2().querySelector(selector);
  if (!root3) return new Error(new ElementNotFound(selector));
  return new Ok(new Spa(root3, init2(flags), update3, view2));
};

// build/dev/javascript/lustre/lustre.mjs
var App = class extends CustomType {
  constructor(init2, update3, view2, config) {
    super();
    this.init = init2;
    this.update = update3;
    this.view = view2;
    this.config = config;
  }
};
var ElementNotFound = class extends CustomType {
  constructor(selector) {
    super();
    this.selector = selector;
  }
};
var NotABrowser = class extends CustomType {
};
function application(init2, update3, view2) {
  return new App(init2, update3, view2, new$6(empty_list));
}
function start3(app, selector, start_args) {
  return guard(
    !is_browser(),
    new Error(new NotABrowser()),
    () => {
      return start(app, selector, start_args);
    }
  );
}

// build/dev/javascript/lustre/lustre/event.mjs
function is_immediate_event(name) {
  if (name === "input") {
    return true;
  } else if (name === "change") {
    return true;
  } else if (name === "focus") {
    return true;
  } else if (name === "focusin") {
    return true;
  } else if (name === "focusout") {
    return true;
  } else if (name === "blur") {
    return true;
  } else if (name === "select") {
    return true;
  } else {
    return false;
  }
}
function on(name, handler) {
  return event(
    name,
    map2(handler, (msg) => {
      return new Handler(false, false, msg);
    }),
    empty_list,
    never,
    never,
    is_immediate_event(name),
    0,
    0
  );
}
function on_click(msg) {
  return on("click", success(msg));
}

// build/dev/javascript/dev_ing/dev_ing.mjs
var FILEPATH = "src/dev_ing.gleam";
var Model = class extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
};
var UserToggledColorScheme = class extends CustomType {
};
function init(_) {
  initialize_color_scheme();
  return [new Model(void 0), none2()];
}
function update2(model, msg) {
  toggle_color_scheme();
  return [model, none2()];
}
function header2() {
  return header(
    toList([
      class$(
        "fixed left-0 right-0 top-0 px-4 py-4 grid border-b border-on-surface-900 dark:border-on-surface-500 dark:text-white bg-surface-100/75 dark:bg-surface-900/75 backdrop-blur-sm"
      )
    ]),
    toList([
      div(
        toList([
          class$(
            "w-full max-w-5xl mx-auto flex items-center justify-between h-200vh"
          )
        ]),
        toList([
          div(
            toList([class$("flex items-center gap-4")]),
            toList([
              div(
                toList([class$("font-bold text-xl")]),
                toList([text2("Dev-Ing")])
              ),
              ul(
                toList([class$("flex flex-row gap-2")]),
                toList([
                  li(
                    toList([]),
                    toList([
                      a(
                        toList([href("#")]),
                        toList([text2("Blog")])
                      )
                    ])
                  ),
                  li(
                    toList([]),
                    toList([
                      a(
                        toList([href("#")]),
                        toList([text2("About")])
                      )
                    ])
                  )
                ])
              )
            ])
          ),
          theme_toggle(
            toList([on_click(new UserToggledColorScheme())]),
            toList([])
          )
        ])
      )
    ])
  );
}
function content() {
  return main(
    toList([class$("p-4")]),
    toList([
      div(
        toList([class$("w-full max-w-5xl mx-auto")]),
        toList([
          h1(
            toList([class$("font-semibold text-2xl dark:text-white")]),
            toList([text2("Page header")])
          )
        ])
      )
    ])
  );
}
function side_menu() {
  return aside(
    toList([
      class$(
        "w-64 p-4 border-r border-on-surface-900 dark:border-on-surface-500"
      )
    ]),
    toList([
      h2(
        toList([class$("font-semibold text-lg dark:text-white")]),
        toList([text2("Side Menu")])
      ),
      ul(
        toList([class$("mt-4 dark:text-white")]),
        toList([
          li(toList([]), toList([text2("Link 1")])),
          li(toList([]), toList([text2("Link 2")])),
          li(toList([]), toList([text2("Link 3")]))
        ])
      )
    ])
  );
}
function footer2() {
  return footer(
    toList([
      class$(
        "px-4 py-4 grid border-t border-on-surface-900 dark:border-on-surface-500 dark:text-white"
      )
    ]),
    toList([
      div(
        toList([
          class$("w-full max-w-5xl mx-auto flex justify-center")
        ]),
        toList([
          p(
            toList([]),
            toList([text2("\xA9 2025 Dev-Ing. All rights reserved.")])
          )
        ])
      )
    ])
  );
}
function view(_) {
  return fragment2(
    toList([
      header2(),
      div(
        toList([class$("min-h-screen flex flex-col")]),
        toList([
          div(
            toList([class$("flex flex-1 pt-16")]),
            toList([side_menu(), content()])
          ),
          footer2()
        ])
      )
    ])
  );
}
function main2() {
  let app = application(init, update2, view);
  let $ = start3(app, "#app", void 0);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "dev_ing",
      20,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 357, end: 406, pattern_start: 368, pattern_end: 373 }
    );
  }
  return void 0;
}

// build/.lustre/entry.mjs
main2();
