package name.feinimouse.study.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Overview {
    /**
     * [参数类型] [参数名]() default [默认值]
     * 注解的元素必须要有值
     * 若只有一个叫做value的值，则使用时可以省略参数名，如 @Anno("ssss")
     */
    String name() default "Happy";
    int count() default 5;
    String[] type();
}
