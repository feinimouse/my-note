package name.feinimouse.study.design;

import name.feinimouse.study.design.member.Base;
import name.feinimouse.study.design.member.Guitar;

public class Band {
    private Guitar guitar;
    private Base base;

    public void display() {
        System.out.println(guitar.getDisplayer() + " is playing !");
        System.out.println(base.getDisplayer() + " is playing !");
    }

    /**
     * @return the guitar
     */
    public Guitar getGuitar() {
        return guitar;
    }

    /**
     * @return the base
     */
    public Base getBase() {
        return base;
    }

    /**
     * @param base the base to set
     */
    public void setBase(Base base) {
        this.base = base;
    }

    /**
     * @param guitar the guitar to set
     */
    public void setGuitar(Guitar guitar) {
        this.guitar = guitar;
    }


}
