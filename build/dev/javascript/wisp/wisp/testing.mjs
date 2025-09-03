import * as $crypto from "../../gleam_crypto/gleam/crypto.mjs";
import * as $http from "../../gleam_http/gleam/http.mjs";
import * as $request from "../../gleam_http/gleam/http/request.mjs";
import * as $json from "../../gleam_json/gleam/json.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bytes_tree from "../../gleam_stdlib/gleam/bytes_tree.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $string_tree from "../../gleam_stdlib/gleam/string_tree.mjs";
import * as $uri from "../../gleam_stdlib/gleam/uri.mjs";
import * as $simplifile from "../../simplifile/simplifile.mjs";
import { Ok, Empty as $Empty, makeError, toBitArray, stringBits } from "../gleam.mjs";
import * as $wisp from "../wisp.mjs";
import { Bytes, Empty, File, Text } from "../wisp.mjs";

const FILEPATH = "src/wisp/testing.gleam";

/**
 * Read the body of a response as a string.
 *
 * # Panics
 *
 * This function will panic if the response body is a file and the file cannot
 * be read, or if it does not contain valid UTF-8.
 */
export function string_body(response) {
  let $ = response.body;
  if ($ instanceof Text) {
    let tree = $[0];
    return $string_tree.to_string(tree);
  } else if ($ instanceof Bytes) {
    let bytes = $[0];
    let data = $bytes_tree.to_bit_array(bytes);
    let $1 = $bit_array.to_string(data);
    let string;
    if ($1 instanceof Ok) {
      string = $1[0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "wisp/testing",
        233,
        "string_body",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $1,
          start: 7349,
          end: 7398,
          pattern_start: 7360,
          pattern_end: 7370
        }
      )
    }
    return string;
  } else if ($ instanceof File) {
    let path = $.path;
    let $1 = $simplifile.read(path);
    let contents;
    if ($1 instanceof Ok) {
      contents = $1[0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "wisp/testing",
        237,
        "string_body",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $1,
          start: 7444,
          end: 7491,
          pattern_start: 7455,
          pattern_end: 7467
        }
      )
    }
    return contents;
  } else {
    return "";
  }
}

/**
 * Read the body of a response as a bit string
 *
 * # Panics
 *
 * This function will panic if the response body is a file and the file cannot
 * be read.
 */
export function bit_array_body(response) {
  let $ = response.body;
  if ($ instanceof Text) {
    let tree = $[0];
    return $bytes_tree.to_bit_array($bytes_tree.from_string_tree(tree));
  } else if ($ instanceof Bytes) {
    let tree = $[0];
    return $bytes_tree.to_bit_array(tree);
  } else if ($ instanceof File) {
    let path = $.path;
    let $1 = $simplifile.read_bits(path);
    let contents;
    if ($1 instanceof Ok) {
      contents = $1[0];
    } else {
      throw makeError(
        "let_assert",
        FILEPATH,
        "wisp/testing",
        256,
        "bit_array_body",
        "Pattern match failed, no pattern matched the value.",
        {
          value: $1,
          start: 7935,
          end: 7987,
          pattern_start: 7946,
          pattern_end: 7958
        }
      )
    }
    return contents;
  } else {
    return toBitArray([]);
  }
}

/**
 * The default secret key base used for test requests.
 * This should never be used outside of tests.
 */
export const default_secret_key_base = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

/**
 * Create a test HTTP request that can be used to test your request handler
 * functions.
 *
 * Note not all HTTP methods are expected to have an accompanying body, so when
 * using this function directly over other functions such as `get` and `post`
 * take care to ensure you are not providing a body when it is not expected.
 * 
 * The `default_secret_key_base` constant is used as the secret key base for
 * requests made with this function.
 */
export function request(method, path, headers, body) {
  let _block;
  let $1 = $string.split(path, "?");
  if ($1 instanceof $Empty) {
    _block = [path, new None()];
  } else {
    let $2 = $1.tail;
    if ($2 instanceof $Empty) {
      _block = [path, new None()];
    } else {
      let $3 = $2.tail;
      if ($3 instanceof $Empty) {
        let path$1 = $1.head;
        let query = $2.head;
        _block = [path$1, new Some(query)];
      } else {
        _block = [path, new None()];
      }
    }
  }
  let $ = _block;
  let path$1;
  let query;
  path$1 = $[0];
  query = $[1];
  let _pipe = new $request.Request(
    method,
    headers,
    body,
    new $http.Https(),
    "localhost",
    new None(),
    path$1,
    query,
  );
  return $request.set_body(
    _pipe,
    $wisp.create_canned_connection(body, default_secret_key_base),
  );
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function get(path, headers) {
  return request(new $http.Get(), path, headers, toBitArray([]));
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function post(path, headers, body) {
  return request(
    new $http.Post(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 * 
 * The body parameters are encoded as form data and the `content-type` header
 * is set to `application/x-www-form-urlencoded`.
 */
export function post_form(path, headers, data) {
  let body = $uri.query_to_string(data);
  let _pipe = request(
    new $http.Post(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
  return $request.set_header(
    _pipe,
    "content-type",
    "application/x-www-form-urlencoded",
  );
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 * 
 * The `content-type` header is set to `application/json`.
 */
export function post_json(path, headers, data) {
  let body = $json.to_string(data);
  let _pipe = request(
    new $http.Post(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
  return $request.set_header(_pipe, "content-type", "application/json");
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function head(path, headers) {
  return request(new $http.Head(), path, headers, toBitArray([]));
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function put(path, headers, body) {
  return request(new $http.Put(), path, headers, toBitArray([stringBits(body)]));
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 * 
 * The body parameters are encoded as form data and the `content-type` header
 * is set to `application/x-www-form-urlencoded`.
 */
export function put_form(path, headers, data) {
  let body = $uri.query_to_string(data);
  let _pipe = request(
    new $http.Put(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
  return $request.set_header(
    _pipe,
    "content-type",
    "application/x-www-form-urlencoded",
  );
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 * 
 * The `content-type` header is set to `application/json`.
 */
export function put_json(path, headers, data) {
  let body = $json.to_string(data);
  let _pipe = request(
    new $http.Put(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
  return $request.set_header(_pipe, "content-type", "application/json");
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function delete$(path, headers, body) {
  return request(
    new $http.Delete(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 * 
 * The body parameters are encoded as form data and the `content-type` header
 * is set to `application/x-www-form-urlencoded`.
 */
export function delete_form(path, headers, data) {
  let body = $uri.query_to_string(data);
  let _pipe = request(
    new $http.Delete(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
  return $request.set_header(
    _pipe,
    "content-type",
    "application/x-www-form-urlencoded",
  );
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 * 
 * The `content-type` header is set to `application/json`.
 */
export function delete_json(path, headers, data) {
  let body = $json.to_string(data);
  let _pipe = request(
    new $http.Delete(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
  return $request.set_header(_pipe, "content-type", "application/json");
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function trace(path, headers) {
  return request(new $http.Trace(), path, headers, toBitArray([]));
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function connect(path, headers) {
  return request(new $http.Connect(), path, headers, toBitArray([]));
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function options(path, headers) {
  return request(new $http.Options(), path, headers, toBitArray([]));
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 */
export function patch(path, headers, body) {
  return request(
    new $http.Patch(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 * 
 * The body parameters are encoded as form data and the `content-type` header is set to `application/x-www-form-urlencoded`.
 */
export function patch_form(path, headers, data) {
  let body = $uri.query_to_string(data);
  let _pipe = request(
    new $http.Patch(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
  return $request.set_header(
    _pipe,
    "content-type",
    "application/x-www-form-urlencoded",
  );
}

/**
 * Create a test HTTP request that can be used to test your request handler.
 * 
 * The `content-type` header is set to `application/json`.
 */
export function patch_json(path, headers, data) {
  let body = $json.to_string(data);
  let _pipe = request(
    new $http.Patch(),
    path,
    headers,
    toBitArray([stringBits(body)]),
  );
  return $request.set_header(_pipe, "content-type", "application/json");
}

/**
 * Set a cookie on the request.
 */
export function set_cookie(req, name, value, security) {
  let _block;
  if (security instanceof $wisp.PlainText) {
    _block = $bit_array.base64_encode(toBitArray([stringBits(value)]), false);
  } else {
    _block = $wisp.sign_message(
      req,
      toBitArray([stringBits(value)]),
      new $crypto.Sha512(),
    );
  }
  let value$1 = _block;
  return $request.set_cookie(req, name, value$1);
}

/**
 * Set a header on a request.
 * 
 * # Examples
 * 
 * ```gleam
 * let request =
 *   test.request(test.Get, "/", [], <<>>)
 *   |> test.set_header("content-type", "application/json")
 * request.headers
 * // => [#("content-type", "application/json")]
 * ```
 */
export const set_header = $request.set_header;
