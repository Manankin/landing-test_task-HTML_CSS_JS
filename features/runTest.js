export default function runTest(main, test, slider) {
    document.querySelector('html').style.maxHeight = 'fit-content';
    main.style.display = "none";
    // page.style.height = "100vh";
    // page.style.overflow = 'hidden';
    test.style.display = "initial";
    slider.setProgress(0);
}