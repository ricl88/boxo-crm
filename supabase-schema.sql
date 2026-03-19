-- ============================================
-- BOXO CRM DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Team members
CREATE TABLE team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT,
  pin TEXT DEFAULT '0000',
  is_admin BOOLEAN DEFAULT FALSE,
  can_film BOOLEAN DEFAULT FALSE,
  can_edit BOOLEAN DEFAULT FALSE,
  can_create_image BOOLEAN DEFAULT FALSE,
  can_write_copy BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ads (completed ads in the library)
CREATE TABLE ads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  product_id INTEGER REFERENCES products(id),
  ad_type TEXT CHECK (ad_type IN ('video', 'image')),
  status TEXT CHECK (status IN ('ready', 'online', 'offline')) DEFAULT 'ready',
  performance TEXT CHECK (performance IN ('good', 'neutral', 'bad')),
  primary_text TEXT,
  headline TEXT,
  completion_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders (ad orders with multiple steps)
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  order_type TEXT CHECK (order_type IN ('video', 'image', 'task')),
  description TEXT,
  created_by INTEGER REFERENCES team_members(id),
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order steps (individual tasks within an order)
CREATE TABLE order_steps (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  step_index INTEGER NOT NULL,
  step_type TEXT CHECK (step_type IN ('filming', 'editing', 'image', 'copy', 'task')),
  step_name TEXT NOT NULL,
  assigned_to INTEGER REFERENCES team_members(id),
  due_date DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  primary_text TEXT,
  headline TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default team members (Richard is admin with PIN 1234, others have PIN 0000)
INSERT INTO team_members (name, role, email, pin, is_admin, can_film, can_edit, can_create_image, can_write_copy) VALUES
  ('Richard', 'Manager', 'richard@boxo.no', '1234', TRUE, FALSE, FALSE, FALSE, FALSE),
  ('Josefin', 'Campaign Manager', 'josefin@boxo.no', '0000', FALSE, FALSE, FALSE, TRUE, TRUE),
  ('Malin', 'Photo/Content', 'malin@boxo.no', '0000', FALSE, TRUE, TRUE, TRUE, TRUE),
  ('Caroline', 'Product Development', 'caroline@boxo.no', '0000', FALSE, TRUE, TRUE, FALSE, TRUE),
  ('Allana', 'Video Editing', 'allana@boxo.no', '0000', FALSE, FALSE, TRUE, FALSE, FALSE),
  ('VA 1', 'Customer Service', 'va1@boxo.no', '0000', FALSE, FALSE, FALSE, FALSE, FALSE),
  ('VA 2', 'Customer Service', 'va2@boxo.no', '0000', FALSE, FALSE, FALSE, FALSE, FALSE);

-- Insert all 137 products from Shopify
INSERT INTO products (name, image_url) VALUES
  ('Tegningsramme (hvit)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Tegningsramme_hvit_2.jpg?v=1770210073'),
  ('Tegningsramme (natur)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Tegningsramme_natur_5.jpg?v=1770207966'),
  ('Tegningsramme (svart)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Tegningsramme_svart_4.jpg?v=1770208632'),
  ('Etiketter til krydder (54 stk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/etikettertilkrydder_7f9caa36-c75c-4bdb-8e35-62e1415d780e.jpg?v=1772193107'),
  ('Etiketter til kjøkken (132 stk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/etikettertilkjokken5.jpg?v=1772192073'),
  ('Etiketter best før dato (56 stk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/kjokkenbestfordato.jpg?v=1772192812'),
  ('Etiketter til leker (ikoner)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/etiketterlekerikoner.jpg?v=1772229630'),
  ('Etiketter til vaskerom (tekst)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Etikettervaskeromtekst_ab578d97-b863-4c1c-b9c0-17e4d68f6293.jpg?v=1772229425'),
  ('Etiketter til vaskerom (ikoner)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/etikettervaskeromikoner.jpg?v=1772228886'),
  ('Etiketter til bad (36 stk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/etikettertilbadsvart.jpg?v=1772190703'),
  ('Etiketter til klær (tekst)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/etiketterklaertekst_be099032-75c8-476f-a041-c14eac7a31e4.jpg?v=1772229908'),
  ('Etiketter til klær (ikoner)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/etiketterklaerikoner.jpg?v=1772230116'),
  ('Oppbevaringsboks med håndtak (dypere)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Favoritt_stempel_2.jpg?v=1765574541'),
  ('Oppbevaringsbokser frostet (Lokk/Fat)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/9_60f9753c-0a8e-4ad3-90ef-a17138e531ec.png?v=1755809827'),
  ('Oppbevaringsbokser frostet (Åpen)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/5.png?v=1755809878'),
  ('Oppbevaringsbokser frostet (Håndtak)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/6_26594325-3a0f-4424-909a-78c569cce0dd.png?v=1755809923'),
  ('Kleshengere til voksen (10 pk) Hvit', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/kleshenger-hvit-voksen-10pk.jpg?v=1749115634'),
  ('Kleshengere til barn (10 pk) Hvit', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/kleshenger-hvit-barn-10pk.jpg?v=1699910573'),
  ('Holder til pumpeflaske (Svart)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Holder_til_pumpeflaske_svart_2.jpg?v=1701981112'),
  ('Vegghengt oppbevaringsboks (Liten)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/vegghengt-oppbevaringsboks-liten-oppvasktabletter.jpg?v=1749114862'),
  ('Holder til barberhøvel (Svart)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Holder_til_barberhovel_svart.jpg?v=1694607513'),
  ('Holder til kjøkkenvask (Svart)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Holder_til_kjokkenvask_svart_1_98313410-62f9-41f4-9574-37cb519d7149.jpg?v=1767210375'),
  ('Skuffeinnsatser (13-deler)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/Skuffeinnsatser_ba96d012-383e-48e5-bb4d-9bae71ce2a41.jpg?v=1746603127'),
  ('Krydderglass (12-pk) Bambus', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Krydderglass_bambus_etikett.jpg?v=1746528211'),
  ('Matoppbevaring 550ml (5-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Designutennavn_8_c5867deb-853d-4225-a60f-f609fe298488.jpg?v=1755815021'),
  ('Bær- og grønnsaksboks (liten)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Baer_og_gronnsaksboks_liten_sitron_74e363d1-3f15-495c-9f8f-1aa8c4148ac2.jpg?v=1751482071'),
  ('Smykkeoppbevaring (12 rom)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/smykkeoppbevaring_12rom.jpg?v=1697537668'),
  ('Smykkeoppbevaring (3 rom)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/smykkeoppbevaring_3rom.jpg?v=1747728983'),
  ('Tørrvareboks (3600ml)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Torrvareboks_3600ml_1_1.jpg?v=1753292160'),
  ('Tørrvareboks (2500ml)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Torrvareboks_2500ml_2_8f0860ef-1a6d-4bd1-8e43-b6d0acef7ff2.jpg?v=1753292756'),
  ('Tørrvareboks (2100ml)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Torrvareboks_2100ml_2_0678ce83-e30e-49e9-8ba7-35026a2aae60.jpg?v=1753292809'),
  ('Tørrvareboks (1000ml)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Torrvareboks_1000ml_2_cc019c22-cdb3-414c-9003-302264dbbd6d.jpg?v=1753292685'),
  ('Skittentøyskurv (oppdelt) Beige', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Skittentoyskurv_oppdelt_beige_d71c66f1-d196-4c84-b55d-7c76bd993117.jpg?v=1761644186'),
  ('Pantekurv m/pose (beige)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Pantekurv_beige_bruk.jpg?v=1761643917'),
  ('Snurrebrett med bokser', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/snurrebrettboksersminke.jpg?v=1771882432'),
  ('Pakkekube til tilbehør (grå)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Pakkekube_elektronikk_gra_3.jpg?v=1751481161'),
  ('Pakkekuber (7 deler) Grønn', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Pakkekubegronnlimitededition_cf702eaf-2e7c-4a12-b678-0d143046ff68.jpg?v=1750064856'),
  ('Pakkekuber (7 deler) Grå', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/pakkekube_gra_ny.jpg?v=1746451717'),
  ('Pakkekuber (7 deler) Rosa', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/pakkekube_rosa_ny.jpg?v=1746451717'),
  ('Oppbevaringsbokser frostet (Oppdelt)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/10.png?v=1755809957'),
  ('Skoboks (stablebar)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Skoboks_2_9a5b72d8-297b-44e1-896b-89881ac7ee3b.jpg?v=1762776312'),
  ('Oppbevaring til dør (svart)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaring_til_dor_svart_vaskemidler.jpg?v=1773064244'),
  ('Pakkekube til tilbehør (beige)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Pakkekube_elektronikk_3_dfe834ac-c343-4a8c-b6fc-df9b8e8920c2.jpg?v=1751481090'),
  ('BOXO-handlenett', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/BOXO_handlenett_2.jpg?v=1738918593'),
  ('Skooppbevaring til dør', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Skooppbevaring_til_dor_1.jpg?v=1738918573'),
  ('Skittentøyskurv (oppdelt) Svart', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Skittentoyskurv_oppdelt_2.jpg?v=1738918550'),
  ('Pantekurv m/pose (svart)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Designutennavn_2.jpg?v=1738918247'),
  ('BOXO-popsocket', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/AA394DAA-0642-4584-AC2C-21A66C39B8D4.png?v=1742409656'),
  ('BOXO-bærenett', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/BOXO_tote_bag.jpg?v=1736430261'),
  ('BOXO-bag', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/BOXO_bag.jpg?v=1736428915'),
  ('Juleposen', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Jule_stempel_2_fa92a8d0-16b9-48bd-83b8-51be87864646.jpg?v=1766928137'),
  ('Pakkekuber (7 deler) Beige', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/pakkekuberkundefavoritt.jpg?v=1748515591'),
  ('Skjørthenger', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Skjorthenger_1.jpg?v=1749115556'),
  ('Henger nedfellbar', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/hengernedfellbar_e04194f5-9919-43f5-b696-dd314de490ce.jpg?v=1745837984'),
  ('Dokumentboks (stablebar)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/minneboks01.jpg?v=1730801817'),
  ('Kabelsamler (6-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Kabelsamler_1.jpg?v=1751058934'),
  ('Skuffeinnsatser (7-deler)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/skuffeinnsatser7deler.jpg?v=1732701050'),
  ('Kleshengere til barn (10 pk) Svart', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/Kleshenger-velour-barn.jpg?v=1651604554'),
  ('Oppbevaring til innpakning', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/gaveinnpakning-gra-oppbevaring.jpg?v=1766928302'),
  ('Smykkeoppbevaring (Ringer)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/smykkeoppbevaring_ringer.jpg?v=1747728983'),
  ('Tekstiloppbevaring oppdelt (4 deler)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaringsbokser_4deler_5.jpg?v=1698785289'),
  ('Pumpeflaske (hvit pumpe)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Pumpeflaske_stor_3.jpg?v=1755165252'),
  ('Skuffedeler (bambus)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Skuffedeler_bambus_lav.jpg?v=1704958881'),
  ('Snurrebrett (firkantet)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/snurrebrett_firkantet1.jpg?v=1694120688'),
  ('Hylledeler (2-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/hylledeler-produkt.jpg?v=1756403694'),
  ('Veskehenger (hvit)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Veskehenger_hvit_1.jpg?v=1699272244'),
  ('Eggskuff', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Eggeskuff_til_kjoleskap2.jpg?v=1698049104'),
  ('Buksehenger', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/buksehenger1.jpg?v=1693820823'),
  ('Holder til mopp', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Holder_til_mopp.png?v=1772190642'),
  ('Caps/hatteholder (til dør)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Henger_til_hatter3.jpg?v=1687267022'),
  ('Skillevegger til skuffedeler', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Skillevegger_til_Skuffedelere5.jpg?v=1698049245'),
  ('Sminkeorganiserer oppdelt (åpen)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Sminkeholder_oppdelt_stor.jpg?v=1687256473'),
  ('Oppheng til grytelokk (dobbeltsidig tape)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Holder_til_grytelokk_1.jpg?v=1689190263'),
  ('Hårbøylestativ', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/holder-harpynt-harboyler.jpg?v=1685046599'),
  ('Belteoppbevaring', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaring_belte.jpg?v=1739867971'),
  ('Hårstrikkholder', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/holder-harstrikker-harpynt.jpg?v=1685046579'),
  ('Vegghengt oppbevaringsboks (Stor)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/vegghengt-oppbevaringsboks-stor-baderom.jpg?v=1757324957'),
  ('Solbrilleoppbevaring (stablebar)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaring_solbriller7.jpg?v=1756069570'),
  ('Hylletrapp (justerbar)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/hylletrapp-uttrekkbar-skap.jpg?v=1709542461'),
  ('Ledningsholder (2-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/ledningsholder-hvit.jpg?v=1754690498'),
  ('Stablebare skuffer (2-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/stablebare_skuffer_2pack_kontor_barnerom.jpg?v=1754295882'),
  ('Stablebar skuff (stor)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/stablebarskufffavoritt.jpg?v=1760993587'),
  ('Holder til barberhøvel (Rustfritt stål)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Holder_til_barberhovel_stal_2.jpg?v=1686460480'),
  ('Holder til pumpeflaske (Rustfritt stål)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Holder_til_pumpeflaske_stal_3.jpg?v=1686460632'),
  ('Magnetark', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Magnet_dobbeltsidig_teip_ark_whitebackground.jpg?v=1683832679'),
  ('Skuffematte (gummi)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Antiskli_skuffematte_whitebackgorund.jpg?v=1683791671'),
  ('Hylletrapp (liten)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Hylletrapp_krydder_1200.jpg?v=1736453065'),
  ('Krydderglass (12-pk) Svart', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Krydderglass_svart_9.jpg?v=1746528211'),
  ('Koffert med små bokser', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/koffertkundefavoritt.jpg?v=1748515616'),
  ('Oppbevaringsboks til fryser', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Fryser_oppbevaringsboks.jpg?v=1682509036'),
  ('Bok: Orden og system', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Orden_og_system_bok.jpg?v=1771879409'),
  ('Tekstiloppbevaring dyp (2-pack)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaringsboks_tekstil_hoy.jpg?v=1731918821'),
  ('Gavepapiroppbevaring', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/gavepapir-oppbevaring-jul6.jpg?v=1766928277'),
  ('Julekuleoppbevaring', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Julestempel_3.jpg?v=1766928180'),
  ('Juletrebag', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Jule_stempel_1_dae24162-c911-44df-bde2-c38d63f1f895.jpg?v=1766928066'),
  ('Tape 12mm til etikettskriver (gjennomsiktig)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/tapehvitogklar.jpg?v=1665493067'),
  ('Hylletrapp (bambus)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/hylletrappbambuskrydder2.jpg?v=1760992268'),
  ('Kjøleskapsskuff', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/Kjoleskapsskuff_808be9be-9a96-41e8-8f33-e0222b335c37.jpg?v=1678177321'),
  ('Gavekort', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/2.jpg?v=1712913604'),
  ('Oppbevaringsboks med håndtak (oppdelt)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/oppdelt-oppbevaringsboks_896464ac-cd57-4aa1-b5f9-ccf7cc5e5648.jpg?v=1682084359'),
  ('Flaskeholder (trippel)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/trippelflaskeholderfavoritt.jpg?v=1760993769'),
  ('Plastlommer (2-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/plastlommerkundefavoritt.jpg?v=1748515737'),
  ('Veskestativ', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/oppdeling-vasker.jpg?v=1660214290'),
  ('Snurrebrett med bokser (farger)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppdelt_snurrebrett_farger_3.jpg?v=1766966803'),
  ('Pumpeflaske (svart pumpe)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/pumpeflaskesvartpumpestor.jpg?v=1755201836'),
  ('Pumpeflaske (hel svart)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/sort-flaske-pumpe-stor_8ee74278-cce6-4adb-aba5-20b3e35e163c.jpg?v=1681385369'),
  ('Tekstiloppbevaring (6 deler)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/oppbevaringsboksertekstil.jpg?v=1679402379'),
  ('Bær- og grønnsaksboks (stor)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Baer_og_gronnsaksboks_oppdelt_druer.jpg?v=1750927033'),
  ('Vakuumpose', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Vakuumpose.jpg?v=1731317728'),
  ('Tape 24mm til etikettskriver (hvit)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/tape24mmsortoghvit.webp?v=1665493191'),
  ('Etikettskriver Brother P-touch Cube Plus', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/EtikettskriverCubePlus.jpg?v=1644228157'),
  ('Snurrebrett (lav kant)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/snurrebrett_lav.jpg?v=1759153881'),
  ('Ledningsklips (16-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Ledningsklips.jpg?v=1731923378'),
  ('Hullkrok (dobbeltsidig tape) 3-pk', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/krok-hull.jpg?v=1661576952'),
  ('Krok (dobbeltsidig teip)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/krok.jpg?v=1649680414'),
  ('Holder til kjøkkenvask (Rustfritt stål)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/holder-kjokkenklut.jpg?v=1767210360'),
  ('Oppbevaring til dør (grå)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaring_til_dor_gra_vaskemidler_1.jpg?v=1766928426'),
  ('Kleshengere til voksen (10 pk) Svart', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/Kleshenger-velour-10pk.jpg?v=1651604573'),
  ('Uttrekkbar oppbevaringsboks', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/uttrekkbarskuff.jpg?v=1650554440'),
  ('Sminkeorganiserer', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/sminkeorganiserer-stor.jpg?v=1650530656'),
  ('Ekstra krok til kleshenger', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/Ekstrakroktilkleshenger.jpg?v=1650556796'),
  ('Skuffeinndeler', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/skuffeavdeler-grid-bod.jpg?v=1680858678'),
  ('Skuffedeler', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/skuffedelerkundefavoritt.jpg?v=1748515563'),
  ('Krydderinnsats', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/krydderinnsatsuttrekt.jpg?v=1652102829'),
  ('Glasskrukker', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/glasskrukker.jpg?v=1735428974'),
  ('Etikettholder (3-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/bin-clip-svart-tekst.jpg?v=1711558430'),
  ('Oppdelt oppbevaringsboks (med lokk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/teoppbevaring.jpg?v=1709543024'),
  ('Matoppbevaring 1000ml (5-pk)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaringsboks_luftett.jpg?v=1755814192'),
  ('Snurrebrett (oppdelt)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/justerbar-snurrebrett.jpg?v=1739373491'),
  ('Snurrebrett (høy kant)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Snurrebrett_hoy_kant.jpg?v=1730816771'),
  ('Oppbevaringsboks med håndtak (smal)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaringsboks_med_handtak_liten.jpg?v=1730816771'),
  ('Oppbevaringsboks med håndtak (dyp)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Dyp_oppbevaringsboks_oppbevaring.jpg?v=1749017999'),
  ('Lokk til oppbevaringsboks med håndtak', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/lokk-oppbevaringsboks-liten.jpg?v=1680859003'),
  ('Oppbevaringsboks med håndtak', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/oppbevaringsbokskundefavoritt.jpg?v=1748515704'),
  ('Oppbevaringsboks med håndtak (høy)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaringsboks_med_handtak_hoy.jpg?v=1730816771'),
  ('Oppbevaringsboks med håndtak (kort)', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/files/Oppbevaringsboks_med_handtak_medium_310c3a77-24df-4251-80ae-d31f6c0ceacb.jpg?v=1730816771'),
  ('Eggboks', 'https://cdn.shopify.com/s/files/1/0570/0475/3054/products/Eggholder.jpg?v=1651604243');

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_steps ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since we're not using auth)
CREATE POLICY "Allow all" ON team_members FOR ALL USING (true);
CREATE POLICY "Allow all" ON products FOR ALL USING (true);
CREATE POLICY "Allow all" ON ads FOR ALL USING (true);
CREATE POLICY "Allow all" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all" ON order_steps FOR ALL USING (true);
