-module(mist@internal@next).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/mist/internal/next.gleam").
-export_type([next/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-type next(YSG, YSH) :: {continue,
        YSG,
        gleam@option:option(gleam@erlang@process:selector(YSH))} |
    normal_stop |
    {abnormal_stop, binary()}.


