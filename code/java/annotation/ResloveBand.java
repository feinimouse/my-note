package annotation;

import java.lang.reflect.Field;

public class ResloveBand {
    public static void reslove(Band band) {
        try {
            Class<? extends Band> c = band.getClass();
            // 获取指定注解
            Overview overview = c.getAnnotation(Overview.class);
            System.out.println("This is a wonderful " + join(overview.type(), " ")
                + " band named " + overview.name() 
                + " with " + overview.count() + " lovely girls.");

            // 获得指定属性
            Field composer = c.getDeclaredField("composer");
            // 获得属性的注解
            Player p1 = composer.getAnnotation(Player.class);
            System.out.println("The composer of the Band is " + composer.get(band) 
                + " who plays " + join(p1.value(), " and ") + ".");

            Field songWriter = c.getDeclaredField("songWriter");
            Player p2 = songWriter.getAnnotation(Player.class);
            System.out.println("The song writer of the Band is " + songWriter.get(band) 
                + " who plays " + join(p2.value(), " and ") + ".");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static <T> String join(T[] list,String j) {
        String result = "";
        for (int i = 0 ; i < list.length; i++) {
            if (i != list.length - 1) {
                result += (list[i].toString() + j);
            } else {
                result += list[i];
            }
        }
        return result;
    }
}