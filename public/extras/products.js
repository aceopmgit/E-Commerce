const men = [
    {
        title: 'Men Checked Slim Fit Shirt with Patch Pocket',
        price: 1050,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20210316/tc8p/604fac3caeb2696981863c4e/-473Wx593H-460698919-black-MARKETING.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Cotton Shirt with Patch Pocket',
        price: 958,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240305/rN8W/65e705a005ac7d77bb982b98/-473Wx593H-440971114-yellow-MODEL6.jpg',
        color: 'Yellow',
        edited: false
    },
    {
        title: 'Spread Collar Shirt with Patch Pocket',
        price: 920,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240319/V4IR/65f9128d05ac7d77bbc43e9e/-473Wx593H-467162071-maroon-MODEL3.jpg',
        color: 'Maroon',
        edited: false
    },
    {
        title: 'Striped Slim Fit Shirt',
        price: 1100,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240206/Sfnj/65c2121916fd2c6e6adec23a/-473Wx593H-462152986-green-MODEL5.jpg',
        color: 'Green',
        edited: false
    },
    {
        title: 'Men Striped Slim Fit Shirt',
        price: 1020,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240529/3GB0/665711d616fd2c6e6a389703/-473Wx593H-469620992-blue-MODEL5.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Printed Relaxed Fit Shirt',
        price: 1375,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240523/ZF82/664e705916fd2c6e6a1d0a78/-473Wx593H-700004132-grey-MODEL7.jpg',
        color: 'Grey',
        edited: false
    },
    {
        title: 'Men Printed Slim Fit Shirt with Full Sleeves',
        price: 1049,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240313/w0Hm/65f12ae816fd2c6e6a547d34/-473Wx593H-467162769-white-MODEL4.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Slim Fit Shirt with Patch Pocket',
        price: 1169,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231205/c5JJ/656ed463ddf7791519b1e969/-473Wx593H-462323964-burgundy-MODEL6.jpg',
        color: 'Burgundy',
        edited: false
    },
    {
        title: 'Men Slim Fit Shirt with Patch Pocket',
        price: 1629,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20220531/Ew1n/62964403aeb26921affdb29e/-473Wx593H-469220101-black-MODEL5.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Men Slim Fit Single-Breasted Blazer',
        price: 5219,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240207/MgOR/65c3a12d16fd2c6e6ae67db1/-473Wx593H-442182359-medgrey-MODEL5.jpg',
        color: 'Grey',
        edited: false
    },
    {
        title: 'Slim Fit Polo T-Shirt',
        price: 1384,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230905/uxuU/64f713a5afa4cf41f5a73a40/-473Wx593H-469545945-blue-MODEL5.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Graphic Print Slim Fit Polo T-Shirt',
        price: 1619,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230410/ZiVJ/64342e3e907deb497ad7ca81/-473Wx593H-469485117-black-MODEL3.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Men Goran Geometric Print Slim Fit Crew-Neck T-Shirt',
        price: 1839,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240513/m7hg/66419b0d16fd2c6e6aff144d/-473Wx593H-442406284-black-MODEL6.jpg',
        color: 'Black&White',
        edited: false
    },
    {
        title: 'Men Mid-Wash Skinny Fit Jeans',
        price: 3504,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240411/fRO0/6617f98f05ac7d77bb03a69a/-473Wx593H-442406083-black-MODEL6.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Men Yohan Striped Regular Fit Denim Shirt',
        price: 2180,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240510/YTcY/663e424b16fd2c6e6afbf9a9/-473Wx593H-442207726-blue-MODEL4.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Goran Geometric Print Slim Fit Crew-Neck T-Shirt',
        price: 1639,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240513/MTC7/66419bfa16fd2c6e6aff1a24/-473Wx593H-442406284-olive-MODEL7.jpg',
        color: 'Olive Green',
        edited: false
    },
    {
        title: 'Men Nuwan Geometric Print Slim Fit Crew-Neck T-',
        price: 1569,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240513/ptIr/66419a3b05ac7d77bb549409/-473Wx593H-442406287-grey-MODEL7.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Regular Fit Logo Print T-shirt with Crew-Neck',
        price: 1250,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20211014/1By3/616831fbf997ddf8f1d1b87e/-473Wx593H-469019708-red-MODEL6.jpg',
        color: 'Rasberry Red',
        edited: false
    },
    {
        title: 'Men Jesse Striped Regular Fit Linen Shirt',
        price: 1299,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240411/jxD3/6617f74d05ac7d77bb039d2d/-473Wx593H-442406149-lightblue-MODEL4.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Regular Fit Typographic Print Crew-Neck T-shirt',
        price: 1250,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20210827/fyv2/61292c29aeb269a26880c965/-473Wx593H-460856333-black-MODEL4.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Men Vapour Mid-Wash Tapered Fit Jeans',
        price: 2055,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230220/pwGt/63f39c21aeb26924e37d40bb/-473Wx593H-441920780-blue-MODEL4.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Heavily Washed Slim Fit Distressed Jeans',
        price: 2240,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240610/K8zd/6666f0fc05ac7d77bbbd9352/-473Wx593H-441920658-blue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Vapour Slim Fit Jeans',
        price: 2624,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230220/O1bX/63f393f8f997dde6f4b32aaf/-473Wx593H-441920632-black-MODEL3.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Men Heavily Washed Tapered Fit Jeans',
        price: 3049,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240125/67La/65b255d916fd2c6e6ac12b87/-473Wx593H-469241124-blue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Mid-Wash Skinny Fit Jeans',
        price: 2731,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240408/FGwk/6613daec05ac7d77bbfd0deb/-473Wx593H-442405967-darkblue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Zerot Regular Fit Denim Shorts',
        price: 2713,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240513/3MXj/66419c2105ac7d77bb549d15/-473Wx593H-442406346-white-MODEL6.jpg',
        color: 'Beige',
        edited: false
    },
    {
        title: 'Men Vapour Lightly Washed Tapered Fit Jeans',
        price: 3299,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240513/Qsyi/6641994c05ac7d77bb548ebf/-473Wx593H-442589019-darkblue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'https://assets.ajio.com/medias/sys_master/root/20230220/6bOw/63f3a555aeb26924e37e2e6d/-473Wx593H-441920646-blue-MODEL5.jpg',
        price: 1999,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230220/6bOw/63f3a555aeb26924e37e2e6d/-473Wx593H-441920646-blue-MODEL5.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Mid-Wash Tapered Fit Vapour Jeans',
        price: 3133,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240411/CFGN/6617fb0005ac7d77bb03ae01/-473Wx593H-442406050-darkblue-MODEL6.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Vapour Lightly Washed Tapered Fit Jeans',
        price: 2499,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230704/yohg/64a409d0eebac147fc4a6131/-473Wx593H-441920746-blue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Holborne Straight Fit Jeans',
        price: 2436,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240408/IZIb/6613d7b416fd2c6e6aa48a53/-473Wx593H-442406022-darkblue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Vapour Mid-Wash Slim Fit Jeans',
        price: 2615,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240610/Psyr/6666e8a216fd2c6e6a6cdfb0/-473Wx593H-441920677-green-MODEL.jpg',
        color: 'Green',
        edited: false
    },
    {
        title: 'Men Vanko Union Jack Printed Slim Fit Crew-Neck T-Shirt',
        price: 2169,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240510/xaFm/663e3e1705ac7d77bb5161c6/-473Wx593H-442406256-black-MODEL5.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Men Josh Checked Regular Fit Shirt',
        price: 2650,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240510/KiFD/663e3b2705ac7d77bb51511c/-473Wx593H-442207765-blue-MODEL4.jpg',
        color: 'Navy Blue',
        edited: false
    },
    {
        title: 'Men Scott Printed Slim Fit Crew-Neck T-Shirt',
        price: 1695,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240513/yXE0/66419c0005ac7d77bb549b11/-473Wx593H-442406290-white-MODEL5.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Men Escobar Regular Fit Shirt',
        price: 2265,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240307/5yGr/65e9ef3916fd2c6e6a448138/-473Wx593H-469240805-green-MODEL4.jpg',
        color: 'Green',
        edited: false
    },
    {
        title: 'Gavin Denim Shirt',
        price: 2494,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230102/F21C/63b2f17baeb269659c1dc566/-473Wx593H-469272517-blue-MODEL6.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Printed Regular Fit Shirt',
        price: 2207,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240411/H4WJ/6617f5cd16fd2c6e6aab28f2/-473Wx593H-442406157-lightblue-MODEL5.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Printed Slim Fit Shirt',
        price: 1795,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240123/72et/65afeb368cdf1e0df5c76696/-473Wx593H-469240774-orange-MODEL5.jpg',
        color: 'Orange',
        edited: false
    },
    {
        title: 'Men Holborne Regular Fit Jeans',
        price: 3613,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240510/Fg0U/663e38ed16fd2c6e6afbc8d4/-473Wx593H-442406078-blue-MODEL5.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Men Vapour Mid-Wash Tapered Fit Jeans',
        price: 2509,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240513/gyZU/66419c9416fd2c6e6aff1e73/-473Wx593H-442589004-brtmulti-MODEL4.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Vendie Straight Fit Jeans',
        price: 2369,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240408/MU7H/6613d9fb05ac7d77bbfd07a0/-473Wx593H-442405995-darkblue-MODEL3.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Lightly Washed Chinox Super Skinny Fit Jeans',
        price: 2758,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240510/gkC9/663e3c8c05ac7d77bb5157f9/-473Wx593H-442405983-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Printed Cotton T-Shirt & Pant Set',
        price: 1569,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20221230/eSTr/63aef6aaf997ddfdbd05292a/-473Wx593H-465525131-blue-MODEL6.jpg',
        color: 'Blue Night',
        edited: false
    },
    {
        title: 'Men Vapour Slim Fit Jeans',
        price: 2947,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240510/wok7/663e31e005ac7d77bb5127a8/-473Wx593H-442405986-white-MODEL6.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'https://assets.ajio.com/medias/sys_master/root/20240408/74fX/6613d7ae05ac7d77bbfcfd62/-473Wx593H-442405953-black-MODEL.jpg',
        price: 3019,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240408/74fX/6613d7ae05ac7d77bbfcfd62/-473Wx593H-442405953-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Men Mid-Wash Vapour Slim Fit Jeans',
        price: 2165,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240408/Ixjt/6613db0505ac7d77bbfd0fd4/-473Wx593H-442405963-grey-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Chinox Lightly Washed Super Skinny Fit Jeans',
        price: 2165,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240510/0ImD/663e396205ac7d77bb514a37/-473Wx593H-442405972-blue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Vendie Mid-Wash Regular Fit Jeans',
        price: 2969,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240510/AUn0/663e378205ac7d77bb514279/-473Wx593H-442406010-darkblue-MODEL4.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Vapour Lightly Washed Slim Fit Jeans',
        price: 3512,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240408/OQ1h/6613dae016fd2c6e6aa499c2/-473Wx593H-442406019-darkblue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Men Chinos Lightly Washed Slim Fit Jeans',
        price: 2703,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240513/W3bK/66419ab405ac7d77bb54965c/-473Wx593H-442589012-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Printed Lounge Set',
        price: 1700,
        category: 'Men',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230624/E0VS/6496ff86a9b42d15c9ef66ce/-473Wx593H-465543840-grey-MODEL6.jpg',
        color: 'Grey Night',
        edited: false
    }
]

const women = [
    {
        title: 'Regular Fit Polo T-Shirt with Logo Print',
        price: 1274,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240330/AKBr/6607169516fd2c6e6a8be815/-473Wx593H-467212486-red-MODEL.jpg',
        color: 'Intense Red',
        edited: false
    },
    {
        title: 'Brand Print Slim Fit Crew-Neck T-shirt',
        price: 720,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20220405/qXJO/624c3c70f997dd03e2481c7c/-473Wx593H-469177708-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Solid Crew-Neck T-shirt',
        price: 1049,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240227/g1nw/65dcfa3216fd2c6e6a204c48/-473Wx593H-467109314-white-MODEL.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Regular Fit Polo T-Shirt with Logo Print',
        price: 1180,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240329/LBGh/6606ed6b16fd2c6e6a8bad3e/-473Wx593H-467212496-green-MODEL.jpg',
        color: 'Jade Frost Green',
        edited: false
    },
    {
        title: 'Floral Print A-line Kurta',
        price: 1080,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240612/uT7J/666b35c56f60443f311e5a29/-473Wx593H-464342145-blue-MODEL.jpg',
        color: 'Aqua',
        edited: false
    },
    {
        title: 'Floral Print Flared Kurta',
        price: 1499,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240612/wcPN/66698be916fd2c6e6abd7b7e/-473Wx593H-466944391-peach-MODEL6.jpg',
        color: 'Peach',
        edited: false
    },
    {
        title: 'Women Striped Straight Kurta',
        price: 1809,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240416/LbeL/661ec37816fd2c6e6ab9a4d0/-473Wx593H-467153394-purple-MODEL.jpg',
        color: 'Purple',
        edited: false
    },
    {
        title: 'Embellished Round-Neck Straight Kurta',
        price: 1403,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240611/sObk/6668e00e05ac7d77bbeff978/-473Wx593H-463678204-green-MODEL.jpg',
        color: 'Bottle Green',
        edited: false
    },
    {
        title: 'Floral Print V-Neck Straight Kurta',
        price: 1282,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240611/ToOS/6668e58205ac7d77bbf0b358/-473Wx593H-465784206-lavender-MODEL.jpg',
        color: 'Lavender',
        edited: false
    },
    {
        title: 'Floral Print A-Line Kurta with Buttoned Accent',
        price: 2099,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230912/Y69u/64ffbf11afa4cf41f5db4fa8/-473Wx593H-466564432-lime-MODEL.jpg',
        color: 'Lime',
        edited: false
    },
    {
        title: 'Women Cotton Straight Kurta',
        price: 1539,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240311/OVnb/65ef1ced16fd2c6e6a4edf1f/-473Wx593H-443038416-magntafusha-MODEL.jpg',
        color: 'Magneta',
        edited: false
    },
    {
        title: 'Women Chevron Fit & Flare Dress',
        price: 1409,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240403/RgcL/660ce2a905ac7d77bbef6c3f/-473Wx593H-467215601-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Printed V-Neck Fit & Flare Dress',
        price: 2399,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230629/EucG/649cb42aa9b42d15c91773f2/-473Wx593H-465977185-blue-MODEL2.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Women Fit & Flared Dress',
        price: 2436,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240118/DFn8/65a9273a16fd2c6e6aafd648/-473Wx593H-466811621-pink-MODEL.jpg',
        color: 'Pink',
        edited: false
    },
    {
        title: 'Women Tiered Dress with Puff Sleeves',
        price: 2999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240422/nMKs/6626678f16fd2c6e6ac51284/-473Wx593H-467269584-pink-MODEL.jpg',
        color: 'Raspberry',
        edited: false
    },
    {
        title: 'Geometric Print Fit & Flare Dress',
        price: 2199,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230714/U8WE/64b13d93eebac147fc6cb93e/-473Wx593H-466306232-white-MODEL6.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Women Fit & Flare Dress with Puff Sleeves',
        price: 3298,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231011/m0Lz/6526a69fddf7791519341d1b/-473Wx593H-466697796-wine-MODEL2.jpg',
        color: 'Wine',
        edited: false
    },
    {
        title: 'Women Floral Print Tiered Dress with Insert Pockets',
        price: 3300,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240507/APuV/663a553205ac7d77bb46d50e/-473Wx593H-467115030-green-MODEL8.jpg',
        color: 'Green',
        edited: false
    },
    {
        title: 'Solid Dress',
        price: 2790,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230808/JpCl/64d16f39a9b42d15c995b266/-473Wx593H-466429240-black-MODEL4.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Women Floral Print A-Line Dress with Tie-Up Belt',
        price: 3299,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240109/J6Ms/659c78f654c30e62769e5cb7/-473Wx593H-466958807-black-MODEL7.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Floral Print A-Line Dress',
        price: 1299,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230925/vDmM/651181d3ddf7791519fb127a/-473Wx593H-466624957-green-MODEL.jpg',
        color: 'Green',
        edited: false
    },
    {
        title: 'Bodycon Dress with Front Zip-Closure',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230828/9Ahu/64eca3acddf779151982ba1e/-473Wx593H-466508164-black-MODEL4.jpg',
        color: 'Green',
        edited: false
    },
    {
        title: 'Floral Print Gown Dress',
        price: 2499,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230817/f6Ia/64dd27d5a9b42d15c9b37e1e/-473Wx593H-466463138-blue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Floral Print Gown Dress',
        price: 2299,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240508/TRhD/663a88e616fd2c6e6af22ba5/-473Wx593H-467312071-green-MODEL2.jpg',
        color: 'Green',
        edited: false
    },
    {
        title: 'Floral Print Fit & Flare Dress',
        price: 1325,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230626/LJhr/64999445a9b42d15c9f3053c/-473Wx593H-466308147-pink-MODEL4.jpg',
        color: 'Pink',
        edited: false
    },
    {
        title: 'Women Geometric Print Relaxed Fit Top',
        price: 1299,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240601/O3mz/665b4da605ac7d77bb960453/-473Wx593H-700032457-multi-MODEL4.jpg',
        color: 'Multicolored',
        edited: false
    },
    {
        title: 'Women Floral Print Regular Fit Tunic',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240611/rTkL/6668e14b05ac7d77bbf022fc/-473Wx593H-466740986-white-MODEL.jpg',
        color: 'Multicolored',
        edited: false
    },
    {
        title: 'V-Neck Blouson Top with Cap Sleeves',
        price: 1499,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230810/xNmc/64d4e650a9b42d15c9a0f47f/-1117Wx1400H-466442686-wine-MODEL.jpg',
        color: 'Wine',
        edited: false
    },
    {
        title: 'Schiffli Embroidered Cotton Top with Notch Neckline',
        price: 1240,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240524/a7L1/664fc26c16fd2c6e6a20b861/-473Wx593H-467230133-red-MODEL.jpg',
        color: 'Red',
        edited: false
    },
    {
        title: 'Floral Print Cotton Top',
        price: 1040,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230912/EEH7/65007a9aafa4cf41f5de6e9b/-1117Wx1400H-466568320-navy-MODEL.jpg',
        color: 'Navy Blue',
        edited: false
    },
    {
        title: 'Women Embroidered Regular Fit Top',
        price: 1499,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240210/b2UV/65c70c3e16fd2c6e6aee5f22/-1117Wx1400H-467059507-white-MODEL2.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Women Regular Fit Crop Top',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231220/6Vp2/65831508afa4cf41f5de9444/-1117Wx1400H-466902135-peach-MODEL.jpg',
        color: 'Peach',
        edited: false
    },
    {
        title: 'Medium-Length V-Neck Top',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230707/0gGo/64a83c8ca9b42d15c945c71f/-1117Wx1400H-466342418-pink-MODEL.jpg',
        color: 'Pink',
        edited: false
    },
    {
        title: 'Women Regular Fit Top with Puffed Sleeves',
        price: 980,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240217/Y1Jb/65cfe03b16fd2c6e6a01da66/-473Wx593H-467080628-red-MODEL.jpg',
        color: 'Pink',
        edited: false
    },
    {
        title: 'Textured Collar-Neck Top',
        price: 1290,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230621/BK1w/649224cf42f9e729d75a78b6/-473Wx593H-463427144-pink-MODEL.jpg',
        color: 'Pink',
        edited: false
    },
    {
        title: 'Floral Print Top',
        price: 1260,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231012/qu81/6527dd14ddf7791519368315/-1117Wx1400H-462848017-white-MODEL2.jpg',
        color: 'Cream',
        edited: false
    },
    {
        title: 'Women Floral Print Peplum Top',
        price: 1216,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231009/amSD/65240265ddf77915192bf865/-1117Wx1400H-466686696-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Women Printed Top with Cuffed Sleeves',
        price: 1499,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240321/PwVS/65fb40a505ac7d77bbcd1d10/-1117Wx1400H-467189405-orange-MODEL.jpg',
        color: 'Orange',
        edited: false
    },
    {
        title: 'Slim Fit Square-Neck Top',
        price: 999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240613/ZSBY/666c364b6f60443f31362d16/-1117Wx1400H-465434154-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Leaf Print Round-Neck Top',
        price: 1099,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230801/TT3I/64c91f25eebac147fc9c19a0/-1117Wx1400H-466383107-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Women Straight Fit Floral Print Pleat-Front Pants',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240612/EU1Q/666b85501d763220fa967ef1/-1117Wx1400H-700079604-pink-MODEL5.jpg',
        color: 'Pink',
        edited: false
    },
    {
        title: 'High-Rise Straight Fit Flat-Front Trouser',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230629/icdP/649cf6eeeebac147fc372960/-1117Wx1400H-466123543-beige-MODEL5.jpg',
        color: 'Beige',
        edited: false
    },
    {
        title: 'Women Relaxed Fit Pants with Elasticated Waist',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240213/RrnK/65cb982f16fd2c6e6af4dca6/-1117Wx1400H-467019348-wine-MODEL3.jpg',
        color: 'Wine',
        edited: false
    },
    {
        title: 'Werk It Flare Pants with Herringbone Pattern',
        price: 1499,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240223/U6Qo/65d8886516fd2c6e6a1774c1/-1117Wx1400H-464936874-black-MODEL5.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Leaf Print Round-Neck Top',
        price: 1099,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230801/TT3I/64c91f25eebac147fc9c19a0/-1117Wx1400H-466383107-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Women Relaxed Fit Cargo Pants',
        price: 1536,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240209/fX5l/65c57c0b16fd2c6e6aea1d05/-1117Wx1400H-467050605-grey-MODEL5.jpg',
        color: 'Neytral Grey',
        edited: false
    },

    {
        title: 'Textured Relaxed Fit Trousers',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230627/GPq7/649b0da4eebac147fc0d146f/-1117Wx1400H-465581718-blue-MODEL5.jpg',
        color: 'Sky Blue',
        edited: false
    }, {
        title: 'High Waist Ultimate Wide Legged Pants Lite',
        price: 1099,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230801/TT3I/64c91f25eebac147fc9c19a0/-1117Wx1400H-466383107-black-MODEL.jpg',
        color: 'Black',
        edited: false
    }, {
        title: 'Leaf Print Round-Neck Top',
        price: 1299,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240429/kRuI/662fd8c105ac7d77bb32f099/-1117Wx1400H-466503003-black-MODEL5.jpg',
        color: 'Black',
        edited: false
    }, {
        title: 'Women Printed Jogger Pants',
        price: 1999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231208/UDGy/65734691afa4cf41f5bfd643/-1117Wx1400H-466865202-aqua-MODEL5.jpg',
        color: 'Multicolored',
        edited: false
    },
    {
        title: 'High-Rise Stretch Pants',
        price: 820,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230711/fK8r/64ac86c6a9b42d15c94a49e9/-1117Wx1400H-465581718-wine-MODEL5.jpg',
        color: 'Wine',
        edited: false
    },
    {
        title: 'French Logo Print Wide-Leg Pants',
        price: 2999,
        category: 'Women',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230831/7Oov/64f0ac76afa4cf41f59b2d4e/-1117Wx1400H-442253232-black-MODEL2.jpg',
        color: 'Black',
        edited: false
    },
]

const kids = [
    {
        title: 'Numeric Embroidered Shorts & T-shirt Set',
        price: 1050,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230623/c6pT/64951ad0d55b7d0c63b1fb75/-1117Wx1400H-464766886-blue-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Heavily Washed Jogger Jeans with Drawstring Waist',
        price: 1250,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240206/oR7h/65c24eb48cdf1e0df5ee51a2/-1117Wx1400H-466259014-blue-MODEL5.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Girls Floral Print Shorts & Shirt Set',
        price: 1590,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240422/7cAy/662691f005ac7d77bb1dda94/-1117Wx1400H-467269165-yellow-MODEL.jpg',
        color: 'Yellow',
        edited: false
    },
    {
        title: 'Denim Jacket with Flap-Buttoned Pockets',
        price: 1450,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230905/dRD5/64f756ccafa4cf41f5a86a9e/-1117Wx1400H-466537165-blue-MODEL.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Girls Mickey-Mouse Print Fit & Flare Dress',
        price: 1050,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231201/Vm24/6569dfe5ddf7791519aaae3a/-1117Wx1400H-466842798-white-MODEL.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Straight Flat-Front Jogger Pants',
        price: 1050,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240206/6jH6/65c24a7d16fd2c6e6ae05c54/-1117Wx1400H-466394646-olive-MODEL5.jpg',
        color: 'Olive Green',
        edited: false
    },
    {
        title: 'Heavily Washed Jogger Jeans with Drawstring Waist',
        price: 1052,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240206/2LZF/65c247ad8cdf1e0df5ee2efc/-1117Wx1400H-466258910-grey-MODEL5.jpg',
        color: 'Grey',
        edited: false
    },
    {
        title: 'Solid Jogger Pants',
        price: 799,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230623/a2pA/64957b15a9b42d15c9c0e780/-1117Wx1400H-464779265-beige-MODEL.jpg',
        color: 'Beige',
        edited: false
    },
    {
        title: 'Lightly Washed Mid-Rise Jeans',
        price: 1199,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230610/5PAN/6483d02fd55b7d0c635f8c78/-1117Wx1400H-466259177-navy-MODEL4.jpg',
        color: 'Navy Blue',
        edited: false
    },
    {
        title: 'Boy Cartoon Print Joggers Jeans',
        price: 1599,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231101/GbO6/65427c98ddf7791519682633/-1117Wx1400H-466765002-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Girls Minnie Mouse Print Dungaree with T-Shirt',
        price: 1299,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231101/hBvn/6541a842afa4cf41f56cbe8c/-1117Wx1400H-466762514-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Striped Belted A-Line Dress',
        price: 1199,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230624/RRWW/649653f5a9b42d15c9daa0dc/-1117Wx1400H-465286965-white-MODEL.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Mid-Wash Mid-Rise Jeans',
        price: 1199,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240206/6AXO/65c248128cdf1e0df5ee314f/-1117Wx1400H-466259068-blue-MODEL6.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Mickey Mouse Print Slim Fit Leggings',
        price: 699,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230623/mc0j/64957a26eebac147fcd5a5f8/-1117Wx1400H-465025037-black-MODEL4.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Heavily Washed Straight Fit Jeans',
        price: 899,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230628/BvFz/649b695fa9b42d15c9fd7662/-1117Wx1400H-465644583-blue-MODEL5.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Print Dungaree & T-Shirt Set',
        price: 999,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230628/yCjM/649b58eeeebac147fc10bc09/-1117Wx1400H-465654966-grey-MODEL.jpg',
        color: 'Black & white',
        edited: false
    },
    {
        title: 'Girls Floral Print Shorts & Shirt Set',
        price: 1025,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240422/2AIH/6625726b16fd2c6e6ac367c1/-1117Wx1400H-467267908-white-MODEL.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Girls Floral Print Dungaree',
        price: 1365,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231204/CEsv/656e012eafa4cf41f5b3a8fd/-1117Wx1400H-466851768-beige-MODEL.jpg',
        color: 'Beige',
        edited: false
    },
    {
        title: 'Lightly Washed Mid-Rise Jeans',
        price: 1265,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230610/sMkb/6483800242f9e729d736605b/-1117Wx1400H-466258984-navy-MODEL4.jpg',
        color: 'Navy Blue',
        edited: false
    },
    {
        title: 'Round-Neck Top with Jeans',
        price: 1199,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230628/b4tX/649b6b71eebac147fc13b9db/-1117Wx1400H-465730432-offwhite-MODEL.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Animal Print Ribbed Hems Sweatshirt',
        price: 1064,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230526/dV40/6470219a42f9e729d7df387e/-1117Wx1400H-465424864-white-MODEL.jpg',
        color: 'White',
        edited: false
    },
    {
        title: 'Girls Colourblock Fit & Flare Dress',
        price: 1199,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231202/COnw/656a5e49ddf7791519ac239a/-1117Wx1400H-466842753-multi-MODEL.jpg',
        color: 'MultiColored',
        edited: false
    },
    {
        title: 'Mid-Wash Skinny Fit Jeans',
        price: 1099,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230628/Dgbl/649bc0cba9b42d15c908ff6c/-1117Wx1400H-465734844-blue-MODEL5.jpg',
        color: 'Blue',
        edited: false
    },
    {
        title: 'Washed mid rise jeans',
        price: 1250,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230623/EAjz/649529e042f9e729d78bb3f4/-1117Wx1400H-464764740-grey-MODEL4.jpg',
        color: 'Grey',
        edited: false
    },
    {
        title: 'Mid-Wash Slim Fit Jeans',
        price: 1199,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230624/4wYV/64963333eebac147fceb63c9/-1117Wx1400H-465162986-grey-MODEL4.jpg',
        color: 'Grey',
        edited: false
    },
    {
        title: 'Boys Slim Fit Flat-Front Joggers with Cargo Pockets',
        price: 1499,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230623/c6pT/64951ad0d55b7d0c63b1fb75/-1117Wx1400H-464766886-blue-MODEL.jpg',
        color: 'Cofee Brown',
        edited: false
    },

    {
        title: 'Denim Jacket with Flap Pockets',
        price: 1299,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20230624/pFGT/649688fea9b42d15c9e15998/-1117Wx1400H-465439791-black-MODEL.jpg',
        color: 'Black',
        edited: false
    },
    {
        title: 'Heavily Washed Slim Fit Jeans',
        price: 1320,
        category: 'Kids',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240206/3W2E/65c24be616fd2c6e6ae063d5/-1117Wx1400H-465060019-blue-MODEL5.jpg',
        color: 'Blue',
        edited: false
    }
]

const featured = [
    {
        title: 'Autumn Hoodie',
        price: 2650,
        category: 'Featured',
        image: 'https://pangaia.com/cdn/shop/products/Recycled-Nylon-NW-Flwrdwn-Quilted-Collarless-Jacket-Cerulean-Blue-Female-1_bf4b2a54-8a7f-4174-bc49-8ef22b24bfdd.jpg?v=1666708230&width=1426',
        color: 'Blue',
        edited: false
    },
    {
        title: "FUSION HOODIE",
        price: 3120,
        category: 'Featured',
        image: "https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
        color: 'Pink',
        edited: false
    },
    {
        title: "Chestnut Brown",
        price: 1780,
        category: 'Featured',
        image: "https://pangaia.com/cdn/shop/products/Recycled-Cashmere-Core-Hoodie-Chestnut-Brown-Male-1.jpg?v=1663947464&width=1426",
        color: 'Brown',
        edited: false
    },
    {
        title: "Nike Sportswear",
        price: 4760,
        category: 'Featured',
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40f3-9b95-c7500939150a/sportswear-club-mens-french-terry-crew-neck-sweatshirt-tdFDRc.png",
        color: 'Blue',
        edited: false
    },
    {
        title: "Champion BASIC",
        price: 1850,
        category: 'Featured',
        image: "https://img01.ztat.net/article/spp-media-p1/7067458719b744fe81ffee62d3d0b912/abad421e7d8e47f08a2abc1c6ffe07dc.jpg?imwidth=1800",
        color: 'Blue',
        edited: false
    },
    {
        title: "Cotton Hoodie",
        price: 5499,
        category: 'Featured',
        image: "https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
        color: 'Green',
        edited: false
    },
    {
        title: "CLASSIC CREWNECK",
        price: 2099,
        category: 'Featured',
        image: "https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
        color: 'Yellow',
        edited: false
    },
    {
        title: "TAPE HOODED",
        price: 2999,
        category: 'Featured',
        image: "https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
        color: 'Yellow',
        edited: false
    }
];

module.exports = {
    men,
    women,
    kids,
    featured
}

// Products Array
