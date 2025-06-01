import React, { useState } from 'react';
import Layout from '../components/Layout';

import { Star } from 'lucide-react';

const allProducts = [
  {
    id: 1,
    name: 'Croquettes Premium pour Chien',
    price: 49.99,
    oldPrice: 59.99,
    description: 'Croquettes haut de gamme pour chiens adultes de toutes races. Enrichies en vitamines et minéraux pour une santé optimale. Sans céréales ni conservateurs artificiels.',
    rating: 4.8,
    reviews: 124,
    stock: 15,
    images: ['https://ik.imagekit.io/yynn3ntzglc/france/production/catalog/products/001005/1.jpg'],
    category: 'Chien',
  },
  {
    id: 2,
    name: 'Croquettes Premium pour Chat',
    price: 39.99,
    oldPrice: 49.99,
    description: 'Croquettes haut de gamme pour chats adultes. Formulées pour maintenir une peau saine et un pelage brillant.',
    rating: 4.7,
    reviews: 90,
    stock: 20,
    images: ['https://ik.imagekit.io/yynn3ntzglc/france/production/catalog/products/001005/2.jpg'],
    category: 'Chat',
  },
  {
    id: 3,
    name: 'Croquettes Premium pour Chien',
    price: 49.99,
    oldPrice: 59.99,
    description: 'Croquettes spécialement formulées pour chiens de grande taille, enrichies en protéines et minéraux.',
    rating: 4.5,
    reviews: 85,
    stock: 10,
    images: ['https://ik.imagekit.io/yynn3ntzglc/france/production/catalog/products/001005/3.jpg'],
    category: 'Chien',
  },
  {
    id: 4,
    name: 'Croquettes Premium pour Chat',
    price: 44.99,
    oldPrice: 54.99,
    description: 'Croquettes pour chat stérilisé, riches en fibres et faibles en graisses.',
    rating: 4.6,
    reviews: 112,
    stock: 30,
    images: ['https://ik.imagekit.io/yynn3ntzglc/france/production/catalog/products/001005/4.jpg'],
    category: 'Chat',
  },
  {
    id: 5,
    name: 'Mélange de Graines pour Oiseaux Exotiques',
    price: 19.99,
    oldPrice: 24.99,
    description: 'Mélange équilibré de graines spécialement conçu pour les oiseaux exotiques. Enrichi en vitamines pour renforcer les défenses naturelles.',
    rating: 4.9,
    reviews: 67,
    stock: 25,
    images: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMWFRMVFRsYGBgWFRkWFxcVGBUaFxgZGBoaHykiGB8lHRYdITEhJSkrLi4uFyAzODMtNygtLisBCgoKDg0OGxAQGy4lICMrLTEtNS0uLi0tLS4tMi0tMi8tKy0tLS0tLS8tLS0tKy4tLS0vLS0tLS8tMS01MCstLf/AABEIAOAA4AMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABwIDBAUGAf/EAEAQAAEDAgQDBgMGAwcEAwAAAAEAAhEDIQQSMUEFIlEGEzJhcaGBkbEUI0JSwdFy8PEzQ1NikqKyFRYk4SU0gv/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EADIRAAIBAwMCAwYFBQEAAAAAAAABAgMRIQQSMRNBUWGhIjJxgdHwBVKRscEVI4KS8RT/2gAMAwEAAhEDEQA/AJxREQBERAEREAReSvUAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQHO9reK/ZxTc5jnMc4glv4TsSNwrOE4+CCWvBA1zWja52Wf2qB7gvAzGmQ+Do4DUH1BKi/F4AMr1KQcTSMZC5pcWtcMzYEcwAt6hY1KjizanTU0SbT4046Bh9Df5Srg4s/8o+ZUS1GEtId4GQS4HK5ztLQAXAgaaL12IqUm5aZnVwGd1yQM3oBaBPVVWoTLvTNEuDi3VnurjeLN/KfZRPQ4hiQWxXBENLhMGHaQI0JMLNZ2kfmLc4lurXGHNjUunQBW6yKdCRJw4mzzVQ4lT6n5KLaXaatUbNJ7LEAuc0QBEl19RG/p1WQ/tM9rS8BxYAJJYASJ5nR8zCuprgr03ySWOI0+vsvDxKl+b2KjzCcfqGS7K5oiSG/hOjh102Vmt2keBNjBiwBBOtjtHtIUdRE9KRI7uK0up+StP41TGzvZRniu0NWTlfl8nNGYWn0VL+L1wYNQgg3BygjUbWkkaeah1oostPJkkHjXRnzP7KzU4y7qxv8+ZUZYzi9RwEOfmymRmc5uYRDbDlcJ+Mjotd3tVz5qthrWzzEEkkddBYaeSjrKw6DJNxfaBrQS+u0AawR9Atv2W4i2vSL2SWZyASCJjWJvrZQ/g+GiAWQS5tjmcYvc+oUx9l8D3OGpsM5ozOnXM7mMzvdTTqb27ditSlsSNsiItTIIiIAiIgCIiAIiIAiIgMLjFOaNQf5D7X/AEUacTYQGVgagDZa0gS5tRjspDQTflMjylSdxJs0qg603f8AEqPH1BUo1muBzUi2o0Xj8jvXxSsKquzei7I5RrZfmA6knLPNN7kgTHSTZbB4iG0mcpbHizHl1z20vMCQvHUXZuUTmi24sb6xYx6TvKu1sNmtmcPCwWDWzlkG5vIvtrHmud5Z1LBhV8OZyEPl85XiJM3tO0gEAkGyoGDgNDJaBIk+LNGvKDmJEkz1V00nNqd4CcrR4H+Etgi0aACDN9YVdNwBEuaZkCIDMzuXe8wf6JbFieXdox6tBtJ7qZ5RZzhqScs3/Np56qtj3mO75WvdzFmQi4BzEOO/WNvJMK0jkcxrS2Q00yCCGkky651O/Qj0tsltQjRsWuZMTcD010iVa7u/IqknFJ9zY4eoGAcnMQQ4m0gHpsZj3ssBjrEsyQ90umXgyBmtADTEGRrCyiJcSXAvDDY6Zp1tF7HS+mi8eIblMBsT+QD53k/ooLNIxqjO8YRHLIJBjwtdYEHTMCdRMCyqoue0SyHMJytZo2DUjmIJ5RMzEiNFawrNXSSHOzEmBmm4IGkQY9Qs7DBrSNG7XkfTRYVK6i9qOedZKVrZNbhu8Gd1iW5rCwa3pN5BEkOieU9Vlva1j4aHmMsuc7NNSCW5QIyiJCzauHAPeAesAOa4AEXIvoSvOGgVqbC2cz2QA6Ld04j53g/BVVSTdxGt2KuAYIBjqznFzq1fuxzCANXlu97T6qYAo6fge7p4MAAgA1DYCXvc0n66qRQvSpNO5jUdz1ERamYREQBERAEREAREQBERAWcW2WOHVpHsuJ4JWhtRpvmoO5QMx5bQ0Af5vou5q6H0P0Ub8KcRiWEZ8gYQ4hrnZhBjQGLkDzWU/eRrD3ZGsfa+50vG86+/lZYuam5oJLSYLQ64Ekkugm+mu4mfJZADrl4IIJBDpEi8xOxIBleVOGuqyWMc9sAAACAQb+hJ6xZc+NzR074vhotmgw08rQ1wIsYmx5p1vbdYeKoNNMMDZAdOUtIJNnBrNJkmLmInotsOGVA0Du3iCYhmgO2mw3KxBwutDS+jUlrrjISCBI00A/FKlRlzkluPF0YNOkJaXtY1rWkWIIaWkZmzaLun4nzWc5jof4CNrEOuzUE31MegHktXh6feVO78OfozOXEgeK4mwF/wgFZVHh4kUxibVaj2UuRzmvc0hpJM/dguMDWYlZKV8r79T0HopRSUmk7X7/xF+H7+BR3paadJ1KxIaHNblzzBMwZbGtxOvVZLssFjnSQSBaQY0OkfCJWvdRdeXSRhjXkiXQYBZJvPNE9AsyjhHNafvgG0Q17pZJaxzJaW/mkjKWz5puvwiZaFrma9fp54MfO8coAbE2DQDbcCFVQrObcjMDqHjMCJ1OoC8JdWgNpuqvkkNFnB4AEyIERbyg9VtsHQxTAOSpE2a5pcAImxAn4eaydFtboHjajRSpVnFyMJ+Pwohveuwz3aEOsI8jLd9xutlwWhU+1UHFzH0y54zsAGY1ADmcASAeQC1vmUrAvaA/COdvDqQgXgmXDVXuzGCpCuwspVKHPBGUsY+IMFskO9dlanGSkrp/uZ9PGPT6HR9oaI71jQIAYA2Nhnbp8l2AXFdof/ALFPqS2T5ZgIXahd1JZk/EvVhtjHzPURFsYhERAEREAREQBERAEREBSQor4V2nrVcUWSAzmysiBDZ1IvMCVKpKgrg/D6rsZlY2TTNQPmQGjmAkjQkgROqrJtcGNa+LGyxeOa55vBn5+hVeFxLmODxqNRPiGpBWrxAMlpF5uDqD/NlTSc4GBf/Kb/AC3heLOL3bouzMoVu0iSKdUOAcNCAR6EL1YHBmubSa14ykTaZgagHorvEMUKVN1QiQ0aaSSQ0CdhJEm8CTsvcg24pvwOm+DV4ns+c+ejVFMwRennhrtWgyJHqLTCt0+z+IExi2iST/Y6GIJbzcthFl67idYYeriSZDGFzIY0U6kHwtBmoQdBULgSTZoGu7+0jNlPLoAXFoBeSR3Yk3cNxG4WfQh9tndH8QrpWun8Yxfq0aBnZyuMo+1NGQZW/cfhjLlPNzCOq8/7dxMn/wAsSTmP3ViS3LcZr8to0C6J1VozHMIZ4iXCB/Efw/FG1mkgZhmcCQAQSWiJI6gTqnQh9t/Un+pV3y1/rH6Gp4FwBmHl2cvqERMQAOgH7rY1cM1x3B9VcNRoMSNY1HiiY9YvHRWsTh81w4j6JKnFQ2qN14HNUr1Ks3OcslipggD41icNMYgNJnmsfLZXX0W71Pa6xXlrHtcySZkmwmIXDT277KKX+Vzq0z9qzzfyNvxkzimDXmp/8m/1+K7cLg+I1M2KpuiMzqfu5p/Vd4F3UympVow+B6iItDkCIiAIiIAiIgCIiAIiIDwrmaOHZTz5QAXvc5xAu5xMyepXTLQVm3PqVKIZqMfwulVILmAnrofQkarzD4GnT8DA09Yk/MrLeVQTso6cb3srlbLkpa1Y/E6YfTdTJA7xpZfQyNI3B+krKiFj40HljqR8SxwB+ZScrK5KRi1qD6zmmoabadM5sjDnDqjfAahIHKwwcg3AJ0C1zuBOy5GmkKooPDahGdza1Qy6sA4eJz5cXg2sNgty0fduG/MNI6/P1814ATUzRbLE3B66R/MKN3ANPV4LDYY6nTYynyAy/JVEAVHBwio5os2RDXEmCTK9xXDXOfUearHEuZbM4F1KkARQc6Za3vDncRd5ibCFsqlE80NnPPlcvbP+0T8EFMuDZBkzI6TlP1Z7qrqPOCCxwrBZHPqOex76r3PLm6mWsYWgHwgZIkXMBbaFh4OkQYI/DrGt512sVlwrwluV2SWatFhmQOv9Vz2MxjXOGQQ1p1vf16DyW44s+KLurob8z+y5epVDbRLun7rzNdPZNRglfm9s/qXjOS9q9joO/nFUWzMml9WmVJAUR4OqftNB2+ekPm8D9VLgXVppN7r+JCrSqe92PURF0gIiIAiIgCIiAIiIAiIgC5/EAy71P1W/WhxTzLo6n6qUQzW73VTgqKjhPmvYkKzKx8AtNx7tA2gwFmSo8mMufQQTJiSRb3W5i0KNqnY/FudyBjGhzgC5wByyQDAk6LOcmsIzqufEe5dr9r8UbBzG+TWD2LpKvjitdwnvqzvIC3s1dfwXhYo0qdMhjntaA54aAXHc9T8VnSqKE3zIoqMu8iO/t+KzePEZLbO032VVbj2JY2RWqTOjgNI3Bb+qkMvIsN15qE6cvzff6hUX+Y4HC9ta48TadQeQyH5gx7Lu6VQOAIIMgGxnUTqNdVyfbjgNaqKbsNTZLc2fLlY50gBusBwAB31KsdieE1qVUmrTfTinAB0JJA2sYj3SLlF2eRDfF2eTquI4PvWZcxbebCdAVzz+A1mnwhw6g3PzXTOxAzhguS0uPkBp815h8YHVTTAlrQA46cx2HoN1FXTQqO75N2sHNVsFWpV8K4shjsTSBP5YqtIBG0/opdauZoMBc0GCMzfmHAj4g/RdOrQpqHAhGyCIiuXCIiAIiIAiIgCIiAIiIDwrQY0czvU/Vb8rm8fiGZ3AuAIJ/dVlUhDMml8cDa3wjHgaqkuVDq9P84XrXAiQQQOiiFWnJ2Uk/mS4yXY9zAbrlu3FerRFDFUy7JSqRWDf8Fxa6SBqJb9F1ESreIwjXscx4lrmwRMSD57LXsUyXO8DgHNuCAWnq0gEFekrlMSyrw8U8h73DB/KwmKjWkEGm0zBbuJFiNRKzsF2rwtRxaXGkdu9bkDgR+bSQZETeAQeiwubz12H/s+wWgr9t+HNcWHFMnQlrajmg/xtaW+6p7e4j/4/EZHZpYASxzTDc7S5xvJECIFzK4DsVwvAVOevXBe2/dOb3TWgXnMf7QeVgobJsS6yoHNDmkEOEggggg6EEagheOqtaQCYsTfQNESZ8gZXLYHtHRo1KtMy3DQ19J7aboDi37xjWgTBPMLRJIXO4ziNfFYiqGFwwz38maWOyFrWkCNJy6TdIzTV0Q007M3rePNIq1Q9oe92UEzFJm0mLvIAhgvNzFpy8GXZC1h7qlEvr1OQutrDrtb/ABcxOgXHU6DqVYsBs24k3F7gOMR/W5W7wry0gllPqXOp1qhO05sx6qbEX8Tu+A1mlzGMB7tgYA9wjMZ2GugmfNdkFGvZzjBfimUTXpAC4psoPYXGJjO6R8jKkoKGWR6iIoJCIiAIiIAiIgCIiAIiIDwqOu1FMGs4mmXw43BjLMa3CkVy4DtKPvnmKniN6c2lo1heX+KJ7I2/N/D+BtR5ZpKWDYQZa9puLvMxM6h1rrKwdAUnFzAZjTM4zvHMT9Fj0XAc337vJzXkX6CFm0qmZpMEAA+JpG3ReP8A3Iu6b9Tf2X2Lp466waxt2h3NUiCYhumt9PJeV+PEFw7thywJbUc4EmIykNvr7LmWk1KRyyCAAHERLosdJ9SeqyuG458uOWGizdgXWAIPWd9LL3lOqo5ln5E9Om3hGdxPjAqMfRdTpZiCBncXNBBtOhtM2K5Bj3U35CQXjWNMsWy7QQt9UMnMXzG8g3dymw1gSPmsXGYQPaQIL5hjiOfIbAS4SRY6LanXkn7TwZ1dNFr2eTUV6VMtcSxrSWmSxoAdIvmGk39lrey/DaQrF1YZ+7MsadC6bOcPxR8ltnMcCabvmDMiIWuwuGLaj51hsHyB/omtd6d4vDRz6fE7SXB1Dny8Og6z7q1ihQIcXOP3Tg5gkAmbZSD4hLlXhHAsB+HoVy/GKBdXJAOXMxhEzeo7JPuvL0F+q0n2OvVcXNxwyi0vc58yZnURcEuHpInoCDEabx1As9J8wPK4uPp5Ba7hmGIFN8xmLQJ2qOZnpk+TvvKZ6hwC3VAgNAFmnQG8GYLT0jT0C9+KPNbLeAc77XhZdUynEAAOc0tMNJkEXNlLoUR8Cw7anEKDtO6daLhzoN/hdS4FkpqUnYtDi56iIrFwiIgCIiAIiIAiIgCIiA8K4DtD/b1P4h/wC78qNe07/wDyajWuIJqNBiOWWCIB8R8l534lQlVppR7O/ozah71i0fIlUOcYNzp18lrG1qjS4OcbGNBsCHai14sr2IxPKRcNkybucW3EEBoAvuvH/wDDVbxY6nFrktMq8ugvLuexNrE+fsqmF2XlMnz2MTDhF9SFSKjXNBvAaWiWnTLGWD6eeqGgAGyHGBbMSATEmwsSOh0XsWtwaXuV06JaHB5LX5gQ03gwARfSTeyPoCWuJMA7AybCxERHoVcxDSYzx1GroBvJI6x/tWIx7myYJIAc0NMA3gCIFp31gSncWwYnEgHse1rSX040GpjQdJhaHEZ834g5o3sYmNtv2XXi7i7RzvGRAsdMsi4/kErW9p8V3dNoa2KjwMt7NYBJdffotoO622OarFe93MLhFarLqbgS/oNCDdsHQ6x8Fm4HAEiSCB9op1HSR/dvBI10BH1XIYTjValWZUDicsS3QODTpp5rsOG8Yp1nVwAS0V+9Yc0EU3HOWEbySWqsaPSk5ruUU1UtFmfghNPLIiHMmRZ1OoX03emqrxtexc3xO8XQkWkKx9lDZI35jlIs4QGydRE5SNDJHRWn18zIIynSPQ6jy/dZ6jVVFbZwZVaGxXNl2LaBi6f8Ri0bX/dS2FFfY2iftFMlpbD45gWnwm8HYx8RBUqBbaRWh8yig4xSZ6iIusBERAEREAREQBERAEREB45Rp2sxDG4lwIu5+ZrryHMYNNp3v0UllRr2sd96SSMrajnTYEOy5WwfnbzXNqmtmTo019+DnGVWOLnNI7u4Jc0nM7MCbyC67TedRusptTKQ5pdByt0u22p1mx67LAohuaA0jlsADPK4aECALT8Ss+i02cR+KJk6iC6Ha3B12lcyydnFzzMXgCzbkTJOmkEaHfqrjwMgGXmDjluIILSAb3GhFjuqKpcwiZaCCWkg7HzmW+xsq2PyOb3l6ecEiAACTlkfF14ibq2WRhItjFgZqeaG8veaZSSXFoMXtfRXq9UODRMvbAa1rPwgWM7kn2I6KvG0ACeVhZmdlIawuGQQQctwSXb7ALD7372QGgAGNTzRcOd5A6+e6sUMibtuIuCTBEtaMwEg3ERbS64fjuNe95c/xO0H5WTO/Vdc2sS19NkS8gQ5kTDptvzRYhc7xbhzhUq1ng5gDYiQCSQSSegC1p2WDGtFtXOcggt6kz6XH7rN7P1nMqgg5Q7lJ9dLb9PitfWDs7QQZgHr4ubbyhbPg+Cc8wNxb+KTAnTVbu1snLG98HZ4nEvzA93Ldjt/+gLE76lY1Z5a8CGZcxzXEh9nCBtY+99gsl1Zzy5xDQJsALeHST0gn4LExFJjKofDnk8oDs0tAcMwgXAMzm0XDhYPSadr+ZvuxlUnFzmJDqjXQbwTT5Yd5AC3SFLAUR9h6o72mcwcXVAWnKGnKQQAYN4EC8GylwLpocHJX949REW5gEREAREQBERAEREAREQFLlE3bGoO+dTMjPVcJixkgNBjSCNeh6qWXKI+1WJbUqvdTbIzz4pJv091zajsjo03LfkYNCk4PGY25hIcIBMHK4bEba6q/RqG4bYE/iM3IF/TfQLDa7ICGEuz1Y6nORd3lpPwWUWtJGUkiNDrcnefIjdc+EdfiVNwoLSKpkt0y/njldOnWw2XlZuZpblAJMum0wZAB2AidDMq24W1g2bAkGI8tRJjVU1XiAc7SeouGut4p8jp1Uq7DsivMHAZXEuzHNNoy8oE7giHCVTRwxpuvJc4EuBPibqIGnmqqFQOBZ4Xth23OG2BPXUfIKis91rSYa2JhwB6TrNyPlKnPCIsuWY9Wi+Mwc2Q6XluYBwH5QRpH0V2viw8UmgS15AAIMENuSbWGlr3V4MbmLHAtbaS67AWtm4F8umh+KscS4fWa6kAMrAxrszTlabwHC8kkE6x6K0XuZSV48GBjeGNf4Rzlt4iJBIBP5RHTos7A0g0BoByNM2JBzgEi+1/mqnPaAKklouA4w5xE+ECxP6SqKOKLnZnNyAEgAgyToS4gxE7HSFaTk1b/pVKKd13LrqgY0MzDWSYgCbEReTrZe4+HOEy17PCRldr4gYPMLiypOHBaCT4Xh06yR62PjgjzCx8FRiQOZzjm6A+keqzxbBpm+TZdnamXEMEthlVkWIDWFw+E3naJjZTGFBzC5r8zRJBbnBAGhmQd7gfJTi0rfT8HNqV7R6iIug5wiIgCIiAIiIAiIgCIiA1/G8R3dCo/o0gbXdyi/qVDYDrBoIIB8Lt+hPpspi43ge9YGkTDg6OsLV0OBHQMDR+vosKlNzkb0qqhG1iPKGHqTmAc0kRqWyCIMx+6qpYNwm0ZrGCItopDq9nHO/G0fAlV0uzDMjmueSXRcCIjyuiooOuyP6OEIABMnadv2joFc/6e3YGbXi8/D5LvqfZWiBBc8j1A+gV9nZzDj8J/wBRVukivWfYjx+CBiWzHUX+fSLRvbosV3B7gAmACB6H08/opUbwWgP7sfElVjhFD/Db7qVTSIdWTIv/AOjBoBJdNr7mBpJuRuqnYcG4AtoReAdYk+6lJvD6Qj7tttLTHpK8q8Nou1ps/wBICdNIOrJ8kTuwhteSAAM4zEAdJ+qpbgSB4sx1ubEnWfVShU7O4Y/3Q+BI/VW/+2cL/h/7iodJPBKqtEZHBnKWho8UgtOV2kRI2/YKxUYWHNcO6htwY1kdVKp7N4banB6gmVQ/s7T0D3j4g/VUdBMutQyJGu0GYi5k6nlkmJUz8DxHeYek+ZljbjqBB9wue4l2UH4Rmb8GuHoRstv2WwvdUjSmQxxidgeaPhKtTpuDK1aimjcoiLYxCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgC8AXqIAiIgCIiAIiID//2Q=='],
    category: 'Oiseau',
  },
];

const ProductList = () => {
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState(
    allProducts.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const handleQuantityChange = (id, delta, maxStock) => {
    setQuantities((prev) => {
      const newQty = prev[id] + delta;
      if (newQty < 1 || newQty > maxStock) return prev;
      return { ...prev, [id]: newQty };
    });
  };

  

  const filteredProducts =
    selectedCategory === 'All'
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => setSelectedCategory('Chien')}
            className={`mr-4 px-6 py-2 rounded-lg ${
              selectedCategory === 'Chien'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-dark-accent dark:text-white'
            }`}
          >
            Chiens
          </button>
          <button
            onClick={() => setSelectedCategory('Chat')}
            className={`mr-4 px-6 py-2 rounded-lg ${
              selectedCategory === 'Chat'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-dark-accent dark:text-white'
            }`}
          >
            Chats
          </button>
          <button
            onClick={() => setSelectedCategory('Oiseau')}
            className={`mr-4 px-6 py-2 rounded-lg ${
              selectedCategory === 'Oiseau'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-dark-accent dark:text-white'
            }`}
          >
            Oiseaux
          </button>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`mr-4 px-6 py-2 rounded-lg ${
              selectedCategory === 'All'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-dark-accent dark:text-white'
            }`}
          >
            Tous les produits
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md">
              <img
                src={product.images[0]}
                alt={product.name}
                className="rounded-lg w-full object-contain h-64 mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h2>

              <div className="flex items-center space-x-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold text-primary">
                  {product.price.toFixed(2)} €
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.oldPrice.toFixed(2)} €
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                {product.description}
              </p>

              <div className="mb-2">
                <span
                  className={`text-sm font-medium ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.stock > 0
                    ? `En stock (${product.stock} disponibles)`
                    : 'Rupture de stock'}
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">Quantité :</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1, product.stock)}
                    className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent"
                    disabled={quantities[product.id] <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-gray-800 dark:text-gray-200 border-x border-gray-300 dark:border-gray-600">
                    {quantities[product.id]}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1, product.stock)}
                    className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent"
                    disabled={quantities[product.id] >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg"
                disabled={product.stock === 0}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
