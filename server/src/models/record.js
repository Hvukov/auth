const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    category: {
        type:String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;

// const categorySchema = new Schema({
//     režije: {
//         type: String,
//         required: true,
//         enum: ['Struja', 'Plin', 'GSKG:prič, komu,voda, čist', 'Iskon', 'Mobitel Mirna', 'Mobitel Hrvoje', 'T: pričuva', 'V: Struja', 'V: čistoća, voda, komun', 'V. Plin', 'Crtanje']
//     },
//     hrana: {
//         type: String,
//         required: true,
//         enum: ['Konzum', 'Lidl', 'Plodine', 'Spar', 'Kaufland', 'Metro', 'Müller', 'Diona', 'KTC', 'Billa', 'Konzum online', 'Lidl online', 'Plodine online', 'Spar online', 'Kaufland online', 'Metro online', 'Müller online', 'Diona online', 'KTC online', 'Billa online', 'Konzum dostava', 'Lidl dostava', 'Plodine dostava', 'Spar dostava', 'Kaufland dostava', 'Metro dostava', 'Müller dostava', 'Diona dostava', 'KTC dostava', 'Billa dostava', 'Konzum online dostava', 'Lidl online dostava', 'Plodine online dostava', 'Spar online dostava', 'Kaufland online dostava', 'Metro online dostava', 'Müller online dostava', 'Diona online dostava', 'KTC online dostava', 'Billa online dostava']
//     },
// })

// const Category = mongoose.model('Category', categorySchema);

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   subcategories: [
//     {
//         name: {
//             type: String,
//             required: true
//         }
//     }
//     ]
// });

// const Category = mongoose.model('Category', categorySchema);

// const recordSchema = new mongoose.Schema({
//     date: {
//         type: Date,
//         required: true
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: Category,
//         required: true,

//     },
//     subcategory: {
//         type: String,
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: User
//     }
// })

// const Record = mongoose.model('Record', recordSchema);

// const režijeCategory = new Category({
//     name: 'Režije',
//     subcategories: [
//         {
//             name: 'Struja'
//         },
//         {
//             name: 'Plin'
//         },
//         {
//             name: 'GSKG:prič, komu,voda, čist'
//         },
//         {
//             name: 'Iskon'
//         },
//         {
//             name: 'Mobitel Mirna'
//         },
//         {
//             name: 'Mobitel Hrvoje'
//         },
//         {
//             name: 'T: pričuva'
//         },
//         {
//             name: 'V: Struja'
//         },
//         {
//             name: 'V: čistoća, voda, komun'
//         },
//         {
//             name: 'V. Plin'
//         },
//         {
//             name: 'Crtanje'
//         },
//         {
//             name: 'Die Drachen'
//         },
//         {
//             name: 'Vrtić'
//         },
//         {
//             name: 'Groblja'
//         },
//         {
//             name: 'MasterCard'
//         }
//     ],

// })

// režijeCategory.save();

// const domaćinstvoCategory = new Category({
//     name: 'Domaćinstvo',
//     subcategories: [
//         {
//             name: 'Namještaj'
//         },
//         {
//             name: 'Kućanski aparati'
//         },
//         {
//             name: 'Kućanski aparati Trnsko' 
//         },
//         {
//             name: 'Uredski pribor i Božićni ukrasi, čestitke'
//         },
//         {
//             name: 'Popravci Vrbanićeva'
//         },
//         {
//             name: 'Sanitarne potrepštine'
//         },
//         {
//             name: 'Fritz'
//         }
//     ]
// })

// domaćinstvoCategory.save();

// const hranaCategory = new Category({
//     name: 'Hrana',
//     subcategories: [
//         {
//             name: 'Namirnice: dućan'
//         },
//         {
//             name: 'Namirnice: plac'
//         },
//         {
//             name: 'Pekarski proizvodi'
//         },
//         {
//             name: 'Narudžbe'
//         },
//         {
//             name: 'Gablec'
//         },
//         {
//             name: 'sladoled, grickalice, slastičarnica'
//         }
//     ]
// })

// hranaCategory.save();



// const prijevozCategory = new Category({
//     name: 'Prijevoz',
//     subcategories: [
//         {
//             name: 'Benzin'
//         },
//         {
//             name: 'Plin'
//         },
//         {
//             name: 'ZET'
//         },
//         {
//             name: 'Bicikl'
//         },
//         {
//             name: 'Vlak'
//         },
//         {
//             name: 'Rentacar'
//         },
//         {
//             name: 'Taxi'
//         },
//         {
//             name: 'Stvari za auto, Pranje auta,kozmetika'
//         },
//         {
//             name: 'Parking'
//         },
//         {
//             name: 'Cestarine'
//         },
//         {
//             name: 'Kazne'
//         },
//         {
//             name: 'Servis i popravci'
//         },
//         {
//             name: 'Auto ukupno'
//         }
//     ]
// })

// prijevozCategory.save();

// const osobnoCategory = new Category({
//     name: 'Osobno',
//     subcategories: [
//         {
//             name: 'Odjeća'
//         },
//         {
//             name: 'Obuća'
//         },
//         {
//             name: 'Osobna higijena: parfemi, dezići, četkice'
//         },
//         {
//             name: 'Naočale'
//         },
//         {
//             name: 'Šišanje'
//         },
//         {
//             name: 'Kozmetika'
//         },
//         {
//             name: 'Izrada dokumenata'
//         },
//         {
//             name: 'Alat'
//         },
//         {
//             name: 'Elektronika'
//         },
//         {
//             name: 'Petar odjeća, cipele, kozmetika'
//         },
//         {
//             name: 'Petar igracke, knjige'
//         },
//         {
//             name: 'Petar tečajevi, sport'
//         },
//         {
//             name: 'Dadilja'
//         },
//         {
//             name: 'članarine sind, HPK'
//         }
//     ]
// })

// osobnoCategory.save();

// const zdravljeCategory = new Category({
//     name: 'Zdravlje',
//     subcategories: [
//         {
//             name: 'Liječnik'
//         },
//         {
//             name: 'Pedijatar'
//         },
//         {
//             name: 'Zubar'
//         },
//         {
//             name: 'Ginekolog'
//         },
//         {
//             name: 'Psihoterapija'
//         },
//         {
//             name: 'Lijekovi, apoteka'
//         },
//         {
//             name: 'dopunsko z.o. Mirna plus Hrvoje'
//         },
//         {
//             name: 'testiranje na covid'
//         }
//     ]
// })

// zdravljeCategory.save();

// const obrazovanjeCategory = new Category({
//     name: 'Obrazovanje',
//     subcategories: [
//         {
//             name: 'Stručne knjige'
//         },
//         {
//             name: 'Članstvo u knjižnici/zakasnine'
//         },
//         {
//             name: 'Edukacija Mirna'
//         },
//         {
//             name: 'Edukacija Hrvoje'
//         },
//         {
//             name: 'Ostalo'
//         }
//     ]

// })

// obrazovanjeCategory.save();

// const donacijeCategory = new Category({
//     name: 'Donacije',
//     subcategories: [
//         {
//             name: 'Mirna na poslu darovi'
//         },
//         {
//             name: 'Darovi, odlasci u goste'
//         }
//     ]
// })

// const zabavaCategory = new Category({
//     name: 'Zabava',
//     subcategories: [
//         {
//             name: 'Kava/piće'
//         },
//         {
//             name: 'Kino'
//         },
//         {
//             name: 'Izlasci, večera, kino sve skupa'
//         },
//         {
//             name: 'Kazalište, muzeji'
//         },
//         {
//             name: 'Izleti/proslave/tekme'
//         },
//         {
//             name: 'Ljetovanja i putovanja (smještaj, hrana, sve)'
//         }
//     ]
// })

// zabavaCategory.save();

// module.exports = mongoose.model('Category', categorySchema);
// module.exports = mongoose.model('Record', recordSchema);

