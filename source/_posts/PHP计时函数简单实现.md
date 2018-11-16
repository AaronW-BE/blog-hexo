---
title: PHP计时函数简单实现
date: 2018-08-08 12:34:57
tags:
- PHP
categories:
- PHP
---

### microtime()函数
microtime() 函数返回当前 Unix 时间戳的微秒数。

### 语法

{% codeblock lang:php %}
mixed microtime ([ bool $get_as_float = FALSE ])
{% endcodeblock %}
microtime() 当前 Unix 时间戳以及微秒数。本函数仅在支持 gettimeofday() 系统调用的操作系统下可用。
如果调用时不带可选参数，本函数以 "msec sec" 的格式返回一个字符串，其中 sec 是自 Unix 纪元（0:00:00 January 1, 1970 GMT）起到现在的秒数，msec 是微秒部分。字符串的两部分都是以秒为单位返回的。

如果给出了 get_as_float 参数并且其值等价于 TRUE，microtime() 将返回一个浮点数。

### 计时器函数Timer实现
{% codeblock lang:php %}
    class Timer
    {
        private static $start;
        private static $end;

        static function start()
        {
            self::$start = microtime(true);
        }

        static function end()
        {
            self::$end = microtime(true);
        }

        /**
         * @throws Exception
         */
        static function endAndGetInterval()
        {
            if (!self::$start) {
                throw new Exception("need call start() first of all");
            }
            self::end();
            return self::$end - self::$start ;
        }
    }
{% endcodeblock %}