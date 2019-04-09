package name.feinimouse.study.design;

import name.feinimouse.study.design.member.BandRecruit;
import name.feinimouse.study.design.member.Base;
import name.feinimouse.study.design.member.Guitar;

public class HHWMember implements BandRecruit {
    @Override
    public Base recBase() {
        return new Base("Kaoru");

    }
    @Override
    public Guitar recGuitar() {
        return new Guitar("Hagumi");
    }
}
