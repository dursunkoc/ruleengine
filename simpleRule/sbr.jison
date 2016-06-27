/* description: Parses and executes logical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
(0[1-9]|[12][0-9]|3[01])[-|\.](0[1-9]|1[012])[-|\.](19|20)[0-9]{2}\s((2[0-3]|[0-1][0-9])[:|.][0-5][0-9][:|.][0-5][0-9])? return 'DATE'
"AND"                      return 'AND'
"OR"                       return 'OR'
"IN"                       return 'IN'
(?:\d*\.)?\d+              return 'NUMBER'
((\w)+((\.)?(\w)+)*)+      return 'VARIABLE'
(["'])(?:(?=(\\?))\2.)*?\1 return 'STRING'
^\[(.)*\]$                 return 'ARRAY'
"="                        return '='
">"                        return '>'
"<"                        return '<'
"*"                        return '*'
"/"                        return '/'
"-"                        return '-'
"+"                        return '+'
"^"                        return '^'
"!"                        return '!'
"%"                        return '%'
"("                        return '('
")"                        return ')'
<<EOF>>                    return 'EOF'

/lex

/* operator associations and precedence */

%left 'DATE'
%left 'AND' 'OR' 'IN'
%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%left '=' '<' '>'
%right '%'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1; }
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | e '=' e
        {$$ = $1 == $3;}
    | e 'IN' e
        {$$ = $3.indexOf($1)>=0;}
    | e 'AND' e
        {$$ = $1 && $3;}
    | e 'OR' e
        {$$ = $1 || $3;}
    | e '>' e
        {$$ = $1 > $3;}
    | e '<' e
        {$$ = $1 < $3;}
    | e '!'
        {{
          $$ = !($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | STRING
        {$$ = yytext}
    | ARRAY
        {$$ = eval(yytext)}
    | DATE
        {
        $$ = (function(){
        var reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
        var dateArray = reggie.exec(yytext);
        return new Date(
            (dateArray[3]),
            (dateArray[2])-1, // Careful, month starts at 0!
            (dateArray[1]),
            (dateArray[4]),
            (dateArray[5]),
            (dateArray[6])
        );
        }());
        }
    | VARIABLE
        {
        $$ = (function(){
                         var arr = yytext.split(".");
                         var tmp=yy;
                         for (var i in arr){
                             tmp = tmp[arr[i]];
                         }
                         return tmp;
                     }());

        }
    ;

