package name.feinimouse.study.design;

import name.feinimouse.study.design.member.BandRecruit;

public class HanaSchool implements BandSchool {
    private BandRecruit bandRecruit;

    public HanaSchool(BandRecruit bandRecruit) {
        this.bandRecruit = bandRecruit;
    }

    @Override
    public Band createBand() {
        Band band = new Band();
        System.out.println("training guitar");
        band.setGuitar(bandRecruit.recGuitar());
        System.out.println("training base");
        band.setBase(bandRecruit.recBase());
        return band;
    }
}
